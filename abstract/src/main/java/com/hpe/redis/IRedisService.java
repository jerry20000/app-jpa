package com.hpe.redis;

import java.util.List;

/**
 * Description
 * date 2017/5/31
 *
 * @author liyi
 * @version 1.0
 */
public interface IRedisService {

    boolean set(String key, String value);

    String get(String key);

    boolean expire(String key,long expire);

    <T> boolean setList(String key ,List<T> list);

    <T> List<T> getList(String key,Class<T> clz);

    <T> boolean setObject(String key ,T t);

    <T> T getObject(String key,Class<T> clz);

    long lpush(String key,Object obj);

    long rpush(String key,Object obj);

    String lpop(String key);
}
