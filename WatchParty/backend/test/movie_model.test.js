const { chai, expect } = require('chai');
const sinon = require('sinon');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
  makeMockModels,
} = require('sequelize-test-helpers');
const models = require('../models');
const MovieModel = require('../models/movie');

describe('models/movie', function () {
  const Movie = MovieModel(sequelize, dataTypes);
  const movie = new Movie();
  context('properties', () => {
    ['userid', 'tmdbid', 'watchstate'].forEach(
      checkPropertyExists(movie),
    );
  });
  context('associations', () => {
    const User = 'some dummy user';

    before(() => {
      Movie.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(Movie.belongsTo).to.have.been.calledWith(User);
    });
  });
  context('Movie get user', () => {
    const fakeMovie = models.Movie.build({
      userid: 1,
      tmdbid: 12345,
      watchstatus: 'to-watch',
    });
    before(async () => {
      fakeMovie.getUser();
    });
    it('got userid from movie', () => {
      expect(fakeMovie.getUser()).to.equal(1);
    });
  });
  context('Part of Sublist', () => {
    before(async () => {
      const fakeGetSublistBelongsTo = sinon.fake.returns('Executed');
      sinon.replace(Movie, 'getSublistBelongsTo', fakeGetSublistBelongsTo);
      Movie.getSublistBelongsTo(1);
    });
    it('getSublistBelongsTo was called', () => {
      expect(Movie.getSublistBelongsTo).to.have.been.called;
    });
  });
});
