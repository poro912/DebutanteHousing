rem 환경을 설정하는 스크립트를 통합한 파일
rem 수정 일자 : 2023-06-28

@echo off

rem 파라메터가 없다면 입력을 받음
if "%~1"=="" (
	rem 비밀번호 입력
	set /p MYSQL_PASSWORD=Enter MySQL Password: 
) else (
	set MYSQL_PASSWORD=%~1
)

echo DB 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateDB.sql

echo 테이블 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateTable.sql

echo view 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_CreateView.sql

echo 함수 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_Functions.sql

echo 트리거 생성
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_Triggers.sql

echo 필수데이터 삽입
mysql -h localhost -u root -p%MYSQL_PASSWORD% < Init_InsertBaseData.sql

echo 임시데이터 삽입
rem mysql -h localhost -u root -p%MYSQL_PASSWORD% < Script_InsertTestData.sql

