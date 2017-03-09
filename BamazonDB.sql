CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (

item_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(32) NOT NULL,
department_name VARCHAR(32),
price DECIMAL(5,2), 
stock_quantity INTEGER(20)
);

select * from products;

insert into products(product_name,department_name,price,stock_quantity) values(
"Paper Towels","Health & Personal Care",28,20);
insert into products(product_name,department_name,price,stock_quantity) values(
"Body Wash ","Beauty & Personal Care ",5,100);
insert into products(product_name,department_name,price,stock_quantity) values(
"Fitbit","Sports & Fitness",235,50);
insert into products(product_name,department_name,price,stock_quantity) values(
"Tide Laundry Detergent","Household",18,150);
insert into products(product_name,department_name,price,stock_quantity) values(
"Yoga Mat","Sports & Outdoors",25,200);
insert into products(product_name,department_name,price,stock_quantity) values(
"Chocolates Assortment","Grocery",10,80);
insert into products(product_name,department_name,price,stock_quantity) values(
"Wireless Speaker ","Cell Phones & Accessories",30,90);
insert into products(product_name,department_name,price,stock_quantity) values(
"FIFA","Video Games",35,50);
insert into products(product_name,department_name,price,stock_quantity) values(
"Bowl Sets","Kitchen & Dining",30,150);
insert into products(product_name,department_name,price,stock_quantity) values(
"Green Tea","Grocery",20,80);

CREATE TABLE departments (

department_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(32) NOT NULL,
over_head_costs DECIMAL(5,2), 
total_sales INTEGER(20)
);

delete from products;
