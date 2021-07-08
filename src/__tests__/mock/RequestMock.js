const request = require('supertest'),
  router = require('../../routes/Router'),
  express = require('express');

export function createTestApp() {
  let app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/', router);
  return app;
}

export function createPern(app, pernRecord) {
  return request(app)
    .post('/pern')
    .set('Accept', 'application/json')
    .send({ name: pernRecord.name })
}

export async function createMultiplePern(app, pernList) {
  for (let pernRecord of pernList)
    await createPern(app, pernRecord);
  return Promise.resolve();
}

export function getPern(app) {
  return request(app).get('/pern')
}

export function updatePern(app, updateId, updateName) {
  return request(app)
    .put(`/pern/${updateId}`)
    .set('Accept', 'application/json')
    .send({ id: updateId, name: updateName })
}
