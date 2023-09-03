use db_views;
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
    u.profile_path AS user_profile,
	r.code AS room_code,
    r.name AS room_name,
    r.like AS room_like
FROM db_current.user AS u
INNER JOIN db_current.room AS r ON u.code = r.current_u_code;

CREATE VIEW room_item_nft_view AS
SELECT 
    r_i.r_code AS room_code,
    i.code AS item_code,
    n.code AS NFT_code,
    n.name AS item_name,
    n.path AS item_path,
    r_i.position AS position,
    r_i.rotate AS rotate
FROM db_current.item AS i
INNER JOIN db_current.nft AS n ON n.code = i.n_code
INNER JOIN db_current.room_item AS r_i ON r_i.i_code = i.code;


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

-- select user_nick, room_name from room_view where room_code = 1;
-- select item_code, nft_code, item_name, item_path, position, rotate from room_item_nft_view where room_code = 1;


