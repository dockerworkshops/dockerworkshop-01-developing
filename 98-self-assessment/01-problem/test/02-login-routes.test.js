const request = require('supertest');
const { jwtVerifyAsync } = require('../utils/jsonwebTokenAsync');
const { expect } = require('chai');

const app = require('../');

describe('Login routes', () => {

  describe('POST /login', () => {

    it('should return 401 when not given a username or password', () => {
      return request(app)
        .post('/login')
        .expect(401);
    });

    it('should return 401 when not given a username', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ password: 'rowan' })
        .expect(401);
    });

    it('should return 401 when not given a password', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'Rowan' })
        .expect(401);
    });

    it('should return 403 when given a non existent username', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'NonExistentUser', password: 'passwordfornonexistentuser' })
        .expect(403);
    });

    it('should return 403 when given an invalid password', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'Rown', password: 'thewrongpassword' })
        .expect(403);
    });

    it('should respond with a token in an Auth header when given a valid username and password', async () => {

      // return request(app)
      const response = await request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'Rowan', password: 'rowan' })
        .expect(200);

      const parseTokenFrom = (response) => {
        try {
          return response.headers.auth
          .split(' ')[1];
        } catch(err) {
          console.log('in catch')
        }
      }

      const token = parseTokenFrom(response);
      expect(token).to.exist;

      try {
        const tokenPayload = await jwtVerifyAsync(token, process.env.TOKEN_SECRET);
        expect(tokenPayload).to.exist;

        expect(tokenPayload.sub.id).to.exist;
        expect(tokenPayload.sub.id).to.equal(3);

        expect(tokenPayload.loggedIn).to.exist;
        expect(tokenPayload.loggedIn).to.be.true;

        expect(tokenPayload.exp).to.exist;
        expect(tokenPayload.exp).to.be.a('number');
        expect(tokenPayload.exp).to.be.greaterThan(Date.now() / 1000);
      } catch(err) {
        throw(err);
      }
    });
  });
});
