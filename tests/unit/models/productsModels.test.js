const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/productModel');

const connection = require('../../../src/connection/connection');
const getAll = require('../mocks/getAllProducts')

describe('Testes de unidade da camada model da rota /produtos', function () {
  afterEach(() => {
    sinon.restore();
  });
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([getAll]);
    // Act
    const result = await productModel.getAllProducts();
    // Assert
    expect(connection.execute).to.be.calledOnce;
    expect(result).to.be.deep.equal(getAll);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[getAll[0]]]);
    // Act
    const result = await productModel.getProductById(1);
    // Assert
    expect(result).to.be.deep.equal(getAll[0]);
  });

  describe('com a função addProduct', () => {
    it(' insere um produto com sucesso', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await productModel.addProduct('Produto Teste');

      expect(connection.execute).to.be.calledOnce;
      expect(result).to.be.deep.equal(3);
    });
  });

});