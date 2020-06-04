/**
 * Monitoring the Event Loop.
 * This middleware is for keeping track of long request in the event-loop,
   that tend to be blocking in node-js.
 * DEFAULTS:
   1. check interval = 500ms.
   2. maxLag = 70ms.
 *
*/

const toobusy = require('toobusy-js');

// Whill block requests when we're too busy.
const isItBusy = async (req, res, next) => {
  if (toobusy()) {
    res.status(503).json({
      status: "I'm busy right now, please try again later.",
    });
  } else {
    next();
  }
};

module.exports = { toobusy, isItBusy };
