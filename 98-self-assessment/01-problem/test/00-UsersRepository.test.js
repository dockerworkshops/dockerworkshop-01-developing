const { expect } = require('chai');
const UsersService = require('../services/UsersService');

process.env.NODE_ENV = 'test';

describe('UsersRespository', () => {

  describe('UsersService constructor', () => {

    it('should exist', () => {
      expect(UsersService).to.be.ok;
    });

    it('should be a function', () => {
      expect(UsersService).to.be.a('function');
    });

    it('should build a usersService instance', () => {
      const usersService = new UsersService();

      expect(usersService).to.be.ok;
      expect(usersService).to.be.an.instanceof(UsersService);
    });
  });

  describe('usersService instance', () => {

    const usersService = new UsersService();

    it('should have a getNames method', () => {
      expect(usersService.getNames).to.be.ok;
      expect(usersService.getNames).to.be.a('function');
    });

    it('should have a getSecretFor method', () => {
      expect(usersService.getSecretFor).to.be.ok;
      expect(usersService.getSecretFor).to.be.a('function');
    });

    it('should have a getUser method', () => {
      expect(usersService.getUser).to.be.ok;
      expect(usersService.getUser).to.be.a('function');
    });

    it('should have a tryLoginUser method', () => {
      expect(usersService.tryLoginUser).to.be.ok;
      expect(usersService.tryLoginUser).to.be.a('function');
    });
  });

  describe('usersService.getNames', () => {
    it('should return the usernames in the database', async () => {
      const usersService = new UsersService();

      const expectedNames = [
        { username: 'Django' },
        { username: 'GraceLeeBoggs' },
        { username: 'Rowan' }
      ];

      const actualNames = await usersService.getNames();

      expect(actualNames).to.eql(expectedNames);
    });
  });

  describe('usersService.getUser', async () => {

    const usersService = new UsersService();

    it('should return undefined when the user for the passed in username is not in the database', async () => {
      const undefinedUser = await usersService.getUser('undefinedUser');
      expect(undefinedUser).to.be.undefined;
    });

    it('should return the user for the passed in username if it is in the database', async () => {

      const expectedDjango = {
        id: 1,
        username: 'Django',
        secret: 'The D is silent.',
        password: '$2a$10$Q.KnTrs8rX/hgiL1R2b5HuoTR3zahSIV0GBxEQuXEhiMpigyKoBqm'
      };

      const actualDjango = await usersService.getUser('Django');

      expect(actualDjango).to.eql(expectedDjango);
    });
  });

  describe('usersService.getSecretFor', async () => {

    const usersService = new UsersService();

    it('should return undefined when the user for the passed in id is not in the database', async () => {
      const undefinedID = 999;
      const undefinedSecret = await usersService.getSecretFor(undefinedID);
      expect(undefinedSecret).to.be.undefined;
    });

    it('should return the secret for the passed in id if it is in the database', async () => {

      const expectedSecret = {
        secret: 'The D is silent.'
      };

      const djangosID = 1;
      const actualSecret = await usersService.getSecretFor(djangosID);

      expect(actualSecret).to.eql(expectedSecret);
    });
  });

  describe('usersService.tryLoginUser', async () => {
    const usersService = new UsersService();

    it('should return false when given an invalid username', async () => {
      const authenticatedSuccessfully = await usersService.tryLoginUser('INVALID', 'rowan');
      expect(authenticatedSuccessfully).to.be.false;
    });

    it('should return false when given the wrong password', async () => {
      const authenticatedSuccessfully = await usersService.tryLoginUser('Rowan', 'theWrongPassword');
      expect(authenticatedSuccessfully).to.be.false;
    });

    it('should return true when given a valid username and password combo', async () => {
      const authenticatedSuccessfully = await usersService.tryLoginUser('Rowan', 'rowan');
      expect(authenticatedSuccessfully).to.be.true;
    });
  });

});
