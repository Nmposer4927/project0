SELECT p.id, p.plant_name, sum(o.quantity * p.price) AS total
	FROM order_detail AS o
	LEFT JOIN product AS p ON o.product_id = p.id
	GROUP BY p.id
	ORDER BY p.id ASC; 
	
SELECT p.id, p.plant_name, sum(p.units_stocked - o.quantity) AS units_after_orders 
	FROM order_detail AS o
	RIGHT JOIN product AS p ON o.product_id = p.id 
	GROUP BY p.id 
	ORDER BY p.id ASC;
	

