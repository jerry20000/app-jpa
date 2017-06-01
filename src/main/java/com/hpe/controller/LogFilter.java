package com.hpe.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.Inet6Address;
import java.net.InetAddress;
import java.net.UnknownHostException;


/**
 * Created by jack lu on 2016/3/4.
 */
@Component("myFilter")
public class LogFilter implements Filter {
    FilterConfig config;
    private Logger logger = LoggerFactory.getLogger(LogFilter.class);

    public void destroy() {
        this.config = null;
    }

    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws IOException, ServletException {
         HttpServletRequest hreq = (HttpServletRequest) req;
        // log
        logger.info(handleIp(hreq.getRemoteAddr())+"   "+hreq.getMethod()+"   "+hreq.getServletPath() );
        try {
         chain.doFilter(req, res);
        } catch (IOException ioe) {
            System.err.println("catch ClientAbortException>>>>");
            //ioe.printStackTrace();
        }catch (Exception e) {
            e.printStackTrace();//other Exceptions
        }

    }

    public void init(FilterConfig config) throws ServletException {

        this.config = config;
    }

    public  String handleIp(String originalIpStr){
        String re="";
        try{
            if(originalIpStr!=null){
                InetAddress inetAddress=InetAddress.getByName(originalIpStr);
                String originalIp=inetAddress.getHostAddress();

                if(inetAddress instanceof Inet6Address){//v6
                    String ip=originalIp;
                    originalIp = originalIp.replaceFirst("0:0:0:0:0:0:0:", "::");
                    if(originalIp.length()==ip.length()) {
                        originalIp = originalIp.replaceFirst(":0:0:0:0:0:0:", "::");
                    }
                    if(originalIp.length()==ip.length()) {
                        originalIp = originalIp.replaceFirst(":0:0:0:0:0:", "::");
                    }
                    if(originalIp.length()==ip.length()) {
                        originalIp = originalIp.replaceFirst(":0:0:0:0:", "::");
                    }
                    if(originalIp.length()==ip.length()) {
                        originalIp = originalIp.replaceFirst(":0:0:0:", "::");
                    }
                    if(originalIp.length()==ip.length()){
                        originalIp=originalIp.replaceFirst(":0:0:","::");
                    }
                    if(originalIp.length()==ip.length()){
                        originalIp=originalIp.replaceFirst(":0:","::");
                    }
                }
                re=originalIp;
            }
        }catch (UnknownHostException e){
            e.printStackTrace();
        }
        return re;
    }

}