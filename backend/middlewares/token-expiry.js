const jwt = require('jsonwebtoken');
const { pool } = require('../database/database');


exports.isTokenExpired = async (req, res, next) => {
  if (req.headers['x-access-token']) {
    const accessToken = req.headers['x-access-token'];
    const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        status: 'unauthorized',
        message: {
          error: 'Token has expired, please login to obtain a new one.',
        },
      });
    }
    // Setting Locals.loggedInUser for 'If logged-in check'
    try {
      const queryResult = await pool.query('SELECT * FROM employeeDetails WHERE user_id = $1;', [userId]);
      res.locals.loggedInUser = queryResult.rows[0];
      next();
    } catch (error) {
      res.status(404).json({
        status: 'not found',
        message: {
          name: error.name,
          code: error.code,
          detail: error.detail,
          stack: error.stack,
        },
      });
    }
  } else {
    next();
  }
};
