USE DB_personal;
INSERT INTO user (code, id, pw, public_key, name, email,phone) VALUES
(1, 'id1', 'pw1', NULL, 'cho', 'blackspoon0@naver.com', NULL),
(2, 'id2', 'pw2', NULL, 'kim', 'blackspoon1@naver.com', NULL),
(3, 'id3', 'pw3', NULL, 'lee', 'blackspoon2@naver.com', NULL),
(4, 'id4', 'pw4', NULL, 'bae', 'blackspoon3@naver.com', NULL),
(5, 'id5', 'pw5', NULL, 'choi', 'blackspoon4@naver.com', NULL),
(6, 'id6', 'pw6', NULL, 'park', 'blackspoon5@naver.com', NULL),
(7, 'id7', 'pw7', NULL, 'ann', 'blackspoon6@naver.com', NULL),
(8, 'id8', 'pw8', NULL, 'jang', 'blackspoon7@naver.com', NULL),
(9, 'id9', 'pw9', NULL, 'jack', 'blackspoon8@naver.com', NULL),
(10, 'id10', 'pw10', NULL, 'ted', 'blackspoon9@naver.com', NULL);

USE DB_current;
INSERT INTO user (code, id, nick, profile_path) VALUES
(1, 'id1', 'nick1', NULL),
(2, 'id2', 'nick2', NULL),
(3, 'id3', 'nick3', NULL),
(4, 'id4', 'nick4', NULL),
(5, 'id5', 'nick5', NULL),
(6, 'id6', 'nick6', NULL),
(7, 'id7', 'nick7', NULL),
(8, 'id8', 'nick8', NULL),
(9, 'id9', 'nick9', NULL),
(10, 'id10', 'nick10', NULL);

USE DB_current;
INSERT INTO wallet (u_code, balance, code) VALUES
(1, 50000, 1),
(2, 200, 2),
(3, 3000, 3),
(4, 44, 4),
(5, 555, 5),
(6, 666, 6),
(7, 777, 7),
(8, 888, 8),
(9, 999, 9),
(10, 1000, 10);

USE DB_current;
INSERT INTO room (code, current_U_code, name, `like`)VALUES 
( 1, 1, 'cho', 100),
( 2, 2, 'kim', 200),
( 3, 3, 'lee', 300),
( 4, 4, 'bae', 400),
( 5, 5, 'choi', 500),
( 6, 6, 'park', 600),
( 7, 7, 'ann', 700),
( 8, 8, 'jang', 800),
( 9, 9, 'jack', 900),
( 10, 10, 'ted', 1000);

-- 함수를 이용한 데이터 삽입
use db_function;
set sql_safe_updates=0;
-- 유저 추가
call user_join('function_test_01','test01','test001','A');
call user_join('function_test_02','test02','test002','B');
call user_join('function_test_03','test03','test003','C');
call user_join('function_test_04','test04','test004','D');
call user_join('function_test_05','test05','test005','E');
call user_join('function_test_06','test06','test006','F');
call user_join('function_test_07','test07','test007','G');
call user_join('function_test_08','test08','test008','H');
call user_join('function_test_09','test09','test009','I');
call user_join('function_test_10','test10','test010','J');

SET @tmp = NULL;
-- 방 추가
call create_room('second room', 101, @tmp);
call create_room('second room', 102, @tmp);
call create_room('second room', 103, @tmp);


-- NFT 등록
use db_current;
INSERT INTO NFT (code, u_code, name)VALUES 
(1, 1, '원목 책상'),
(2, 1, '원목 의자'),
(3, 1, '원목 옷장'),
(4, 1, '촛대'),
(5, 1, '현대식 초록 의자'),
(6, 1, '현대식 회색 의자'),
(7, 1, '현대식 파란색 의자'),
(8, 1, '현대식 초록 옷장'),
(9, 1, '현대식 회색 옷장'),
(10, 1, '현대식 파란색 옷장');

-- 아이템 등록
-- user, nft, count
use db_function;
call supply_item(1, 1, 5);
call supply_item(1, 1, 1);
call supply_item(1, 2, 1);
call supply_item(1, 3, 1);
call supply_item(1, 4, 1);

-- 아이템 배치
use db_current
insert room_item (r_code, i_code, position, rotate) values
(1,106,120206,1),
(1,107,010206,0),
(1,108,051004,1),
(1,109,160201,0);



-- select * from db_current.room;
-- select * from db_current.item;
-- select * from db_current.room_item;