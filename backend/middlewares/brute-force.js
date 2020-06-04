/**
 * This middleware if for brute-forcing precations.
 */

const ExpressBrute = require('express-brute');
const { store } = require('../database/database');

exports.globalBruteForce = new ExpressBrute(store);
