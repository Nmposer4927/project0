DROP TABLE order_detail;
DROP TABLE orders;
DROP TABLE product;
DROP TABLE customer;

--	Customer Table	-- 
CREATE TABLE customer(
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	phone VARCHAR(12)
);
--test 
INSERT INTO customer (first_name, last_name, email, phone) VALUES
	('Miguel','Zion','mZion@hotmail.com','239-898-9653');


-- 		Product Table	--
CREATE TABLE product(
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	plant_name VARCHAR(100) NOT NULL UNIQUE,
	price NUMERIC(5,2) NOT NULL CHECK (price > 0),
	units_stocked INTEGER NOT NULL
	);
--test 
INSERT INTO product (plant_name, price, units_stocked) VALUES
	('Boston Fern', 9.99, 25);


-- 	Orders Table	--
CREATE TABLE orders(
	customer_id INTEGER REFERENCES customer(id),
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	order_date date NOT NULL,
	pickup_date date NOT NULL
);
--test
INSERT INTO orders (customer_id, order_date, pickup_date) VALUES 
	(1, '2020-05-01', '2020-05-02');


--	Order_Detail Table	--
CREATE TABLE order_detail(
	order_id INTEGER REFERENCES orders(id),
	product_id INTEGER REFERENCES product(id),
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	quantity INTEGER NOT NULL CHECK(quantity > 0)  
);

	
