const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const productModel = require('../../../src/models/productModel');
const productService = require('../../../src/services/productService');
const getAll = require('../mocks/getAllProducts');

describe('Testando a camada services da rota /products', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('retorna um array de produtos', async () => {
    sinon.stub(productModel, 'getAllProducts').resolves(getAll);

    const result = await productService.getAllProducts();

    expect(productModel.getAllProducts).to.be.calledOnce;
    expect(productModel.getAllProducts).to.be.calledWith();
    expect(result).to.be.deep.equal(getAll);
  });

  it('retorna um produto', async () => {
    sinon.stub(productModel, 'getProductById').resolves(getAll[0]);

    const result = await productService.getProductById(1);

    expect(productModel.getProductById).to.be.calledOnce;
    expect(productModel.getProductById).to.be.calledWith(1);
    expect(result.message).to.be.deep.equal(getAll[0]);
  });

  it('retorna um erro quando o produto não é encontrado', async () => {
    sinon.stub(productModel, 'getProductById').resolves(undefined);

    const result = await productService.getProductById(999);

    expect(productModel.getProductById).to.be.calledOnce;
    expect(productModel.getProductById).to.be.calledWith(999);
    expect(result.message).to.be.equal('Product not found');
  });

  it(' insere um produto com sucesso', async () => {
    sinon.stub(productModel, 'addProduct').resolves(3);

    const result = await productService.addProduct('Produto Teste');

    expect(productModel.addProduct).to.be.calledOnce;
    expect(productModel.addProduct).to.be.calledWith('Produto Teste');
    expect(result).to.be.equal(3);
  });

});