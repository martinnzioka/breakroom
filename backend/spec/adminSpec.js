const request = require('request');
const server = require('../bin/www');

const endpoint = 'http://localhost:3000/users/admin/create-user';

describe('create-user endpoint', function() {
    it('Post should give status code 500', function(done) {
        request.post(endpoint, {json: true, body: {}}, function(error, response) {
            expect(response.statusCode).toEqual(500);
            done();
        });
    });
});