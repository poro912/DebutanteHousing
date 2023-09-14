-- create tables
-- Run "DeleteTables.sql" and use it.

-- create db
/*
CREATE database db_identification;
CREATE database db_personal;
CREATE database db_current;
CREATE database db_transaction;
CREATE database db_record;
*/

-- setup db_identification
-- save sequence numbers for identification
USE db_identification;
CREATE TABLE `SEQ` (
  `data`		INT				NOT NULL,
  `name`		VARCHAR(11)		NOT NULL,
  `count`		BIGINT			NOT NULL,
  
  PRIMARY KEY (`data`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment` (
  `R_code`		INT				NOT NULL,
  `count`		BIGINT			NOT NULL,
  
  PRIMARY KEY (`R_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- setup db_personal
-- save personal information
USE db_personal;
CREATE TABLE user (
  code			INT				NOT NULL	UNIQUE,
  id			VARCHAR(20)		NOT NULL	UNIQUE,
  pw			VARCHAR(100)	NOT NULL,
  public_key	VARCHAR(100)	,
  name			VARCHAR(20)		NOT NULL,
  email			VARCHAR(50)		,
  phone			VARCHAR(15)		,
  
  PRIMARY KEY (code)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
-- setup db_current
-- save current usage information
USE db_current;
CREATE TABLE user (
  code			INT				NOT NULL AUTO_INCREMENT,
  id			VARCHAR(20)		NOT NULL,
  nick			VARCHAR(20)		NOT NULL,
  profile_path	VARCHAR(50),
  
  PRIMARY KEY (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE wallet (
  u_code		INT				NOT NULL,
  balance		BIGINT			NOT NULL DEFAULT 0,
  code			INT				NOT NULL,
  PRIMARY KEY (u_code),
  FOREIGN KEY (u_code)			REFERENCES user (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE new_wallet (
  u_code		INT				NOT NULL,
  account		VARCHAR(30)		NOT NULL UNIQUE,
  private_key	VARCHAR(30),

  PRIMARY KEY (u_code),
  FOREIGN KEY (u_code)			REFERENCES user (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE room (
  code			INT				NOT NULL ,
  current_u_code	INT			NOT NULL,
  name			VARCHAR(50)		NOT NULL,
  `like`		INT				NOT NULL DEFAULT 0,
  
  PRIMARY KEY (code),
  FOREIGN KEY (current_u_code)	REFERENCES DB_current.user (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE NFT (
  code			BIGINT			NOT NULL,
  u_code		VARCHAR(20)		NOT NULL,
  name			VARCHAR(20)		NOT NULL,
  copy_count	INT				NOT NULL DEFAULT 0,
  path			VARCHAR(50),
  sha			VARCHAR(64),
  
  PRIMARY KEY (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ITEM (
  code			BIGINT			NOT NULL,
  n_code		BIGINT			NOT NULL,
  current_u_code	INT			NOT NULL,
  
  PRIMARY KEY (code),
  FOREIGN KEY (n_code)			REFERENCES NFT(code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ROOM_ITEM (
  r_code		INT				NOT NULL,
  i_code		BIGINT			NOT NULL,
  position		INT				NOT NULL DEFAULT 0,
  rotate		SMALLINT		NOT NULL DEFAULT 0,
  
  PRIMARY KEY (r_code, i_code),
  FOREIGN KEY (r_code)			REFERENCES room(code),
  FOREIGN KEY (i_code)			REFERENCES item(code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE NEW_ROOM_ITEM (
  r_code		INT				NOT NULL,
  i_code		VARCHAR(30)		NOT NULL,
  position		INT				NOT NULL DEFAULT 0,
  rotate		SMALLINT		NOT NULL DEFAULT 0,
  
  PRIMARY KEY (r_code, i_code),
  FOREIGN KEY (r_code)			REFERENCES room(code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE friend (
  follower		INT				NOT NULL,
  target		INT				NOT NULL,
  block			BOOL			NOT NULL,
  mute			BOOL			NOT NULL,
  
  PRIMARY KEY (follower, target),
  FOREIGN KEY (follower)		REFERENCES user(code),
  FOREIGN KEY (target)			REFERENCES user(code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

-- setup db_transaction
-- save transaction information
USE db_transaction;
CREATE TABLE `transaction` (
  code			BIGINT			NOT NULL	UNIQUE,
  U_seller		INT				NOT NULL,
  U_buyer		INT				NOT NULL,
  I_code		BIGINT			NOT NULL,
  cost			BIGINT			NOT NULL,
  complete_time DATETIME		NOT NULL,
  
  PRIMARY KEY (`code`),
  FOREIGN KEY (U_seller)		REFERENCES DB_current.user (code),
  FOREIGN KEY (U_buyer)			REFERENCES DB_current.user (code),
  FOREIGN KEY (I_code)			REFERENCES DB_current.item (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- setup db_record
-- save history about error, login, comment, etc
USE db_record;
CREATE TABLE `JOIN` (
  `U_code`		INT				NOT NULL,
  `datetime`	DATETIME		NOT NULL,
  `withdraw`	BOOL			NOT NULL,
  
  PRIMARY KEY (`U_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment` (
  `code`		INT				NOT NULL,
  `R_code`		BIGINT			NOT NULL,
  `U_code`		INT				NOT NULL,
  `comment` 	VARCHAR(500)	NOT NULL,
  `datetime`	DATETIME		NOT NULL,
  `deleted`		BOOL			NOT NULL,
  
  PRIMARY KEY (`code`)
--  ,FOREIGN KEY (R_code)			REFERENCES db_current.room (code)
--  ,FOREIGN KEY (U_code)			REFERENCES db_current.item (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

