const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const expect = chai.expect

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

const FollowModel = require('../models/follow')

describe('models/follow', function() {
  const Follow = FollowModel(sequelize, dataTypes)
  const follow = new Follow

  checkModelName(Follow)('Follow')
  context('properties', () => {
    ;['followee', 'follower'].forEach(
      checkPropertyExists(follow)
    )
  })
  context('associations', () => {
    const User1 = 'some dummy user-1'
    const User2 = 'some dummy user-2'

    before(() => {
      Follow.associate({ User: User1 })
      Follow.associate({ User: User2 })
    })

    it('defined a belongsTo association with User1', () => {
      expect(Follow.belongsTo).to.have.been.calledWith(User1)
    })

    it('defined a belongsTo association with User2', () => {
      expect(Follow.belongsTo).to.have.been.calledWith(User2)
    })
  })
})
