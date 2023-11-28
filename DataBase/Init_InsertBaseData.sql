-- DB_identification에 seq를 초기화한다.
/*
data	name
0	user
1	room
2	nft
3	item
4	transaction
*/

USE db_identification;

insert into seq values( 0, "user", 100);
insert into seq values( 1, "room", 100);
insert into seq values( 2, "nft", 100);
insert into seq values( 3, "item", 100);
insert into seq values( 4, "transaction", 100);

insert into db_current.user value(1, "guest1", "guest", NULL);