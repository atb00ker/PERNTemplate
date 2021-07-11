import request from 'supertest';
import router from '../../routes/Router';
import express, { Express } from 'express';

export function createTestApp() {
  let app: Express = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/', router);
  return app;
}

export function createPern(app: Express, pernRecord: any) {
  return request(app)
    .post('/pern')
    .set('Accept', 'application/json')
    .send({ name: pernRecord.name })
}

export async function createMultiplePern(app: Express, pernList: any[]) {
  for (let pernRecord of pernList)
    await createPern(app, pernRecord);
  return Promise.resolve();
}

export function getPern(app: Express) {
  return request(app).get('/pern')
}

export function updatePern(app: Express, updateId: string, updateName: string) {
  return request(app)
    .put(`/pern/${updateId}`)
    .set('Accept', 'application/json')
    .send({ id: updateId, name: updateName })
}
