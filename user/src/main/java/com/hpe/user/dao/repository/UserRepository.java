package com.hpe.user.dao.repository;

import com.hpe.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Description
 * date 2016/8/12
 *
 * @author liyi
 * @version 1.0
 */
@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    @Query("select o from User o where (?1 is null or o.name = ?1 ) " )
    Page<User> findUserPage(String name, Pageable pageable);
}
