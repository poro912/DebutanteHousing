rem 최초에 mysql 설정을 위한 파일
rem 수정 일자 : 2023-06-28

@echo off

rem 비밀번호 입력
set /p MYSQL_PASSWORD=Enter MySQL Password: 

echo mysql 설치 이후 최초 1회만 실행해야 함

echo 유저권한 id 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_Create_GrentPermission.sql

call .\1.Init_Set_All.bat %MYSQL_PASSWORD
