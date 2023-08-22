rem 환경을 설정하는 스크립트를 통합한 파일
rem 수정 일자 : 2023-06-28

@echo off

rem 비밀번호 입력
set /p MYSQL_PASSWORD=Enter MySQL Password: 

rem DB 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateDB.sql

rem 테이블 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateTable.sql

rem view 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateView.sql

rem 함수 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_functions.sql

rem 트리거 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_Triggers.sql

rem 필수데이터 삽입
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_Insert_base_data.sql

rem 임시데이터 삽입
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Script_insert_test_data.sql

