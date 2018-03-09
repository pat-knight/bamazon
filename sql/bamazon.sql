drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
  item_id int not null auto_increment,
  product_name varchar(255) not null,
  department_name varchar(255) not null,
  price decimal(10,2),
  stock_quantity int(10) not null,
  PRIMARY KEY (item_id)
);
