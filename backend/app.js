var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var { pool } = require('./database/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gifRoute = require('./routes/gif')
var articleRoute = require('./routes/articles')

var app = express();

app.use(logger('dev'));
app.use((req, res, next) => {
    res.set('X-Frame-Options', 'DENY');
    res.set('Content-Security-Policy', "frame-ancestors 'none';");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async(req, res, next) => {
    if (req.headers['x-access-token']) {
        const accessToken = req.headers['x-access-token'];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                status: 'unauthorized',
                message: {
                    error: 'Token has expired, please login to obtain a new one.'
                }
            });
        } else {
            try {
                const data = await pool.query(`SELECT * FROM employeeDetails WHERE user_id = $1;`, [userId]);
                res.locals.loggedInUser = data.rows[0];
                next()
            } catch (error) {
                res.status(404).json({
                    status: 'not found',
                        message: {
                            name: error.name,
                            code: error.code,
                            detail: error.detail,
                            stack: error.stack
                        }
                });
            }
        }
        
    } else {
        next()
    }
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gifs', gifRoute);
app.use('/articles', articleRoute)

module.exports = app;
