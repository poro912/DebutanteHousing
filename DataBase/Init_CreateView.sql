use db_views
-- 상점 거래가능 아이템 목록
-- CREATE VIEW sales_view AS
-- SELECT name, position
-- FROM employees
-- WHERE department = 'Sales';

-- user room 결합 목록
CREATE VIEW room_view AS
SELECT 
    u.code AS user_code,
    u.id AS user_id,
    u.nick AS user_nick,
	r.code AS room_code,
    r.name AS room_name,
    r.like AS room_like
FROM db_current.user AS u
INNER JOIN db_current.room AS r 
ON u.code = r.current_u_code;

-- select * from room_view;

/*
CREATE VIEW my_view AS
SELECT customers.customer_id, customers.customer_name, orders.order_date
FROM customers
INNER JOIN orders ON customers.customer_id = orders.customer_id;
*/
