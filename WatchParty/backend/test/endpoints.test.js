const app = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);
describe('Server', () => {
  it('does not pong on wrong input', done => {
    chai
      .request(app)
      .post('/api/ping')
      .send({ message: 'ping', token: 'fake'})
      .end((err, res) => {
        expect(res).to.have.status(401);
      });
  });
  
  // add right input, and no input
  
});