const express = require('express');
const router = express.Router();
const { offerApi } = require('../api/offer/offer');


router.post('/', offerApi.getOffersByLocation);


module.exports = router;