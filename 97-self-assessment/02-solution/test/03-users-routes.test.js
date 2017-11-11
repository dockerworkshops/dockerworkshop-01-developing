const request = require('supertest');
const knex = require('../knex');
const { expect } = require('chai');

const app = require('../');

describe('Users routes', () => {

  /*
   * As this is the last test file, the connection to postgres (via knex)
   * must be destroyed or else the test will hang
  * */

  after(() => {
    knex.destroy();
  });

  describe('GET /users', () => {

    it('should return 403 if sent without a token', () => {
      return request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect(403);
    });

    it('should return 403 if sent with an invalid token', () => {
      return request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .set('Auth', 'Bearer: not.avalid.token')
        .expect(403);
    });

    it('should return the user names in the database if sent with a valid token', async () => {
      const agent = request(app);

      const successfulLoginResponse = await agent
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'Rowan', password: 'rowan' })

      const parseTokenFrom = (response) => {
        try {
          return response.headers.auth
            .split(' ')[1];
        } catch(err) {
          // catch error to proceed to tests
        }
      }

      const token = parseTokenFrom(successfulLoginResponse);
      expect(token).to.exist;

      const usersInDatabase = [
        {
          "username": "Django"
        },
        {
          "username": "GraceLeeBoggs"
        },
        {
          "username": "Rowan"
        }
      ];

      return agent
        .get('/users')
        .set('Accept', 'application/json')
        .set('Auth', `Bearer: ${token}`)
        .expect(200, usersInDatabase);

    });
  });

  describe('GET /users/:id', () => {

    it('should return 403 if sent without a token', () => {
      return request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .expect(403);
    });

    it('should return 403 if sent with an invalid token', () => {
      return request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .set('Auth', 'Bearer: not.avalid.token')
        .expect(403);
    });

    it('should return 403 if sent with a token that does not grant access to the specific resource', async () => {

      const agent = request(app);

      const successfulLoginResponse = await agent
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'Rowan', password: 'rowan' });

      const parseTokenFrom = (response) => {
        try {
          return response.headers.auth
            .split(' ')[1];
        } catch(err) {
          // catch error to proceed to tests
        }
      }

      const token = parseTokenFrom(successfulLoginResponse);
      expect(token).to.exist;

      return request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .set('Auth', `Bearer: ${token}`)
        .expect(403);
    });

    it('should respond with the user\'s secret if sent the appropriate token', async () => {

      const agent = request(app);

      const successfulLoginResponse = await agent
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'Rowan', password: 'rowan' });

      const parseTokenFrom = (response) => {
        try {
          return response.headers.auth
            .split(' ')[1];
        } catch(err) {
          // catch error to proceed to tests
        }
      }

      const token = parseTokenFrom(successfulLoginResponse);
      expect(token).to.exist;

      const userSecret = {
        secret: "I don't know you're not me."
      };

      return request(app)
        .get('/users/3')
        .set('Accept', 'application/json')
        .set('Auth', `Bearer: ${token}`)
        .expect(200, userSecret);

    });
  });
});

