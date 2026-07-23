const { createClient } = require('redis');

// Create a Redis client
// By default, it connects to redis://localhost:6379 (the standard local Redis port)
const redisClient = createClient();

// Add error handling so it doesn't crash our app if Redis goes down
redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.on('connect', () => {
  console.log('✅ Connected to Redis Database');
});

// We must explicitly call connect() in Redis v4
const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
};

connectRedis();

module.exports = redisClient;
