-- 슈퍼 계정 생성
CREATE USER 'superuser'@'localhost' IDENTIFIED BY 'password';

-- 모든 권한 부여 
GRANT ALL PRIVILEGES ON *.* TO 'superuser'@'localhost' WITH GRANT OPTION;


-- 웹 유저 생성
CREATE USER 'webuser'@'%' IDENTIFIED BY 'A12345678!';

-- 모든 주소에서 접근 허용
GRANT ALL PRIVILEGES ON *.* TO 'webuser'@'%';

-- CRUD 권한 부여
REVOKE ALL PRIVILEGES ON *.* FROM 'webuser'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'webuser'@'%';

-- 프로시저 실행 권한 부여
GRANT EXECUTE ON PROCEDURE your_procedure_name TO 'webuser'@'%';


-- 변경사항 적용
FLUSH PRIVILEGES;