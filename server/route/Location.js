const express = require('express');
const router = express.Router();
const { locationApi } = require('../api/location/location');


router.get('/:searchString?:localization?', locationApi.getLocationsByNameAndLocale);


module.exports = router;