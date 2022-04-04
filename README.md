<h1 align="center"> Welcome to the Store Manager project! </h1>
  
  This project is a REST API for the management of a store, where is possible create, visualize, delete and update products and sales;

# Skills

- Model-Service-Controller architecture;
- Apply REST API patterns
- Write signatures for intuitive and easily understandable APIs.
- Connect application with different databases;
- Node.js;
- MySQL;
- Ensuring code maintenance and reuse;
- Unit tests to all layers;

---

## Try yourself

1. Clone the repo

- `git clone git@github.com:guihtryb/store-manager.git`.

- Enter in the repository dir that you just clone:
  - `cd store-manager`

2. Install the dependencies

- `npm install`

3. Copy the StoreManager.sql file content, paste it on your MySQL Workbench then execute the file;

### Connection with the database:

```javascript
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
```
Create a .env with the following infos:
```
MYSQL_HOST=localhost
MYSQL_USER=yourMySqlUsername
MYSQL_PASSWORD=yourMySqlPassword
PORT=3000
```
### Tables


The database has three tables: `products`, `sales` and `sales_products`.

The `products` table has the following format:

![Products Table](./public/tableproducts.png)

The `sales` table has the following format:

![Sales Table](./public/tablesales.png)

The`sales_products` table, is the one which makes the `N:N` relation between `products` and `sales`, and has the following format:

![Sales-Products Table](./public/tablesalesproducts.png)


### To insert a new product

- The POST /products endpoint must receive the following structure:

```json
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

### To get all products

- Use the GET method at the /products endpoint
- The API will answer with the `200` http status code and a body in the following structure:

```json
    [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]
  ```

### To get a product by it's id

- Use the GET method at the /products/:id endpoint, passing the id number of the product registered;
- The API will answer with the `200` http status code and a body in the following structure:

```json
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
  ```


### To update a product

- Use the PUT method at the /product/:id endpoint with the following structure:

```json

{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

### To delete a product

- Use the DELETE method at the /products/:id endpoint and the product will be deleted

### To register a sale -> The products quantity will be updated

- The sales will be saved in the `sales` and `sales_products` tables;
- It's possible to register the sale of many products in only one requisition;
- The POST method at the `/sales` endpoint must receive the following structure:

```json
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

### To list all sales

- To get all sales you can use the GET `/sales` endpoint, and the API will answer with a 200 http status code and a body in the following structure:

```json
    [
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
    ]
  ```
  
### To get a sale by it's id

- To get a sale by it's id you can use the GET /sales/:id endpoint, and the API will return a body in the following structure:

    ```json
      [
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
      ]
    ```

### To update a sale

- You can update a sale using the PUT `sales/:id` endpoint;
- The body requisition must receive the following structure:

```json
[
  {
    "product_id": "id_change",
    "quantity": "new_quantity"
  }
]
```

### To delete a sale

- You can delete a sale using the DELETE `/sales/:id` endpoint;



