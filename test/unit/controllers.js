const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../services/ProductsService');
const ProductsController = require('../../controllers/ProductsController');

const notFound = { code: 404, message: { message: 'product not found' } };

const validRequest = {
  name: "ProductA",
  quantity:  100,
};

const insertProductResponse = {
  code: 201,
  message: {
    id: 1,
    name: "ProductA",
    quantity: 100,
  }
};

const invalidItem = {
  invalid: true,
  code: 400,
  message: '"name" is required',
};

const products = [
  {
    id: 1,
    name: "ProductA",
    quantity: 100,  
  },
  {
    id: 2,
    name: "ProductB",
    quantity: 100,  
  },
  {
    id: 3,
    name: "ProductC",
    quantity: 100,  
  },
  {
    id: 4,
    name: "ProductD",
    quantity: 100,  
  },
];

const updatedProduct = {
  name: "New Product",
  quantity: 20
};


describe('Products Service', () => {
  describe('1. Insert a new product on the database', () => {
    describe('when it`s a invalid product', () => {
      const response = {};
      const request = {};
      before(() => {
        request.body = {};

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub().returns({});
        sinon.stub(ProductsService, 'createProduct').resolves(invalidItem);
      });
      after(() => {
        ProductsService.createProduct.restore();
      });
      it('returns an object', async () => {
      const post =  await ProductsService.createProduct(request, response);

        expect(post).to.be.an('object');
      });
      it('the object contains a status code 400', async () => {
        await ProductsController.createProduct(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
        expect(response.json.calledWith('"name" is required')).to.be.equal(true);
      });
    });
    describe('when it`s a valid product', () => {
      const request = {};
      const response = {};
      before(() => {
        request.body = validRequest;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(products[0]);

        sinon.stub(ProductsService, 'createProduct').resolves(insertProductResponse);
      });
      after( () => {
        ProductsService.createProduct.restore();
      });
      it('returns an object', async () => {
        const post = await ProductsController.createProduct(request, response)
        expect(post).to.be.an('object');
      });

      it('the object contains a status code 201 and returns the product', async () => {
        await ProductsController.createProduct(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(products[0])).to.be.equal(true);
      });
    });
  });
  describe('2. Request a product By it`s id from the database', () => {
    describe('when it`s a invalid id', () => {
      const response = {};
      const request = {};

      before(() => {
        request.params = { id: "20" };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: 'product not found'});

        sinon.stub(ProductsService, 'getProductById').resolves(notFound);
      });
      after(() => {
        ProductsService.getProductById.restore();
      });
      it('returns an object', async () => {
        const getById = await ProductsService.getProductById(request, response);
        expect(getById).to.be.an('object');
      });
      it('the object contains a status code 404 and an error message', async () => {
        await ProductsController.getProductById(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith(notFound.message)).to.be.equal(true);
      });
    });
    describe('when it`s a valid id', () => {
      const request = {};
      const response = {};
      before(() => {
        request.params = { id: "2" }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(products[1]);

         sinon.stub(ProductsService, 'getProductById').resolves({ code: 200, message: products[1] });
      });
      after(() => {
         ProductsService.getProductById.restore();
      });
      it('returns an object', async () => {
        const post = await ProductsController.getProductById(request, response);
        expect(post).to.be.an('object');
      });

      it('the object contains a status code 200 and a sucess message', async () => {
        await ProductsController.getProductById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(products[1])).to.be.equal(true);
      });
    });
  });
  describe('3. Update a product from the database', () => {
    describe('when it`s a invalid update', () => {
      const request = {};
      const response = {};
      before(async () => {
        request.body = {
          quantity: 100,
        };
        request.params = { id: "2" }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: invalidItem.message });
        sinon.stub(ProductsService, 'updateProduct').resolves({ code: 400, message: invalidItem.message });
      });
      after(async () => {
        ProductsService.updateProduct.restore();
      });
      it('returns an object', async () => {
        const post = await ProductsController.updateProduct(request, response);
        expect(post).to.be.an('object');
      });
      it('the object contains a status code 400 and a error message', async () => {
        await ProductsController.updateProduct(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
        expect(response.json.calledWith(invalidItem.message)).to.be.equal(true);
      });
    });
    describe('when it`s a valid product', () => {
      const request = {};
      const response = {};
      before(() => {
        request.params = { id: 3 };
        request.body = updatedProduct;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(updatedProduct);
        sinon.stub(ProductsService, 'updateProduct').resolves({ code: 200, message: updatedProduct });
      });
      after(() => {
        ProductsService.updateProduct.restore();
      });
      it('returns an object', async () => {
        const post = await ProductsService.updateProduct(request, response);
        expect(post).to.be.an('object');
      });

      it('the object contains a status code and a sucess message', async () => {
        await ProductsController.updateProduct(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(updatedProduct)).to.be.equal(true);
      });
    });
  });
  describe('4. Delete a product from the database', () => {
    describe('when it`s a invalid id to delete', () => {
      const request = {};
      const response = {};
      before( () => {
        request.params = {
          id: "18"
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(notFound.message);
        sinon.stub(ProductsService, 'deleteProduct').resolves(notFound);
      });
      after( () => {
        ProductsService.deleteProduct.restore();
      });
      it('returns an object', async () => {
        const deleted = await ProductsController.deleteProduct(request, response);
        expect(deleted).to.be.an('object');
      });
      it('the object contains a status code and a error message', async () => {
        await ProductsController.deleteProduct(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith(notFound.message)).to.be.equal(true);
      });
    });
    describe('when it`s a valid id to delete', () => {
      const request = {};
      const response = {};
      before(() => {
        request.params = {
          id: '2',
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(products[1]);
        sinon.stub(ProductsService, 'deleteProduct').resolves({code: 200, message: products[1]});
      });
      after(() => {
        ProductsService.deleteProduct.restore();
      });
      it('returns an object', async () => {
        const deleted = await ProductsController.deleteProduct(request, response);
        expect(deleted).to.be.an('object');
      });
      it('the object contains a status code and a sucess message', async () => {
        await ProductsController.deleteProduct(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(products[1])).to.be.equal(true);
      });
    });
  });
});
