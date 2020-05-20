SELECT p.PlantID. p.PlantName, sum(od.quanity * p.Price) AS total
	FROM order_detail AS od
	LEFT JOIN product AS p ON od.product_id = p.id; 