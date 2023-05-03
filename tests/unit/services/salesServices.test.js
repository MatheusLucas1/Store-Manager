const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const saleModel = require('../../../src/models/salesModel');
const saleProductModel = require('../../../src/models/sales_productModel');
const saleService = require('../../../src/services/salesServices');
const { getAll, insertSaleTemplate, savedSale, getSales } = require('../mocks/getAllSales');

describe('Testando a camada services da rota /sales', () => { 
  afterEach(() => {
    sinon.restore();
  });

  it('retorna um array de sales', async () => {
    sinon.stub(saleModel, 'getAllSales').resolves(getSales.sales);
    sinon.stub(saleProductModel, 'getAll').resolves(getSales.salesProducts);

    const result = await saleService.getAllSales();

    expect(result).to.be.deep.equal(getAll);
  });

  it('retorna uma sale pelo id', async () => {
    sinon.stub(saleModel, 'getSaleById').resolves(getSales.sales[0]);
    sinon.stub(saleProductModel, 'getSaleProductById').resolves([getSales.salesProducts[0]]);

    const result = await saleService.getSaleById(1);

    const r = { ...getAll[0] };
    delete r.saleId;

    expect(result).to.be.deep.equal([r]);
  });

  it('retorna um erro quando a sale não é encontrada', async () => {
    sinon.stub(saleModel, 'getSaleById').resolves(undefined);

    const result = await saleService.getSaleById(999);

    expect(result).to.be.undefined;
  });

  it('salva uma sale com sucesso!', async () => {
    sinon.stub(saleModel, 'addSalle').resolves(3);
    sinon.stub(saleProductModel, 'insertSaleProduct').resolves();

    await saleService.insertSale(insertSaleTemplate);
  });
});