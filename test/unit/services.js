const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../services/ProductsService');
const { answer } = require('../../schema/ProductsSchema');
const ProductsSchema = require('../../schema/ProductsSchema');
const ProductsModel = require('../../models/ProductsModel')

const productName = "ProductA";
const productQuantity = 100;

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


describe('Products Service', () => {
  describe('1. Insert a new product on the database', () => {
    describe('when it`s a invalid product', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getAll').resolves([[]]);
        sinon.stub(ProductsSchema, 'validProduct').resolves(invalidItem);
      });
      after(async () => {
        ProductsModel.getAll.restore();
        ProductsSchema.validProduct.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.createProduct()
        expect(response).to.be.an('object');
      });
      it('the object contains a status code and a error message', async () => {
        const response = await ProductsService.createProduct()

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(400);
        expect(response).to.have.property('message');
        expect(Object.values(response.message)[0]).to.be.equal('"name" is required');
      });
      it("answer works correctly", () => {
        const response = answer(200, products[0]);

        expect(response).to.have.property("code");
        expect(response.code).to.be.equal(200);
        expect(response).to.have.property("message");
        expect(response.message).to.be.equal(products[0]);
      });
    });
    describe('when it`s a valid product', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getAll').resolves([[]]);
        sinon.stub(ProductsModel, 'createProduct').resolves({insertId: 1});
        sinon.stub(ProductsSchema, 'validProduct').resolves(null);
      });
      after(async () => {
        ProductsModel.getAll.restore();
        ProductsModel.createProduct.restore();
        ProductsSchema.validProduct.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.createProduct(productName, productQuantity)
        expect(response).to.be.an('object');
      });

      it('the object contains a status code and a sucess message', async () => {
        const response = await ProductsService.createProduct(productName, productQuantity);

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(201);
        expect(response).to.have.property('message');
        expect(response.message).to.have.property("id");
        expect(response.message.id).to.be.equal(1);
        expect(response.message).to.have.property("name");
        expect(response.message.name).to.be
          .equal(insertProductResponse.message.name);
        expect(response.message).to.have.property("quantity");
        expect(response.message.quantity).to.be
          .equal(insertProductResponse.message.quantity);
      });
    });
  });
  describe('2. Request a product By it`s id from the database', () => {
    describe('when it`s a invalid id', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getAll').resolves([products]);
      });
      after(async () => {
        ProductsModel.getAll.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.getProductById(0)
        expect(response).to.be.an('object');
      });
      it('the object contains a status code and a error message', async () => {
        const response = await ProductsService.getProductById(0)

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(404);
        expect(response).to.have.property('message');
        expect(Object.values(response.message)[0]).to.be.equal('Product not found');
      });
    });
    describe('when it`s a valid product', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getAll').resolves([products]);
      });
      after(async () => {
        ProductsModel.getAll.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.getProductById(3)
        expect(response).to.be.an('object');
      });

      it('the object contains a status code and a sucess message', async () => {
        const response = await ProductsService.getProductById(3);

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(200);
        expect(response).to.have.property('message');
        expect(response.message).to.have.property("id");
        expect(response.message.id).to.be.equal(3);
        expect(response.message).to.have.property("name");
        expect(response.message.name).to.be.equal("ProductC");
        expect(response.message).to.have.property("quantity");
        expect(response.message.quantity).to.be.equal(100);
      });
    });
  });
  describe('3. Update a product from the database', () => {
    describe('when it`s a invalid update', () => {
      before(async () => {
        sinon.stub(ProductsSchema, 'validProduct').resolves(invalidItem);
      });
      after(async () => {
        ProductsSchema.validProduct.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.updateProduct('', 100, 2);
        expect(response).to.be.an('object');
      });
      it('the object contains a status code and a error message', async () => {
        const response = await ProductsService.updateProduct('', 100, 2);

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(invalidItem.code);
        expect(response).to.have.property('message');
        expect(Object.values(response.message)[0]).to.be.equal(invalidItem.message);
      });
    });
    describe('when it`s a valid product', () => {
      before(async () => {
        sinon.stub(ProductsSchema, 'validProduct').resolves(null);
        sinon.stub(ProductsModel, 'updateProduct').resolves({ insertId:1 });
        sinon.stub(ProductsSchema, 'getProductById').resolves({code: 200, message: products[2]});
      });
      after(async () => {
        ProductsSchema.validProduct.restore();
        ProductsSchema.getProductById.restore();
        ProductsModel.updateProduct.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.updateProduct('ProductF', 500, 3);
        expect(response).to.be.an('object');
      });

      it('the object contains a status code and a sucess message', async () => {
        const response = await ProductsService.updateProduct('ProductF', 500, 3);

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(200);
        expect(response).to.have.property('message');
        expect(response.message).to.have.property("id");
        expect(response.message.id).to.be.equal(3);
        expect(response.message).to.have.property("name");
        expect(response.message.name).to.be.equal("ProductF");
        expect(response.message).to.have.property("quantity");
        expect(response.message.quantity).to.be.equal(500);
      });
    });
  });
  describe('4. Delete a product from the database', () => {
    describe('when it`s a invalid id to delete', () => {
      before(async () => {
        sinon.stub(ProductsSchema, 'getProductById').resolves({code: 404, message: 'Product not found'});
        // sinon.stub(ProductsModel, 'deleteProduct').resolves({ insertId: 1 });
      });
      after(async () => {
        ProductsSchema.getProductById.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.deleteProduct(10);
        expect(response).to.be.an('object');
      });
      it('the object contains a status code and a error message', async () => {
        const response = await ProductsService.deleteProduct(10);

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(404);
        expect(response).to.have.property('message');
        expect(response.message).to.be.equal('Product not found');
      });
    });
    describe('when it`s a valid id to delete', () => {
      before(async () => {
        sinon.stub(ProductsSchema, 'getProductById').resolves({code: 200, message: products[0]});
        sinon.stub(ProductsModel, 'deleteProduct').resolves({ insertId:1 });
      });
      after(async () => {
        ProductsModel.deleteProduct.restore();
        ProductsSchema.getProductById.restore();
      });
      it('returns an object', async () => {
        const response = await ProductsService.deleteProduct(1);
        expect(response).to.be.an('object');
      });

      it('the object contains a status code and a sucess message', async () => {
        const response = await ProductsService.deleteProduct(1);

        expect(response).to.have.property('code');
        expect(response.code).to.be.equal(200);
        expect(response).to.have.property('message');
        expect(response.message).to.have.property("id");
        expect(response.message.id).to.be.equal(1);
        expect(response.message).to.have.property("name");
        expect(response.message.name).to.be.equal("ProductA");
        expect(response.message).to.have.property("quantity");
        expect(response.message.quantity).to.be.equal(100);
      });
    });
  });
});
