-- safe 모드 해제 (다수의 레코드 update 문장)
set sql_safe_updates=0;
use db_function;
-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

DROP PROCEDURE IF EXISTS test;
DELIMITER $$ 
CREATE PROCEDURE test()
BEGIN
	-- hello
	select * from user;
END $$
DELIMITER ;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- seq 1증가
-- 함수를 호출하면 seq 테이블에서 name에 해당하는 객체를 찾아서 숫자 반환 후 1증가
DROP PROCEDURE IF EXISTS select_seq;
DELIMITER $$
CREATE PROCEDURE select_seq (
  
	IN v_name VARCHAR(255),
  IN v_number INT,
	OUT v_code INT
)
BEGIN
	DECLARE v_count INT ;

	-- 트랜잭션 시작
	START TRANSACTION;

	-- SEQ 테이블에서 v_name에 해당하는 count 값을 조회하여 v_count에 할당한다.
	SELECT count INTO v_count FROM db_identification.seq WHERE name = v_name;

	-- 조회된 count 값이 있을 경우
	IF v_count IS NOT NULL THEN
		-- SEQ 테이블의 v_name에 해당하는 count 값을 v_number 증가시킨다.
		UPDATE db_identification.seq SET count = count + v_number WHERE name = v_name;

		-- 증가된 count 값을 반환한다.
		SET v_code = v_count + v_number;
	ELSE
		-- 조회된 count 값이 없을 경우 NULL을 반환한다.
		SET v_code = NULL;
	END IF;

	-- 트랜잭션 커밋
	COMMIT;
END $$
DELIMITER ;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 댓글의 seq 번호를 반환받는다.
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

  -- db_identification에서 comment 테이블의 r_code 튜플이 존재하는지 확인 후 없으면 생성한다.
  INSERT IGNORE INTO comment (r_code) VALUES (r_code);

  -- db_identification에서 comment 테이블의 r_code 칼럼의 count 값을 획득한다.
  SELECT COUNT(*) INTO v_count FROM comment WHERE r_code = r_code;

  -- comment 테이블의 r_code 칼럼의 count값을 1 증가시킨다.
  UPDATE comment SET count = count + 1 WHERE r_code = r_code;

  -- 얻은 count값 반환
  SET v_code = v_count;

  -- 트랜잭션 커밋
  COMMIT;
END $$
DELIMITER ;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 방 생성
DROP PROCEDURE IF EXISTS create_room;
DELIMITER $$
CREATE PROCEDURE create_room (
  IN v_name VARCHAR(255),
  IN v_user_code INT,
  OUT v_room_code INT
)
BEGIN
  DECLARE v_room_seq INT;

  -- select_seq 함수를 통해 seq 번호를 얻는다.
  call select_seq('room', 1, v_room_seq);

  -- 방을 생성한다. (room 테이블에 튜플을 추가한다.)
  INSERT INTO db_current.room (code, current_u_code, name, `like`) VALUES (v_room_seq, v_user_code, v_name, 0);

  -- 저장 결과를 반환한다.
  SET v_room_code = v_room_seq;
 
  -- SELECT v_seq AS result;
END $$
DELIMITER ;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 지갑 등록
DROP PROCEDURE IF EXISTS create_wallet;
DELIMITER $$
CREATE PROCEDURE create_wallet (
  IN v_u_code INT,
  IN v_w_code INT 
)
BEGIN
  
  -- db_personal의 user 테이블에 유저가 입력한 정보를 등록한다.
  INSERT INTO db_current.wallet (u_code, balance, code) VALUES (v_u_code, 100, v_w_code);

END $$
DELIMITER ;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 회원가입
DROP PROCEDURE IF EXISTS user_join;
set sql_safe_updates=0;
DELIMITER $$
CREATE PROCEDURE user_join (
  IN v_id VARCHAR(255),
  IN v_pw VARCHAR(255),
  IN v_name VARCHAR(255),
  IN v_nick VARCHAR(255)
)
BEGIN
  DECLARE v_user_seq INT;
  DECLARE v_room_seq INT;
  
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    SET v_user_seq = -1;
    ROLLBACK;
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'An error occurred during user_join procedure';
  END;
  
  -- 선언된 변수들 초기화
  SET v_user_seq = 0;
  SET v_room_seq = 0;

  -- 트랜잭션 시작
  START TRANSACTION;
  
  -- select_seq 함수를 통해 seq 번호를 얻는다.
  call select_seq('user', 1, v_user_seq);
  
  -- db_personal의 user 테이블에 유저가 입력한 정보를 등록한다.
  INSERT INTO db_personal.user (code, id, pw, name) VALUES (v_user_seq, v_id, v_pw, v_name);

  -- db_current의 다음 테이블들에 튜플을 생성한다.
  -- user 테이블
  INSERT INTO db_current.user (code, id, nick) VALUES (v_user_seq, v_id, v_nick);

  -- ! 추후 삭제 예정
  -- wallet 테이블
  CALL create_wallet(v_user_seq, v_user_seq);

  -- room 테이블 (create_room 함수를 이용해 생성한다.)
  CALL create_room(CONCAT(v_nick,"'s room"), v_user_seq, v_room_seq);

  -- 모든 작업이 정상적으로 완료되었을 때만 커밋
  COMMIT;
