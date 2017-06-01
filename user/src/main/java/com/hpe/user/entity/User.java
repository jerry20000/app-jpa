package com.hpe.user.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Description
 * date 2016/8/12
 *
 * @author liyi
 * @version 1.0
 */
@Entity
@Table(name = "t_user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    private Long id; //主键ID
    private String name; //编号
    private String password;//类别名称

    public User() {
    }

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
