package com.hpe;

import com.hpe.controller.LogFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

/**
 * Description
 * date 2017/5/22
 *
 * @author liyi
 * @version 1.0
 */
@SpringBootApplication
public class Application {

    private static ConfigurableApplicationContext appCtx;

    public static void shutdown(){
        appCtx.close();
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean(LogFilter myFilter){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(myFilter);
        filterRegistrationBean.setEnabled(true);
        filterRegistrationBean.addUrlPatterns("/*");
        return filterRegistrationBean;
    }

    public static void main(String [] args){
        appCtx = SpringApplication.run(Application.class, args);

    }
}
