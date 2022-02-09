const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../models/ProductsModel');
const connection = require('../../models/connection');

const payloadProduct = {
  name: "productA",
  quantity: 100,
};

const products = [
  {
    id: 1,
    name: "productA",
    quantity: 100,  
  },
  {
    id: 2,
    name: "productB",
    quantity: 100,  
  },
  {
    id: 3,
    name: "productC",
    quantity: 100,  
  },
  {
    id: 4,
    name: "productD",
    quantity: 100,  
  },
];

const productUpdated = {
  name: 'productA',
  quantity: 100,
  id: 1,
};

describe('Products', () => {
  describe('1. Insert a new product on the database', () => {
    describe('When it`s successfully insert', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('returns an object', async () => {
        const response = await ProductsModel.createProduct(payloadProduct.name, payloadProduct.quantity);
        
        expect(response).to.be.an('object');
      });

      it('returns an object with the correct insertId', async () => {
        const responseObject = await ProductsModel.createProduct(payloadProduct.name, payloadProduct.quantity);

        expect(responseObject).to.have.a.property("insertId");
        expect(responseObject.insertId).to.be.equals(1);
      });
    });
  });
  describe('2. Request all products from the database', () => {
    describe('When it`s successfully requested', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(products);
      });
      after(async () => {
        connection.execute.restore();
      });
      
      it('returns an array', async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.an('array');
      });
      
      it('returns an array with all products registered', async () => {
        const responseArray = await ProductsModel.getAll();
        expect(responseArray).to.have.length(4);
      });
      
      it('the products have the fields "id", "name" and "quantity"', async () => {
        const [firstProduct] = await ProductsModel.getAll();
        const productFields = ['id', 'name', 'quantity'];
        
        for (let field of productFields) {
          expect(firstProduct).to.have.property(field);
        }
      });
    });
  });
  describe('3. Update a products from the database', () => {
    describe('When it`s successfully updated', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('returns an object', async () => {
        const response = await ProductsModel
          .updateProduct(productUpdated.name, productUpdated.quantity, productUpdated.id);
        
          expect(response).to.be.an('object');
      });

      it('returns an object with the correct insertId', async () => {
        const responseObject = await ProductsModel
          .updateProduct(productUpdated.name, productUpdated.quantity, productUpdated.id);

        expect(responseObject).to.have.property("insertId");
        expect(responseObject.insertId).to.be.equal(1);
      });
    });
  });
  describe('4. Deletes a product from database', () => {
    describe('when it`s successfully deleted', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('returns an object', async () => {
        const resolve = await ProductsModel.deleteProduct(1);

        expect(resolve).to.be.an('object');
      });
      it('returns an object with the correct insertId', async () => {
        const resolve = await ProductsModel.deleteProduct(1);

        expect(resolve).to.have.property("insertId");
        expect(resolve.insertId).to.be.equal(1)
      })
    });
  });
});
