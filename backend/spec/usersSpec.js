const request = require('request');
const server = require('../bin/www');

const createUserEndpoint = 'http://localhost:3000/users/create-user';
const userLoginEndpoint = 'http://localhost:3000/users/login';
const updateUserEndpoint;
const deleteUserEndpoint;

describe('Users Endpoints', function() {
    it('create-user endpoint : Post should return a status code 400', function(done) {
        request.post(createUserEndpoint, {json: true, body: {}}, function(error, response) {
            expect(response.statusCode).toEqual(400);
            //console.log(response)
            done();
        });
    }, 20000);

    it('user-login endpoint : Post should return a status code 401', function(done) {
        request.post(userLoginEndpoint, {json: true, body: {}}, function(error, response) {
            expect(response.statusCode).toEqual(401);
            //console.log(response)
            done()
        })
    }, 20000)
});