package com.hpe.core.util;

/**
 * Description
 * date 2017/6/5
 *
 * @author liyi
 * @version 1.0
 */
public class StringUtil {

    /**
     *空处理
     * @param value
     * @return
     */
    public static String getValueStr(String value){
        if (value == null ||  value.trim().equals("")) return null;
        return value;
    }
}
