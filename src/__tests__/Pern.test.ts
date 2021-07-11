import { pern1, pern2 } from './mock/PernData';
import { createMultiplePern, createPern, getPern, updatePern, createTestApp } from './mock/RequestMock';
import db from '../models';
import { Express } from 'express';

describe('Test Express API', function () {
  let app: Express;

  beforeAll(() => app = createTestApp());
  beforeEach(() => db.Pern.destroy({ truncate: true }));
  afterAll(() => db.Pern.destroy({ truncate: true }));

  it('Create record successful', function (done) {
    createPern(app, pern1).then(response => {
      expect(response.body.name).toBe(pern1.name);
      done();
    });
  });

  it('Get record list', function (done) {
    const pernList = [pern1, pern2];
    createMultiplePern(app, pernList).then(_ => {
      getPern(app).then(response => {
        expect(response.body.length).toBe(pernList.length);
        expect(response.body[0].name).toBe(pern1.name);
        expect(response.body[1].name).toBe(pern2.name);
        done();
      });
    });
  });

  it('Update record', function (done) {
    createPern(app, pern1).then(response => {
      expect(response.body.name).toBe(pern1.name);
      const updatedName = "updatedName";
      updatePern(app, response.body.id, updatedName).then(response => {
        expect(response.body.name).toBe(updatedName);
        done();
      });
    });
  });

});
