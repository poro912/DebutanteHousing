rem 환경을 재설치하는 스크립트
rem 수정 일자 : 2023-06-28

@echo off
set /p MYSQL_PASSWORD=Enter MySQL Password: 


rem DB 삭제
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_DropDB.sql

rem DB 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateDB.sql

rem 테이블 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateTable.sql

rem view 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateView.sql

rem 함수 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_Functions.sql

rem 트리거 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_Triggers.sql

rem 필수데이터 삽입
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_InsertBaseData.sql

rem 임시데이터 삽입
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Script_InsertTestData.sql
