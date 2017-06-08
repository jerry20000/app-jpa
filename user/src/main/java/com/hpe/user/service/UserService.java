package com.hpe.user.service;

import com.hpe.core.page.PageUtil;
import com.hpe.core.util.StringUtil;
import com.hpe.redis.IRedisService;
import com.hpe.user.IUserService;
import com.hpe.user.dao.mapper.UserMapper;
import com.hpe.user.dao.repository.UserRepository;
import com.hpe.user.entity.User;
import com.hpe.user.vo.UserVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Description
 * date 2017/5/22
 *
 * @author liyi
 * @version 1.0
 */
@Service
public class UserService implements IUserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private IRedisService redisService;

    @Override
    public Page<UserVo> getUserPage(String name, Integer currentPage, Integer pageSize) {
        Pageable p = PageUtil.getPageable(currentPage,pageSize);
        name = StringUtil.getValueStr(name);
        Page<User> userPage = userRepository.findUserPage(name,p);
        List<UserVo> userVoList = new ArrayList<>();
        for (User user: userPage.getContent()){
            UserVo userVo = new UserVo();
            BeanUtils.copyProperties(user,userVo);
            userVoList.add(userVo);
        }
        logger.info("userVoList size="+userVoList.size());
        Page<UserVo> userVoPage = new PageImpl<UserVo>(userVoList,p,userPage.getTotalElements());
        return userVoPage;
    }

    @Override
    public Page<UserVo> getUserPage(Integer currentPage, Integer pageSize) {
        Pageable p = PageUtil.getPageable(currentPage,pageSize);
        Page<User> userPage = userMapper.getUserAll(p);
        //List<User> userList = userMapper.findAll();
        List<UserVo> userVoList = new ArrayList<>();
        for (User user: userPage.getContent()){
            UserVo userVo = new UserVo();
            BeanUtils.copyProperties(user,userVo);
            userVoList.add(userVo);
        }
        logger.info("userVoList size="+userVoList.size());
        Page<UserVo> userVoPage = new PageImpl<UserVo>(userVoList,p,userPage.getTotalElements());
        return userVoPage;
    }

    @Override
    @SuppressWarnings("unchecked")
    public UserVo getUserById(Long id) {
        if (id == null) return null;
        // 从缓存中获取城市信息
        String key = "user_" + id;
        // 缓存存在
        UserVo userVoCache = redisService.getObject(key,UserVo.class);
        if (userVoCache !=null) {
            logger.info("UserService.getUserById() : 用户从缓存中读取 >> " + userVoCache.toString());
            return userVoCache;
        }
        // 从 DB 中获取用户信息
        User user = userRepository.findOne(id);
        if (user == null) return null;
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(user,userVo);

        // 插入缓存
        redisService.setObject(key,userVo);
        logger.info("UserService.getUserById() : 用户插入缓存 >> " + userVo.toString());
        return userVo;
    }

    @Override
    @Transactional
    public int save(UserVo userVo) {
        if (userVo == null) return -1;
        User user = new User();
        BeanUtils.copyProperties(userVo,user);
        userRepository.save(user);
        return 1;
    }

    @Override
    @Transactional
    public int remove(Long id) {
        if (id == null) return -1;
        userRepository.delete(id);
        return 1;
    }
}
