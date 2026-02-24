const cityFaMap = {
  1: "تهران",
  2: "سنندج",
  3: "مادرید",
  4: "اصفهان",
  5: "سلیمانیه",
  6: "اربیل",
  7: "مازندران",
  8: "آفرود",
  9: "ایتالیا",
};

export const extractCities = (tours) => {
  const cityMap = new Map();

  tours.forEach((tour) => {
    [tour.origin, tour.destination].forEach((city) => {
      cityMap.set(city.id, {
        ...city,
        faName: cityFaMap[city.id] ?? city.name,
      });
    });
  });

  return Array.from(cityMap.values());
};
