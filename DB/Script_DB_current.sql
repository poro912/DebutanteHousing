USE db_current;

#desc
desc user;
desc wallet;
desc room;
desc NFT;
desc ITEM;
desc ROOM_ITEM;
desc friend;

# Select
select * from user;
select * from wallet;
select * from room;
select * from NFT;
select * from ITEM;
select * from ROOM_ITEM;
select * from friend;


select nick FROM user WHERE code = 1;

# insert 
insert into user(code, nick, id) values(999, "poro", "angus99");

# update


# delete
delete from user where code=999;