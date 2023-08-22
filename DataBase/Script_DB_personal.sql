USE DB_personal;

-- desc
desc user;

-- Select
select * from user;

SELECT * FROM user WHERE id = "id1" and pw = "pw1";
-- select * from user where id = "${id}" and pw = "${pw}";


-- insert 
insert into user (code, id, pw, name, email, phone) 
			values(999,"angus99","1234","이무현","angus99@naver.com","01083553460");
insert into user (code, id, pw, name, email, phone) values("${code}","${id}","${pw}","${name}","${eamil}","${phone}");

-- update


-- delete
delete from user where code = 901;


use DB_current;
