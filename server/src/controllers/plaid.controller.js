const plaidClient = require('../config/plaid');
const prisma = require('../config/prisma');
const redisClient = require('../config/redis');
const { Products, CountryCode } = require('plaid');

// Step A: Create a link_token so the frontend can open Plaid Link
const createLinkToken = async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: String(req.user.userId) }, // Plaid requires a string
      client_name: 'SubTrack',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });
    res.json({ link_token: response.data.link_token });
  } catch (err) {
    // Log the real Plaid error in your server terminal
    console.error('createLinkToken error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create link token' });
  }
};

// Step B: Exchange the public_token for a permanent access_token
const exchangeToken = async (req, res) => {
  const { public_token, institution_name } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    const { access_token, item_id } = response.data;

    // Save to DB — upsert so reconnecting overwrites old token
    await prisma.plaidItem.upsert({
      where: { userId: req.user.userId },
      update: { accessToken: access_token, itemId: item_id, institutionName: institution_name },
      create: {
        userId: req.user.userId,
        accessToken: access_token,
        itemId: item_id,
        institutionName: institution_name,
      },
    });

    res.json({ success: true, message: 'Bank account connected' });
  } catch (err) {
    console.error('exchangeToken error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
};

// Step C: Fetch recurring subscriptions detected by Plaid
const getRecurringSubscriptions = async (req, res) => {
  try {
    // Get the stored access_token for this user
    const plaidItem = await prisma.plaidItem.findUnique({
      where: { userId: req.user.userId },
    });

    if (!plaidItem) {
      return res.status(404).json({ error: 'No bank account connected' });
    }

    const response = await plaidClient.transactionsRecurringGet({
      access_token: plaidItem.accessToken,
    });

    // Plaid returns outflow_streams (money leaving) and inflow_streams
    const filteredStreams = response.data.outflow_streams
      .filter(stream => stream.is_user_modified === false); // auto-detected only

    const savedSubscriptions = await Promise.all(
      filteredStreams.map(async (stream) => {
        const platformName = stream.merchant_name || stream.description || "Unknown Subscription";
        const price = Math.abs(stream.average_amount.amount);
        const currency = stream.average_amount.iso_currency_code || "USD";
        const billingCycle = stream.frequency ? stream.frequency.toUpperCase() : "MONTHLY";
        
        // Handle dates safely
        const startDate = stream.first_date ? new Date(stream.first_date) : new Date();
        const renewalDate = stream.next_date ? new Date(stream.next_date) : (stream.last_date ? new Date(stream.last_date) : new Date());
        
        const category = stream.personal_finance_category?.primary || 'Entertainment';

        return prisma.subscription.upsert({
          where: { plaidStreamId: stream.stream_id },
          update: {
            price,
            currency,
            renewalDate,
            status: stream.is_active ? 'Active' : 'Cancelled',
          },
          create: {
            userId: req.user.userId,
            platformName,
            category,
            price,
            currency,
            billingCycle,
            startDate,
            renewalDate,
            reminderDaysBefore: 3, // Default reminder
            paymentMethod: 'Bank Account',
            paymentProvider: plaidItem.institutionName || 'Plaid',
            status: stream.is_active ? 'Active' : 'Cancelled',
            subscriptionSource: 'PLAID',
            plaidStreamId: stream.stream_id,
          }
        });
      })
    );

    // INVALIDATE CACHE: Delete old cache so the newly imported subscriptions show up!
    await redisClient.del(`subscriptions:${req.user.userId}`);

    res.json({ subscriptions: savedSubscriptions });
  } catch (err) {
    console.error('getRecurringSubscriptions error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

module.exports = { createLinkToken, exchangeToken, getRecurringSubscriptions };
