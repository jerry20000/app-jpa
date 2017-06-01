package com.hpe.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Controller
public class HomeController extends BaseController {
    private List<String> testDataFiles;

    private Logger logger = LoggerFactory.getLogger(HomeController.class);

    @RequestMapping(path="/", method = RequestMethod.GET, headers="Host=admin.zchz.com")
    public String AdminPage(){
        return "redirect:/index.jsp";
    }

    @RequestMapping(path="/", method = RequestMethod.GET, headers="Host=ent.zchz.com")
    public String EntPage(){
        return "redirect:/mgr";
    }

    @RequestMapping(path={"/", "/web/**"}, method = RequestMethod.GET)
    public ModelAndView HomePage(HttpServletRequest request){
        ModelAndView mv = new ModelAndView("Home");
        return mv;
    }
}

