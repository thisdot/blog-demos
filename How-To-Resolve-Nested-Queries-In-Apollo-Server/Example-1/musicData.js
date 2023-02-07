const musicBrands = [
  {
    id: 1,
    brandName: "D'Addario",
  },
  {
    id: 2,
    brandName: "Fender",
  },
  {
    id: 3,
    brandName: "Zildjian",
  },
];

const musicAccessories = [
  {
    id: 1,
    product: "NS Micro Violin Tuner Standard",
    price: 24.99,
    brandId: 1,
  },
  {
    id: 2,
    product: "Standard Gong Stand",
    price: 74.99,
    brandId: 3,
  },
  {
    id: 3,
    product: "Black Cymbal Mallets",
    price: 29.99,
    brandId: 3,
  },
  {
    id: 4,
    product: "Classic Series XLR Microphone Cable",
    price: 29.99,
    brandId: 1,
  },
  {
    id: 5,
    product: "Folding 5-Guitar Stand Standard",
    price: 44.99,
    brandId: 2,
  },
  {
    id: 6,
    product: "Black Deluxe Drum Rug",
    price: 144.99,
    brandId: 3,
  },
];

module.exports = { musicAccessories, musicBrands };
