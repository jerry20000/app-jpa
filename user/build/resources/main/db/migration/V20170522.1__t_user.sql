CREATE TABLE IF NOT EXISTS t_user (
  id BIGINT NOT NULL AUTO_INCREMENT ,
  name VARCHAR(64) NOT NULL  COMMENT '名称',
  password VARCHAR(32) NOT NULL   COMMENT '密码',
  PRIMARY KEY (id)
) COMMENT = '用户表';



