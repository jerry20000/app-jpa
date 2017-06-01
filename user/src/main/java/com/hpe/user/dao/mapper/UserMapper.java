package com.hpe.user.dao.mapper;

import com.hpe.user.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Description
 * date 2017/5/22
 *
 * @author liyi
 * @version 1.0
 */
public interface UserMapper {

    List<User> findAll();
    Page<User> getUserAll(@Param("pageable") Pageable pageable);
    //void save(User user);
}
