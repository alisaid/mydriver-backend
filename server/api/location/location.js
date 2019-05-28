const { locationHelper } = require('./helper');
const allLocations = require('./data.json').data;

const locationApi = {
  getLocationsByNameAndLocale: async function (req, res) {
    try {
      const { locale, searchString } = req.query;
      if(!locale || !searchString){
        res.status(400).json('Missing parameters');
        return;
      }    
      const helper = locationHelper(searchString, locale);
      let locations = allLocations.map(helper.filterTranslations)
                                  .filter(helper.isIncludeTheName)
                                  .map(helper.formatLocation)
                                  .slice(0,10);
                                  
      res.status(200).json(locations);      
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = { locationApi };