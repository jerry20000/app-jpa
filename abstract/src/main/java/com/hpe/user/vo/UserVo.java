package com.hpe.user.vo;

import java.io.Serializable;

/**
 * Description
 * date 2017/5/22
 *
 * @author liyi
 * @version 1.0
 */
public class UserVo implements Serializable {
    private Long id; //主键ID
    private String name; //编号
    private String password;//类别名称

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
