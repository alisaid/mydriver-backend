const locationHelper = function(searchString, locale){
    this.searchString = searchString;
    this.locale = locale;

    return {
      filterTranslations: (location) => {
        return {...location, translation:location.translations.find(t => t.locale === this.locale)};
      },
      
      isIncludeTheName: (location) => {
        let splittedArr = searchString.split(' ');
        
        return  location.translation && 
                splittedArr.some(word => 
                  location.translation.terms.filter(t => t.startsWith(word)).length > 0);
      },
      
     formatLocation: (location) => {
        let result = {
          id: location.id,
          originPlaceId: location.placeId,
          city: location.city,
          category: location.category,
          label: location.translation.label,
          address: location.translation.address
        };
      
        return result;
      },
    }
}


module.exports= {
  locationHelper
}