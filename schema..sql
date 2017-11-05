DROP DATABASE IF EXISTS bamazon;

/* Create database */
CREATE DATABASE bamazon;
USE bamazon;

/* Create new table called products*/
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT(15),
  PRIMARY KEY (item_id)
);


-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cups", "home & kitchen", 3, 230);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("plates", "home & kitchen", 5, 520);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pans", "home & kitchen", 33, 199);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("monitors", "electronics", 160, 389);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tvs", "electronics", 433, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple computers", "electronics", 2000, 255);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirts", "clothes", 8, 675);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothes", 22, 305);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("basketball", "toys", 506, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("video games", "toys", 59, 888);
