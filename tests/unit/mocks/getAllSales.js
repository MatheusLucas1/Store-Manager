const getAll = [
  {
    "sale_id": 1,
    "product_id": 1,
    "quantity": 5,
    "id": 1,
  },
  {
    "sale_id": 1,
    "product_id": 2,
    "quantity": 10,
    "id": 1,
  },
];

const getSales = {
  sales: [
    { sale_id: 1, date: '2021-09-09T04:54:29.000Z' },
    { sale_id: 2, date: '2021-09-09T04:54:54.000Z' },
  ],
  salesProducts: [
    { sale_id: 1, product_id: 1, quantity: 2 },
    { sale_id: 2, product_id: 2, quantity: 2 },
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