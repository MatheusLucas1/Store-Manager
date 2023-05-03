const { expect } = require('chai');
const sinon = require('sinon');
const salesProductModel = require('../../../src/models/sales_productModel');

const connection = require('../../../src/connection/connection');

const { getAll, insertSaleTemplate, savedSale, getSales } = require('../mocks/getAllSales');

describe('Testes de unidade da camada model da rota /sales', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('Recuperando a lista de sales', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([getAll]);
    // Act
    const result = await salesProductModel.getAll();
    // Assert
    expect(connection.execute).to.be.calledOnce;
    expect(connection.execute).to.be.calledWith('SELECT id as saleId, date FROM sales;');
    expect(result).to.be.deep.equal(getAll);
  });

  it('Recuperando uma sale a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[getAll[0]]]);
    // Act
    const result = await salesProductModel.getSaleProductById(1);
    // Assert
    expect(connection.execute).to.be.calledOnce;
    expect(connection.execute).to.be.calledWith('SELECT id as saleId, date FROM sales WHERE id = ?;');
    expect(result).to.be.deep.equal(getAll[0]);
  });

  it(' insere um produto com sucesso', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    await salesProductModel.insertSaleProduct(insertSaleTemplate);
  });
});