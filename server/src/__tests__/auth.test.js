const request = require('supertest');
const app = require('../app'); // We import your Express app, but we don't start the server!
const prisma = require('../config/prisma');

// This code runs BEFORE all the tests start. 
// We want to clear out any fake test users so we have a clean slate.
beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { email: 'test_user@example.com' }
  });
});

// This code runs AFTER all tests are done to clean up the database.
afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: 'test_user@example.com' }
  });
});

describe('Authentication API Tests', () => {

  // Test 1: Can a user register?
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test_user@example.com',
        password: 'Password123!'
      });

    // We EXPECT the server to return 201 Created
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message');
    // We EXPECT the database to now have our user
    expect(res.body.user.email).toBe('test_user@example.com');
  });

  // Test 2: What happens if they register with the same email again?
  it('should reject a duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test_user@example.com',
        password: 'Password123!'
      });

    // We EXPECT the server to return 409 Conflict
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toBe('User already exists');
  });

  // Test 3: Can they log in and get a JWT Cookie?
  it('should login the user and set a cookie', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test_user@example.com',
        password: 'Password123!'
      });

    // We EXPECT 200 OK and an array of cookies (Set-Cookie)
    expect(res.statusCode).toEqual(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });
});
