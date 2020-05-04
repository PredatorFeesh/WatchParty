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

const MovieModel = require('../models/movie')

describe('models/movie', function() {
  const Movie = MovieModel(sequelize, dataTypes)
  const movie = new Movie

  checkModelName(Movie)('Movie')
  context('properties', () => {
    ;['userid', 'tmdbid', 'watchstate'].forEach(
      checkPropertyExists(movie)
    )
  })
  context('associations', () => {
    const User = 'some dummy user'

    before(() => {
      Movie.associate({ User })
    })

    it('defined a belongsTo association with User', () => {
      expect(Movie.belongsTo).to.have.been.calledWith(User)
    })
  })
})
