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
DELIMITER $$
CREATE PROCEDURE select_seq (
	IN v_name VARCHAR(255),
	OUT v_code INT
)
BEGIN
	DECLARE v_count INT;

	SELECT count INTO v_code FROM SEQ WHERE name = v_name;

END $$
DELIMITER ;


-- 함수를 호출하면 seq 테이블에서 name에 해당하는 객체를 찾아서 숫자 반환 후 1증가
USE DB_identification;
DROP PROCEDURE IF EXISTS select_seq;
DELIMITER $$
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

-- select * from seq;
-- SET @seq = NULL;  -- 변수 초기화 (필요한 경우)
-- CALL select_seq('user', @seq);
-- SELECT @seq;
-- CALL select_seq('nft', @seq);
-- CALL select_seq('room', @seq);
-- CALL select_seq('item', @seq);

-- 댓글의 seq 번호를 반환받는다.
USE DB_identification;
DROP PROCEDURE IF EXISTS select_comment_seq;
DELIMITER $$
DROP PROCEDURE IF EXISTS select_comment_seq $$
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

-- 방 생성
DROP PROCEDURE IF EXISTS create_room;
DELIMITER $$
CREATE PROCEDURE create_room (
  IN v_name VARCHAR(255),
  IN v_user_code INT
)
BEGIN
  DECLARE v_seq INT;

  -- select_seq 함수를 통해 seq 번호를 얻는다.
  SET v_seq = select_seq('room');

  -- 방을 생성한다. (room 테이블에 튜플을 추가한다.)
  INSERT INTO room (code, current_u_code, r_name, count_like) VALUES (v_seq, v_user_code, v_name, 0);

  -- 저장 결과를 반환한다.
  -- SELECT v_seq AS result;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS user_join;
DELIMITER $$
CREATE PROCEDURE user_join (
  IN v_id VARCHAR(255),
  IN v_pw VARCHAR(255),
  IN v_name VARCHAR(255),
  IN v_nick VARCHAR(255)
)
BEGIN
  DECLARE v_user_seq INT;
  
  -- select_seq 함수를 통해 seq 번호를 얻는다.
  SET v_user_seq = select_seq('user');
  
  -- DB_personal의 user 테이블에 유저가 입력한 정보를 등록한다.
  INSERT INTO DB_personal.user (code, id, pw, 'name') VALUES (v_user_seq, v_id, v_pw, v_name);

  -- DB_current의 다음 테이블들에 튜플을 생성한다.
  -- user 테이블
  INSERT INTO DB_current.user (code, id, nick) VALUES (v_user_seq, v_id, v_nick);

  -- wallet 테이블
  INSERT INTO DB_current.wallet (U_code, balance) VALUES (v_user_seq, 0);

  -- room 테이블 (create_room 함수를 이용해 생성한다.)
  CALL create_room(v_nick, v_user_seq);
END &&
DELIMITER ;


-- 댓글 등록
DROP PROCEDURE IF EXISTS comment_register;
DELIMITER $$
CREATE PROCEDURE comment_register (
  IN v_r_code VARCHAR(255),
  IN v_comment_text VARCHAR(255),
  OUT v_result INT
)
BEGIN
  DECLARE v_seq INT;

  -- select_comment_seq 함수를 통해 seq 번호를 얻는다.
  SET v_seq = select_comment_seq(v_r_code);

  -- DB_record에서 comment 테이블에 값을 저장한다.
  INSERT INTO DB_record.comment (comment_id, r_code, comment_text) VALUES (v_seq, v_r_code, v_comment_text);

  -- 저장 결과를 반환한다.
  SET v_result = v_seq;
END $$
DELIMITER ;
