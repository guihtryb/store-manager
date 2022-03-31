# Welcome to the Store Manager project!

# Skills

---

## Try yourself

1. Clone the repo

- `git clone git@github.com:guihtryb/store-manager.git`.

- Enter in the repository dir that you just clone:
  - `cd store-manager`

2. Install the dependencies

- `npm install`

3. Copy the StoreManager.sql file and paste it on your MySQL then execute the file

### Conection with the database:

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

