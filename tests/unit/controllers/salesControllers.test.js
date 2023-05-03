const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const saleService = require('../../../src/services/salesServices');
const saleController = require('../../../src/controllers/salesController');
const { getAll, insertSaleTemplate, savedSale } = require('../mocks/getAllSales');

describe('Testando o Sale Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('com a função getAll', async () => {
    it('retorna um array de sales', async () => {
      sinon.stub(saleService, 'getAllSales').resolves(getAll);
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      const req = {};
      await saleController.getAllSales(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(getAll);
    });
  });

  describe('com a função getSaleById', async () => {
    it('retorna uma sale', async () => {
      sinon.stub(saleService, 'getSaleById').resolves(getAll[0]);
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      const req = {
        params: {
          id: 1,
        },
      };
      await saleController.getSaleById(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(getAll[0]);
    });

    it('retorna um erro quando a sale não é encontrada', async () => {
      sinon.stub(saleService, 'getSaleById').resolves(undefined);
      const req = {
        params: {
          id: 3,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };

      await saleController.getSaleById(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Sale not found' });
    });
  });

  describe('com a função insertSale', async () => {
    it('salva uma sale com sucesso!', async () => {
      sinon.stub(saleService, 'insertSale').resolves(3);
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      const req = {
        body: insertSaleTemplate,
      };

      await saleController.insertSale(req, res);

      expect(res.status).to.be.calledWith(201);
      expect(res.json).to.be.calledWith(savedSale);
    });
  });
});
