const rateLimit = require('express-rate-limit');

// Limits login/register to 10 attempts per 15 minutes per IP address.
// If a hacker tries to brute-force passwords, they get blocked after 10 tries.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 10,                      // Max 10 requests per window per IP
  message: {
    error: 'Too many attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,        // Sends rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,         // Disables the old `X-RateLimit-*` headers
});

module.exports = { authLimiter };
