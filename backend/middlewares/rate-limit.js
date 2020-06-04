
/**
 * This middleware is used to limit amount of requests to endpoints.
 * Use external store for more robust solution.
 */

const RateLimiter = require('express-rate-limit');

const limiter = RateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = { limiter };
