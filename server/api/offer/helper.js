const offerHelper = {
  formatOffer(offer){
    return {
      amount: offer.amount / 100,
      currency: offer.currency,
      vehicleyTypeId: offer.vehicleType.id,
      name: offer.vehicleType.name,
      nrOfPassengers: offer.vehicleType.nrOfPassengers,
      nrOfBaggage: offer.vehicleType.nrOfBaggage,
      web_img: offer.vehicleType.images.hdpi,
      title: offer.vehicleType.title,
      exampleCar: offer.vehicleType.exampleCar
    };
  }
}

module.exports = { offerHelper };