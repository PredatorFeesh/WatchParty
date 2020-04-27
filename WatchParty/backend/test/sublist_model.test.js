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

const SublistModel = require('../models/sublist')

describe('models/sublist', function() {
  const Sublist = SublistModel(sequelize, dataTypes)
  const sublist = new Sublist

  checkModelName(Sublist)('Sublist')
  context('properties', () => {
    ;['name', 'movie'].forEach(
      checkPropertyExists(sublist)
    )
  })
  context('associations', () => {
    const Movie = 'some dummy movie'

    before(() => {
      Sublist.associate({ Movie })
    })

    it('defined a belongsTo association with Movie', () => {
      expect(Sublist.belongsTo).to.have.been.calledWith(Movie)
    })
  })
})
