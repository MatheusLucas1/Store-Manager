const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');
const getAll = require('../mocks/getAllProducts');

describe('Testando o Product Controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('com a função getAll', async () => {
    it('retorna um array de produtos', async () => {
      sinon.stub(productService, 'getAllProducts').resolves(getAll);
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      const req = {};
      await productController.getAllProducts(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(getAll);
    });
  });

  describe('com a função getProductById', () => {
    it('retorna um produto', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      sinon.stub(productService, 'getProductById').resolves(getAll[0]);
      await productController.getProductById(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(getAll[0]);
    });

    it('retorna um erro quando o produto não é encontrado', async () => {
      sinon.stub(productService, 'getProductById').resolves(undefined);
      const req = {
        params: {
          id: 3,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      await productController.getProductById(req, res);
      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found' });
    });
  });

  describe('com a função insertProduct', () => {
    it(' insere um produto com sucesso', async () => {
      const newProduct = {
        id: 3,
        name: "Produto Teste",
      };
      sinon.stub(productService, 'addProduct').resolves(newProduct.id);
      const req = {
        body: {
          name: newProduct.name,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      await productController.addProduct(req, res);
      expect(res.status).to.be.calledWith(201);
      expect(res.json).to.be.calledWith(newProduct);
    });

    it('retorna um erro caso o nome do produto não seja enviado', async () => {
      sinon.stub(productService, 'addProduct').resolves(undefined);
      const req = {
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      await productController.addProduct(req, res);
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({ message: '"name" is required' });
    });

    it('retorna um erro caso o nome do produto seja inválido', async () => {
      sinon.stub(productService, 'insertProduct').resolves(undefined);
      const req = {
        body: {
          name: 'P',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      await productController.addProduct(req, res);
      expect(res.status).to.be.calledWith(422);
      expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });
});
