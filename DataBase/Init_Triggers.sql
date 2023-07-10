
# 회원가입 시 발동할 트리거
# 회원가입 성공 시 seq 1 증가, current의 user 생성, default room 생성, wellet 생성
USE db_personal;
DELIMITER $$
	CREATE TRIGGER t_Join
	AFTER INSERT
	ON  FOR EACH ROW
	BEGIN
		declare id
		declare 
        
        
        
	END
DELIMITER ;

# 방 생성 시 발동할 트리거



# 아이템 생성 시 발동할 트리거



# NFT 발급 시 발동할 트리거



# 




/*
DELIMITER $$
	CREATE TRIGGER trigger_name
	{BEFORE | AFTER} {INSERT | UPDATE| DELETE }
	ON table_name FOR EACH ROW
	BEGIN
		-- 트리거 내용
	END
DELIMITER ;
*/