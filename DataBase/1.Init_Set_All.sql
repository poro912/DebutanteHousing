# 환경을 설정하는 스크립트를 통합한 파일
# 수정 일자 : 2023-06-28

# DB 생성
source Init_CreateDB.sql

# 테이블 생성
source Init_CreateTable.sql

# 함수 생성
source Init_functions.sql

# 트리거 생성
source Triggers.sql

# 필수데이터 삽입
source Init_Insert_base_data.sql

# 임시데이터 삽입
source Script_insert_test_data.sql

