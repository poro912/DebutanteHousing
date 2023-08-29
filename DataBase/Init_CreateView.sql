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
CREATE VIEW combined_view AS
SELECT 
    u.code AS user_code,
    u.id AS user_id,
    u.nick AS user_nick,
    r.code AS room_code,
    r.name AS room_name,
    r.like AS room_like,
    w.code AS wellet_code
FROM db_current.user AS u
INNER JOIN db_current.room AS r ON u.code = r.current_u_code
INNER JOIN db_current.wallet AS w ON u.code = w.U_code;
*/