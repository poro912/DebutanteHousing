use db_current;
DELIMITER $$ 
DROP PROCEDURE IF EXISTS test;
CREATE PROCEDURE test()
BEGIN
	-- hello
	select * from user;
END $$
DELIMITER ;

call test();

USE DB_identification;
DROP PROCEDURE IF EXISTS select_seq;
-- DELIMITER $$
CREATE PROCEDURE select_seq (
	IN v_name VARCHAR(255),
	OUT v_code INT
)
BEGIN
	DECLARE v_count INT;
    SET v_count = 0;
	-- SELECT count INTO v_count FROM SEQ WHERE name = v_name;
END;
-- DELIMITER ;


-- 함수를 호출하면 seq 테이블에서 name에 해당하는 객체를 찾아서 숫자 반환 후 1증가
USE DB_identification;
DELIMITER $$
DROP PROCEDURE IF EXISTS select_seq;
CREATE PROCEDURE select_seq (
	IN v_name VARCHAR(255),
	OUT v_code INT
)
DECLARE
	v_count INT
BEGIN
	-- 트랜잭션 시작
	START TRANSACTION;

	-- SEQ 테이블에서 v_name에 해당하는 count 값을 조회하여 v_count에 할당한다.
	SELECT count INTO v_count FROM SEQ WHERE name = v_name
	
	-- 조회된 count 값이 있을 경우
	IF v_count IS NOT NULL THEN
		-- SEQ 테이블의 v_name에 해당하는 count 값을 1 증가시킨다.
		UPDATE SEQ SET count = count + 1 WHERE name = v_name

		-- 증가된 count 값을 반환한다.
		SET v_code = v_count + 1
	ELSE
		-- 조회된 count 값이 없을 경우 NULL을 반환한다.
		SET v_code = NULL
	END IF

	-- 트랜잭션 커밋
	COMMIT;
END;
DELIMITER ;

select * from seq;
call select_seq('user');


-- 댓글의 seq 번호를 반환받는다.
DELIMITER $$ 
use DB_identification;
DROP PROCEDURE IF EXISTS select_comment_seq $$
CREATE PROCEDURE select_seq (
	r_code VARCHAR(255)
)
BEGIN
	DECLARE
		v_code INT;
		v_data VARCHAR;
	BEGIN
	-- 트랜젝션 시작
	START TRANSACTION;

	DB_identification 에서 comment 테이블의 r_code 튜플이 존재하는지 확인 후 없으면 생성한다.

	-- DB_identification 에서 comment 테이블의 r_code 칼럼의 count 값을 획득한다.
	--select
	--from
	--where

	-- comment 테이블의 r_code 칼럼의 count값을 1 증가시킨다.
	--UPDATE SEQ
	--SET count = count + 1
	--WHERE name = v_name;

	-- 얻은 count값 반환
		IF v_id IS NOT NULL THEN
			RETURN v_code;
		ELSE
			RETURN NULL;
		END IF;

	END;
DELIMITER ;


-- 회원 가입
DELIMITER $$ 
DROP PROCEDURE IF EXISTS join $$
CREATE PROCEDURE select_seq (
	v_name VARCHAR(255)
)
BEGIN
	DECLARE

	BEGIN
	-- select_seq('user') 함수를 통해 seq 번호를 얻는다.

	-- DB_personal의 room 테이블에 유저가 입력한 정보를 등록한다.

	-- DB_current의 다음 테이블들에 튜플을 생성한다.
	-- user 테이블

	-- wallet 테이블

	-- room 테이블
	-- create_room 함수를 이용해 생성한다.
	
	END;
DELIMITER ;


-- 댓글 등록
DELIMITER $$ 
DROP PROCEDURE IF EXISTS join $$
CREATE PROCEDURE select_seq (
	v_name VARCHAR(255)
)
BEGIN
	DECLARE

	BEGIN
	-- select_comment_seq(v_r_code) 함수를 통해 seq 번호를 얻는다.
	-- DB_record 에서 comment 테이블에 값을 저장한다.

	-- 저장 결과를 반환한다.
	
	END;
DELIMITER ;


-- 방 생성
DELIMITER $$ 
DROP PROCEDURE IF EXISTS create_room $$
CREATE PROCEDURE select_seq (
	v_name VARCHAR(255)
)
BEGIN
	DECLARE

	BEGIN
	-- select_seq('room') 함수를 통해 seq 번호를 얻는다.
	
	-- 방을 생성한다.

	-- 저장 결과를 반환한다.
	
	END;
DELIMITER ;