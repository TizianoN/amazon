const products = [
  {
    id: 1,
    name: 'Paletta',
    price: {
      amount: 33.5,
      currency: '€',
    },
    discount: {
      type: '€',
      amount: 20,
    },
    colors: ['gray', 'green', 'red'],
  },
  {
    id: 2,
    name: 'Monitor',
    price: {
      amount: 200,
      currency: '€',
    },
    discount: {
      type: '€',
      amount: 20,
    },
    colors: ['black', 'silver'],
  },
  {
    id: 3,
    name: 'Cuffie',
    price: {
      amount: 120,
      currency: '€',
    },
    discount: {
      type: '€',
      amount: 20,
    },
    colors: ['red'],
  },
  {
    id: 4,
    name: 'Mouse',
    price: {
      amount: 25,
      currency: '€',
    },
    discount: {
      type: '€',
      amount: 20,
    },
    colors: ['black'],
  },
];

module.exports = products;
