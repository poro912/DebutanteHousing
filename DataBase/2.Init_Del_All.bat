rem 환경을 삭제하는 스크립트를 통합한 파일
rem 수정 일자 : 2023-06-28

@echo off
set /p MYSQL_PASSWORD=Enter MySQL Password: 

mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_DropDB.sql