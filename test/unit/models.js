const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../models/ProductsModel');
const SalesModel = require('../../models/SalesModel');
const connection = require('../../models/connection');

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

const buyProducts = [
  {
    name: products[2].name,
    quantity: 25,
  },
  {
    name: products[3].name,
    quantity: 25,
  }
];

const getAllSalesResponse = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "product_id": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "product_id": 2,
    "quantity": 2
  }
];

const getSaleByIdResponse = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "product_id": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "product_id": 2,
    "quantity": 2
  }
];

const productUpdated = {
 id: 4,
 name: "ProductF",
 quantity: 200, 
};

describe('Products Model >', () => {
  describe('1. Insert a new product on the database', () => {
    describe('When it`s successfully inserted', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('returns an object', async () => {
        const response = await ProductsModel.createProduct("productA", 100);
        
        expect(response).to.be.an('object');
      });

      it('returns an object with the correct insertId', async () => {
        const responseObject = await ProductsModel.createProduct("productB", 100);

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
      });
    });
  });
  describe('5. Product quantity is updated when sale is modified', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{insertId: 1}])
    });
    after(async () => {
      connection.execute.restore();
    });

    it('return an object', async () => {
      const resolve = await ProductsModel.updateProductQuantity('ProductA', 100);

      expect(resolve).to.be.an('object');
    });
    
    it('returns the insertId expected', async () => {
      const resolve = await ProductsModel.updateProductQuantity('ProductA', 100);
      
      expect(resolve.insertId).to.be.equal(1);
    })
  });
});

describe('Sales Model >', () => {
  describe('1. Insert a new sale on the database', () => {
    describe('When it`s successfully inserted', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('returns a number', async () => {
        const response = await SalesModel.createSale(buyProducts);
        
        expect(response).to.be.a('number');
      });
    });
  });
  describe('2. Request all sales from the database', () => {
    describe('When it`s successfully requested', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([getAllSalesResponse]);
      });
      after(async () => {
        connection.execute.restore();
      });
      
      it('returns an array', async () => {
        const response = await SalesModel.getAllSales();
        expect(response).to.be.an('array');
      });

      it('returns an array with all the sales', async () => {
        const responseArray = await SalesModel.getAllSales();
        expect(responseArray).to.have.length(2);
      });

          it('the products have the fields "id", "name" and "quantity"', async () => {
        const [firstProduct] = await SalesModel.getAllSales();
        const productFields = ['saleId', 'date', 'product_id', 'quantity'];
        
        for (let field of productFields) {
          expect(firstProduct).to.have.property(field);
        }
      });
    });
  });
  describe('3. Update a sale from the database', () => {
    describe('When it`s successfully updated', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('returns an object', async () => {
        const response = await SalesModel
          .updateSale(200, 2, 1);
        
          expect(response).to.be.an('object');
      });

      it('returns an object with the correct insertId', async () => {
        const responseObject = await SalesModel
          .updateSale(200, 2, 1);

        expect(responseObject).to.have.property("insertId");
        expect(responseObject.insertId).to.be.equal(1);
      });
    });
  });
  describe('4. Deletes a sale from database', () => {
    describe('when it`s successfully deleted', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('returns an object', async () => {
        const resolve = await SalesModel.deleteSale(1);

        expect(resolve).to.be.an('object');
      });
      it('returns an object with the correct insertId', async () => {
        const resolve = await SalesModel.deleteSale(1);

        expect(resolve).to.have.property("insertId");
        expect(resolve.insertId).to.be.equal(1)
      });
    });
  });
  describe('5. Request a sale by it`s id ', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([getSaleByIdResponse])
    });
    after(async () => {
      connection.execute.restore();
    });

    it('return an array', async () => {
      const resolve = await SalesModel.getSaleById(1);

      expect(resolve).to.be.an('array');
    });
    
    it('returns an array with all the products on the sale', async () => {
      const resolve = await SalesModel.getSaleById(1);
      
      expect(resolve.length).to.be.equal(2);
    });
  });
});
