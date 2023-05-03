const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');

const connection = require('../../../src/connection/connection');

const { getAll, insertSaleTemplate, savedSale, getSales } = require('../mocks/getAllSales');

describe('Testes de unidade da camada model da rota /sales', function () {
  afterEach(() => {
    sinon.restore();
  });
  it('Recuperando a lista de sales', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([ getAll ]);
    // Act
    const result = await salesModel.getAllSales();
    // Assert
    expect(connection.execute).to.be.calledOnce;
    expect(result).to.be.deep.equal(getAll);
  });

  it('Recuperando uma sale a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves(getAll[0]);
    // Act
    const result = await salesModel.getSaleById(1);
    // Assert
    expect(connection.execute).to.be.calledOnce;
    expect(result).to.be.deep.equal(getAll[0]);
  });

  it(' insere um produto com sucesso', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    await salesModel.addSale(insertSaleTemplate);
  });
});