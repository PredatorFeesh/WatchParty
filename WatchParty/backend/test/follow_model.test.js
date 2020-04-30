const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const FollowModel = require('../models/follow');

describe('models/follow', () => {
  const Follow = FollowModel(sequelize, dataTypes);
  const follow = new Follow();

  checkModelName(Follow)('Follow');
  context('properties', () => {
    ['followee', 'follower'].forEach(
      checkPropertyExists(follow),
    );
  });
  context('associations', () => {
    const User1 = 'some dummy user-1';
    const User2 = 'some dummy user-2';

    before(() => {
      Follow.associate({ User: User1 });
      Follow.associate({ User: User2 });
    });

    it('defined a belongsTo association with User1', () => {
      expect(Follow.belongsTo).to.have.been.calledWith(User1);
    });

    it('defined a belongsTo association with User2', () => {
      expect(Follow.belongsTo).to.have.been.calledWith(User2);
    });
  });
  context('Called getFollowersOf function', () => {
    before(async () => {
      const fakeGetFollowersOf = sinon.fake.returns('Executed');
      sinon.replace(Follow, 'getFollowersOf', fakeGetFollowersOf);
      Follow.getFollowersOf(1);
    });
    it('getFollowersOf was called', () => {
      expect(Follow.getFollowersOf).to.have.been.called;
    });
  });
  context('Called getFolloweesOf function', () => {
    before(async () => {
      const fakeGetFolloweesOf = sinon.fake.returns('Executed');
      sinon.replace(Follow, 'getFolloweesOf', fakeGetFolloweesOf);
      Follow.getFolloweesOf(1);
    });
    it('getFolloweesOf was called', () => {
      expect(Follow.getFolloweesOf).to.have.been.called;
    });
  });
});
