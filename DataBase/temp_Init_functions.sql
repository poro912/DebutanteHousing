-- safe 모드 해제 (다수의 레코드 update 문장)
set sql_safe_updates=0;
-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
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
-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
USE DB_identification;
DROP PROCEDURE IF EXISTS select_seq;
-- DELIMITER $$
CREATE PROCEDURE select_seq (
	IN v_name VARCHAR(255),
	OUT v_code INT
)
BEGIN
	DECLARE v_count INT;

	-- 트랜잭션 시작
	START TRANSACTION;

	-- SEQ 테이블에서 v_name에 해당하는 count 값을 조회하여 v_count에 할당한다.
	SELECT count INTO v_count FROM SEQ WHERE name = v_name;

	-- 조회된 count 값이 있을 경우
	IF v_count IS NOT NULL THEN
		-- SEQ 테이블의 v_name에 해당하는 count 값을 1 증가시킨다.
		UPDATE SEQ SET count = count + 1 WHERE name = v_name;

		-- 증가된 count 값을 반환한다.
		SET v_code = v_count + 1;
	ELSE
		-- 조회된 count 값이 없을 경우 NULL을 반환한다.
		SET v_code = NULL;
	END IF;

	-- 트랜잭션 커밋
	COMMIT;
END $$
DELIMITER ;
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
	DECLARE v_count INT;

	-- 트랜잭션 시작
	START TRANSACTION;

	-- DB_identification에서 comment 테이블의 r_code 튜플이 존재하는지 확인 후 없으면 생성한다.
	INSERT IGNORE INTO comment (r_code) VALUES (r_code);

	-- DB_identification에서 comment 테이블의 r_code 칼럼의 count 값을 획득한다.
	SELECT COUNT(*) INTO v_count FROM comment WHERE r_code = r_code;

	-- comment 테이블의 r_code 칼럼의 count값을 1 증가시킨다.
	UPDATE comment SET count = count + 1 WHERE r_code = r_code;

	-- 얻은 count값 반환
	SET v_code = v_count;

	-- 트랜잭션 커밋
	COMMIT;
END $$
DELIMITER ;

select * from seq;
call select_seq('user');

-- 댓글의 seq 번호를 반환받는다.
USE DB_identification;
DROP PROCEDURE IF EXISTS select_comment_seq;
DELIMITER $$
CREATE PROCEDURE select_comment_seq (
  IN r_code VARCHAR(255),
  OUT v_code INT
)
BEGIN
  DECLARE v_count INT;

  -- 트랜잭션 시작
  START TRANSACTION;

  -- DB_identification에서 comment 테이블의 r_code 튜플이 존재하는지 확인 후 없으면 생성한다.
  INSERT IGNORE INTO comment (r_code) VALUES (r_code);

  -- DB_identification에서 comment 테이블의 r_code 칼럼의 count 값을 획득한다.
  SELECT COUNT(*) INTO v_count FROM comment WHERE r_code = r_code;

  -- comment 테이블의 r_code 칼럼의 count값을 1 증가시킨다.
  UPDATE comment SET count = count + 1 WHERE r_code = r_code;

  -- 얻은 count값 반환
  SET v_code = v_count;

  -- 트랜잭션 커밋
  COMMIT;
END $$
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
DROP PROCEDURE IF EXISTS create_room;
DELIMITER $$
CREATE PROCEDURE create_room (
  IN v_name VARCHAR(255),
  IN v_user_code INT,
  OUT v_room_code INT
)
BEGIN
  DECLARE v_seq INT;

  -- select_seq 함수를 통해 seq 번호를 얻는다.
  SET v_seq = select_seq('room');

  -- 방을 생성한다. (room 테이블에 튜플을 추가한다.)
  INSERT INTO room (code, current_u_code, r_name, count_like) VALUES (v_seq, v_user_code, v_name, 0);

  -- 저장 결과를 반환한다.
  SET v_room_code = v_seq;
 
  -- SELECT v_seq AS result;
END $$
DELIMITER ;