END $$
DELIMITER ;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 댓글 등록
DROP PROCEDURE IF EXISTS regist_comment;
DELIMITER $$
CREATE PROCEDURE regist_comment (
  IN v_r_code VARCHAR(255),
  IN v_comment_text VARCHAR(255),
  OUT v_result INT
)
BEGIN
  DECLARE v_seq INT;

  -- select_comment_seq 함수를 통해 seq 번호를 얻는다.
  SET v_seq = select_comment_seq(v_r_code);

  -- db_record에서 comment 테이블에 값을 저장한다.
  INSERT INTO db_record.comment (comment_id, r_code, comment_text) VALUES (v_seq, v_r_code, v_comment_text);

  -- 저장 결과를 반환한다.
  SET v_result = v_seq;
END $$
DELIMITER ;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- NFT 등록

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 아이템 생성
DROP PROCEDURE IF EXISTS supply_item;
set sql_safe_updates=0;
DELIMITER $$
CREATE PROCEDURE supply_item (
  IN v_u_code INT,
  IN v_n_code INT,
  IN v_count INT
)
BEGIN
  DECLARE v_item_seq INT;
  DECLARE i INT;
  
  -- 만약 v_count가 0이하 또는 99초과라면 오류 처리
  IF v_count <= 0 OR v_count > 99 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid count value';
  END IF;

  -- 트랜잭션 시작
  START TRANSACTION;

  -- select_seq 함수를 통해 seq 번호를 얻는다.
  CALL select_seq('item', v_count, v_item_seq);

  -- 만약 v_item_seq가 null 이라면 오류 처리
  IF v_item_seq IS NULL THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Failed to obtain sequence number';
  END IF;

  -- db_current.item 테이블에 v_count 개수 만큼 item을 생성한다.
  SET i = 0;
  WHILE i < v_count DO
    INSERT INTO db_current.item (code, current_u_code, n_code) VALUES (v_item_seq - i, v_u_code, v_n_code);
    SET i = i + 1;
  END WHILE;

  -- 모든 작업이 정상적으로 완료되었을 때만 커밋
  COMMIT;
END $$
DELIMITER ;


-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 아이템 생성
  
DROP PROCEDURE IF EXISTS create_item;
set sql_safe_updates=0;
DELIMITER $$
CREATE PROCEDURE create_item (
  IN v_r_code INT,
  IN v_i_url VARCHAR(80),
  IN v_name VARCHAR(50)
)
BEGIN
  DECLARE v_item_seq INT;

  -- 트랜잭션 시작
  START TRANSACTION;

  -- select_seq 함수를 통해 seq 번호를 얻는다.
  CALL select_seq('item', 1, v_item_seq);

  -- 만약 v_item_seq가 null 이라면 오류 처리
  IF v_item_seq IS NULL THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Failed to obtain sequence number';
  END IF;

  -- db_current.item 테이블에 v_count 개수 만큼 item을 생성한다.
  INSERT INTO db_current.new_room_item (r_code, code, i_url, name) VALUES (v_r_code, v_item_seq, v_i_url, v_name);

  -- 모든 작업이 정상적으로 완료되었을 때만 커밋
  COMMIT;
END $$
DELIMITER ;
-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- 아이템 배치



-- TestCode Area

-- call test();

-- select * from db_identification.seq;
-- SET @seq = NULL;  -- 변수 초기화 (필요한 경우)
-- CALL select_seq('user', 1, @seq);
-- SELECT @seq;
-- CALL select_seq('nft', 1, @seq);
-- CALL select_seq('room', 1, @seq);
-- CALL select_seq('item', 3, @seq);

-- call user_join('test10','test','testjoin','testjoin');
-- select * from db_personal.user;
-- select * from db_current.room;
-- select * from db_current.item;
-- call supply_item(1,1,2);