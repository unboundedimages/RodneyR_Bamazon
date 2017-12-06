DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id_item INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (10, 4) NUll,
stock_quantity INTEGER (10) NOT NULL,
PRIMARY KEY (id_item)
);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("coffee cans", 7.50, "foods", 3249);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("coffee mug", 11.50, "houseware", 6546);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("coffee maker", 59.50, "appliances", 816);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("vanilla creamer", 2.50, "foods", 23846);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("hazelnut creamer", 4.50, "foods", 35319);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("coffe filter", 1.99, "kitchen", 3636);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("coffee beans", 39.99, "foods", 2836);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("coffee grinder", 119.99, "appliances",674);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("coffee packs", .99, "foods", 47694);
INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("industrial size cans", 79.99, "bulk",1246);