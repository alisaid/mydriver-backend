const locationRoutes = require('../route/Location');
const express = require('express');
const request = require('supertest');
const testData = require('./data/locations.json').data;

const initApp = () => {
  const app = express();
  app.use('/locations', locationRoutes);
  return app;
}

describe('GET /location', () => {
  it('should return error when we dont provide locale', async () => {
    const app = initApp();
    const emptyLocale='';
    const result= await request(app).get(`/locations?searchString=ber&locale=${emptyLocale}`);
    expect(result.status).toBe(400);
  });
  it('should return error when we dont provide searchString', async () => {
    const app = initApp();
    const emptySearchString='';
    const result= await request(app).get(`/locations?searchString=${emptySearchString}&locale=gb`);
    expect(result.status).toBe(400);
  });
  test('should return 200 ', async () => {
    const app = initApp();
    const res = await request(app).get('/locations?searchString=ber&locale=gb');
    expect(res.status).toBe(200);
  });
  test('should return empty list when we send invalid search string', async ()=>{
    const app = initApp();
    const invalidSearchString='asdf';
    const res = await request(app).get(`/locations?searchString=${invalidSearchString}&locale=gb`);
    expect(res.body.length).toBe(0);
  });

  test('should return empty list when we send invalid locale', async ()=>{
    const app = initApp();
    const invalidLocale='asdf';
    const res = await request(app).get(`/locations?searchString=ber&locale=${invalidLocale}`);
    expect(res.body.length).toBe(0);
  });

  test('should return correct translation', async ()=>{
    const app = initApp();
    let res = await request(app).get(`/locations?searchString=ber&locale=gb`);
    expect(res.body[0].label).toBe('(TXL) Berlin Tegel Airport');

    res = await request(app).get(`/locations?searchString=ber&locale=nl`);
    expect(res.body[0].label).toBe('(TXL) Berlijn Tegel Luchthaven');
  });
});