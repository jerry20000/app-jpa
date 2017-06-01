package com.hpe.user;

import com.hpe.user.vo.UserVo;
import org.springframework.data.domain.Page;

/**
 * Description
 * date 2017/5/22
 *
 * @author liyi
 * @version 1.0
 */
public interface IUserService {

    /**
     * 分页获取
     * @param name
     * @param currentPage
     * @param pageSize
     * @return
     */
    Page<UserVo> getUserPage(String name, Integer currentPage, Integer pageSize);

    /**
     * 分页获取
     * @param currentPage
     * @param pageSize
     * @return
     */
    Page<UserVo> getUserPage(Integer currentPage, Integer pageSize);

    /**
     * 通过id获取用户
     * @param id
     * @return
     */
    UserVo getUserById(Long id);
}
