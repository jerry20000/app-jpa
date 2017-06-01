package com.hpe.core.page;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * Description
 * date 2017/5/22
 *
 * @author liyi
 * @version 1.0
 */
public class PageUtil {

    /**
     * 分页初始化
     * @param currentPage
     * @param pageSize
     * @return
     */
    public static Pageable getPageable(Integer currentPage, Integer pageSize){
        currentPage = currentPage == null ? 1 : currentPage;
        currentPage = currentPage <= 0 ? 1 : currentPage;
        pageSize = pageSize == null ? 10 : pageSize;
        pageSize = pageSize <= 0 ? 10 : pageSize;
        Pageable p = new PageRequest(currentPage - 1, pageSize);
        return p;
    }
}
