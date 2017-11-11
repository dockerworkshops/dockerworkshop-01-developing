const request = require('supertest');

const app = require('../');

describe('The fallthrough and root route for server', () => {

  describe('Fallthrough route handler', () => {
    it('should return 404', () => {
      return request(app)
        .get('/some/random/route/that/does/not/exist')
        .expect(404);
    });
  });

  describe('GET /', () => {
    it('should return 200', () => {
      return request(app)
        .get('/')
        .expect(200);
    });
  });
});
