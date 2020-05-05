const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;
const {
  sequelize,
  dataTypes,
} = require('sequelize-test-helpers');
const models = require('../../models');
const MovieModel = require('../../models/movie');

describe('models/movie', () => {
  const Movie = MovieModel(sequelize, dataTypes);
  context('Part of a Sublist', () => {
    let result;
    before(() => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          await models.User.destroy({ where: { email: 'integrationtestmovieemailone@gmail.com' } });
          const userobject = await models.User.create({
            email: 'integrationtestmovieemailone@gmail.com',
            firstname: 'fn1',
            lastname: 'ln1',
            password: 'testpassword',
          });
          const movieobject = await models.Movie.create({
            userid: userobject.id,
            tmdbid: 12345,
            watchstate: 'to-watch',
          });
          await models.Sublist.create({ name: 'TestSublist', movie: movieobject.id });
          result = await movieobject.getSublistBelongsTo();
          resolve();
        }, 200);
      });
    });
    it('getSublistBelongsTo returned an existing sublist', async () => {
      const answer = JSON.parse(JSON.stringify(result))[0].name;
      expect(answer).to.equal('TestSublist');
    });
  });
});
