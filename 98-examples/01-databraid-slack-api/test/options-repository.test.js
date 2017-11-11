/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { setOption, getOption } = require('../repositories/option-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Options Repo setOption',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(setOption).to.exist;
    });

    it('should be a function', () => {
      expect(setOption).to.be.a('function');
    });
  }),
);

describe(
  'Options Repo getOption',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getOption).to.exist;
    });

    it('should be a function', () => {
      expect(getOption).to.be.a('function');
    });

    it('should return a string', () => getOption('oauth_token').then((result) => {
      expect(result).to.be.a('string');
    }));

    it('should do a data round-trip', () => setOption('oauth_token', '987654321')
      .then(() => getOption('oauth_token'))
      .then((result) => {
        expect(result).to.equal('987654321');
      }),
    );
  }),
);
