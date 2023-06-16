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
INSERT INTO wallet (u_code, balance) VALUES
(1, 50000),
(2, 200),
(3, 3000),
(4, 44),
(5, 555),
(6, 666),
(7, 777),
(8, 888),
(9, 999),
(10, 1000);

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