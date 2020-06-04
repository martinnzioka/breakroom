const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const csrf = require('csurf');
const hpp = require('hpp');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gifRoute = require('./routes/gif');
const articleRoute = require('./routes/articles');
const check = require('./middlewares/token-expiry');
const { isItBusy } = require('./middlewares/too-busy');
const { limiter } = require('./middlewares/rate-limit');
const {
  helmet, csp, expectCt, referrerPolicy, featurePolicy,
} = require('./middlewares/helmet');

const app = express();

app.use(logger('dev'));
app.use((req, res, next) => {
  res.set('X-Frame-Options', 'DENY');
  res.set('Content-Security-Policy', "frame-ancestors 'none';");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, ');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(express.json({ limit: '1kb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(hpp());
app.use(check.isTokenExpired);
app.use(isItBusy);
app.use(cookieParser());
app.use(helmet());
app.use(csp);
app.use(expectCt);
app.use(referrerPolicy);
app.use(featurePolicy);
app.use(csrf({ cookie: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', limiter, usersRouter);
app.use('/gifs', limiter, gifRoute);
app.use('/articles', limiter, articleRoute);

module.exports = app;
