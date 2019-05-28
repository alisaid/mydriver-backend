const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const locationRoutes = require('./server/route/location');
const offerRoutes = require('./server/route/offer');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/locations', locationRoutes);
app.use('/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;