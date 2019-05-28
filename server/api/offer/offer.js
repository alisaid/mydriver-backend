const axios = require('axios');
const { offerHelper } = require('./helper');

const offerApi = {
  getOffersByLocation: async function (req, res) {
    try {
      let offerResponse = await axios.post('https://www.mydriver.com/api/v3/offers',req.body);
      let formattedOffers = offerResponse.data.map(offerHelper.formatOffer);
      res.status(offerResponse.status).json(formattedOffers);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
};



module.exports = { offerApi };