package com.hpe.user.controller;

import com.hpe.core.ObjectResult;
import com.hpe.user.IUserService;
import com.hpe.user.vo.UserVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/**
 * Description
 * date 2017/5/22
 *
 * @author liyi
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService userService;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public ObjectResult getUserList(@RequestParam(value = "name",required = false)String name,
                                    @RequestParam(value = "currentPage",required = false)Integer currentPage,
                                    @RequestParam(value = "pageSize",required = false)Integer pageSize, HttpServletResponse response){
        try{
            Page<UserVo> userPage= userService.getUserPage(name,currentPage,pageSize);
            //response.addHeader("Page", String.valueOf(userPage.getNumber()+1));
            //response.addHeader("Page-Count", String.valueOf(userPage.getTotalPages()));
            return new ObjectResult("true",userPage);
        }catch (Exception e){
            e.printStackTrace();
            return new ObjectResult("false","查询失败");
        }
    }

    @RequestMapping(value = "/list-mybatis",method = RequestMethod.GET)
    public ObjectResult getUserList2(@RequestParam(value = "name",required = false)String name,
                                    @RequestParam(value = "currentPage",required = false)Integer currentPage,
                                    @RequestParam(value = "pageSize",required = false)Integer pageSize, HttpServletResponse response){
        try{
            Page<UserVo> userPage= userService.getUserPage(currentPage,pageSize);
            //response.addHeader("Page", String.valueOf(userPage.getNumber()+1));
            //response.addHeader("Page-Count", String.valueOf(userPage.getTotalPages()));
            return new ObjectResult("true",userPage);
        }catch (Exception e){
            e.printStackTrace();
            return new ObjectResult("false","查询失败");
        }
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public ObjectResult getUserById(@PathVariable(value = "id")Long id, HttpServletResponse response){
        try{
            UserVo userVo= userService.getUserById(id);
            return new ObjectResult("true",userVo);
        }catch (Exception e){
            e.printStackTrace();
            return new ObjectResult("false","查询失败");
        }
    }
}
