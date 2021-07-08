import 'regenerator-runtime/runtime';
const { pern1, pern2 } = require('./mock/PernData');
const request = require('./mock/RequestMock');
const db = require('../models');

describe('Test Express API', function () {
  let app = null;

  beforeAll(() => app = request.createTestApp());
  beforeEach(() => db.Pern.destroy({ truncate: true }));
  afterAll(() => db.Pern.destroy({ truncate: true }));

  it('Create record successful', function (done) {
    request.createPern(app, pern1).then(response => {
      expect(response.body.name).toBe(pern1.name);
      done();
    });
  });

  it('Get record list', function (done) {
    const pernList = [pern1, pern2];
    request.createMultiplePern(app, pernList).then(_ => {
      request.getPern(app).then(response => {
        expect(response.body.length).toBe(pernList.length);
        expect(response.body[0].name).toBe(pern1.name);
        expect(response.body[1].name).toBe(pern2.name);
        done();
      });
    });
  });

  it('Update record', function (done) {
    request.createPern(app, pern1).then(response => {
      expect(response.body.name).toBe(pern1.name);
      const updatedName = "updatedName";
      request.updatePern(app, response.body.id, updatedName).then(response => {
        expect(response.body.name).toBe(updatedName);
        done();
      });
    });
  });

});
