const getAll = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 2,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const getSales = {
  sales: [
    { saleId: 1, date: '2021-09-09T04:54:29.000Z' },
    { saleId: 2, date: '2021-09-09T04:54:54.000Z' },
  ],
  salesProducts: [
    { saleId: 1, productId: 1, quantity: 2 },
    { saleId: 2, productId: 2, quantity: 2 },
  ],
};

const insertSaleTemplate = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const savedSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = { getAll, insertSaleTemplate, savedSale, getSales };