const offerRoute = require('../route/offer');
const express = require('express');
const request = require('supertest');
const testData = require('./data/offers.json');
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');


var mock = new MockAdapter(axios);

const errorData = {
  response:{
    status:400,
    data:'Bad request'
  }
}
const initApp = () => {
  const app = express();
  app.use('/offers', offerRoute);
  return app;
}

const post_data={
  "originPlaceId":"ChIJRW3aI1kTnkcRS89WOoV6xeM",
  "selectedStartDate": "2019-11-22T12:45:00+02:00",
  "duration":"120",
  "type": "DURATION"
  }

const URL_TO_MOCK=/www.mydriver.com\/api\/v3\/offers/;

describe('POST /offers', () => {

  test('should return 200 and expected data ', async () => {
    
    mock.onPost(URL_TO_MOCK).reply(200, testData);
    const app = initApp();
    const res = await request(app)
                      .post('/offers')
                      .send({data:post_data});

    const objectKeys=Object.keys(res.body[0]);
    expect(res.status).toBe(200);
    expect(objectKeys[0]).toBe('amount');
    expect(objectKeys[1]).toBe('currency');
    expect(objectKeys[2]).toBe('vehicleyTypeId');
    expect(objectKeys[3]).toBe('name');
    expect(objectKeys[4]).toBe('nrOfPassengers');
    expect(objectKeys[5]).toBe('nrOfBaggage');
    expect(objectKeys[6]).toBe('web_img');
    expect(objectKeys[7]).toBe('title');
    expect(objectKeys[8]).toBe('exampleCar');
    expect(objectKeys.length).toBe(9);
  });

  test('should return expected error code and message', async () =>{
    mock.onPost(URL_TO_MOCK).reply(400, errorData);
    const app = initApp();
    const res = await request(app)
                      .post('/offers')
                      .send({data:post_data});
    expect(res.body.response.status).toBe(400);
    expect(res.body.response.data).toEqual('Bad request');
  })
})