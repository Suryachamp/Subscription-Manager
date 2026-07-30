const request = require('supertest');
const app = require('../app');
const prisma = require('../config/prisma');

let authCookie = '';
let testSubscriptionId = '';

beforeAll(async () => {
  // 1. Clean up any leftover test data
  await prisma.subscription.deleteMany({ where: { platformName: 'TEST_FLIX' } });
  await prisma.user.deleteMany({ where: { email: 'sub_tester@example.com' } });

  // 2. Create a test user via the API so the password hashes correctly!
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Sub Tester',
      email: 'sub_tester@example.com',
      password: 'Password123!'
    });

  // 3. Log them in to steal the JWT Cookie!
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'sub_tester@example.com', password: 'Password123!' });
  
  authCookie = res.headers['set-cookie'];
});

afterAll(async () => {
  // Clean up after the test is done
  await prisma.subscription.deleteMany({ where: { platformName: 'TEST_FLIX' } });
  await prisma.user.deleteMany({ where: { email: 'sub_tester@example.com' } });
});

describe('Subscription API Tests', () => {

  it('should prevent unauthenticated users from creating a subscription', async () => {
    const res = await request(app).post('/api/subscriptions').send({});
    // Should return 401 Unauthorized because we didn't attach the cookie!
    expect(res.statusCode).toEqual(401);
  });

  it('should create a new subscription if authenticated', async () => {
    const res = await request(app)
      .post('/api/subscriptions')
      .set('Cookie', authCookie) // WE ATTACH THE COOKIE HERE
      .send({
        platformName: 'TEST_FLIX',
        category: 'Entertainment',
        price: 9.99,
        currency: 'USD',
        billingCycle: 'MONTHLY',
        startDate: new Date().toISOString(),
        renewalDate: new Date().toISOString(),
        reminderDaysBefore: 3,
        paymentMethod: 'CREDIT_CARD',
        paymentProvider: 'Visa',
        status: 'ACTIVE',
        subscriptionSource: 'MANUAL'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.subscription.platformName).toBe('TEST_FLIX');
    
    // Save the ID so we can test deleting it later
    testSubscriptionId = res.body.subscription.id;
  });

  it('should fetch all subscriptions for the user', async () => {
    const res = await request(app)
      .get('/api/subscriptions')
      .set('Cookie', authCookie);

    expect(res.statusCode).toEqual(200);
    // The array should have at least 1 item (the one we just created)
    expect(res.body.subscriptions.length).toBeGreaterThanOrEqual(1);
  });

  it('should delete the subscription', async () => {
    const res = await request(app)
      .delete(`/api/subscriptions/${testSubscriptionId}`)
      .set('Cookie', authCookie);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('subscription deleted successfully');
  });
});
