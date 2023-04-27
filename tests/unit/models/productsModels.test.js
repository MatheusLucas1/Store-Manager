const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/productModel');

const connection = require('../../../src/models/connection');
const { allProductsResponse } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    // Act
    const result = await productModel.getAllProducts();
    // Assert
    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it('Recuperando uma produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]]);
    // Act
    const result = await productModel.getProductById(1);
    // Assert
    expect(result).to.be.deep.equal(allProductsResponse[0]);
  });
  afterEach(function () {
    sinon.restore();
  });
});