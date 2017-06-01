package com.hpe.mybatis.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.hpe.mybatis.plugins.PaginationResultSetInterceptor;
import com.hpe.mybatis.plugins.PaginationStatementInterceptor;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Description
 * date 2017/5/25
 *
 * @author liyi
 * @version 1.0
 */
@Configuration
@MapperScan(basePackages = "com.hpe.**.dao.mapper", sqlSessionFactoryRef = "sqlSessionFactory", sqlSessionTemplateRef = "sqlSessionTemplate")
@EnableTransactionManagement
public class MyBatisConfiguration {

    private static Logger logger = LoggerFactory.getLogger(MyBatisConfiguration.class);

    @Autowired
    private Environment env;

    @Bean
    public DataSource dataSource(){

        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(env.getProperty("spring.datasource.type"));
        dataSource.setUrl(env.getProperty("spring.datasource.url"));
        dataSource.setUsername(env.getProperty("spring.datasource.user"));
        dataSource.setPassword(env.getProperty("spring.datasource.password"));
        dataSource.setInitialSize(1);
        dataSource.setMinIdle(1);
        dataSource.setMaxActive(20);

        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {

        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();

        // 获取properties中的对应配置信息
        String mapperPackage = env.getProperty("spring.mybatis.mapperPackage");
        String dialect = env.getProperty("spring.mybatis.dialect");
        String typeAliasesPackage = env.getProperty("spring.mybatis.typeAliasesPackage");
        logger.info("mapperPackage="+mapperPackage+", typeAliasesPackage="+typeAliasesPackage+", dialect="+dialect);
        Properties properties = new Properties();
        properties.setProperty("dialect", dialect);


        sessionFactory.setDataSource(dataSource);
        sessionFactory.setConfigurationProperties(properties);

        // 设置MapperLocations路径
        if(!StringUtils.isEmpty(mapperPackage)){
            ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
            sessionFactory.setMapperLocations(resourcePatternResolver.getResources(mapperPackage));
        }
        //sessionFactory.setTypeAliasesPackage(typeAliasesPackage);
        // 设置插件
        sessionFactory.setPlugins(new Interceptor[]{
                new PaginationStatementInterceptor(),
                new PaginationResultSetInterceptor()
        });

        return sessionFactory.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory){
        return new SqlSessionTemplate(sqlSessionFactory);
    }

/*    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder, DataSource dataSource) {
        String typeAliasesPackage = env.getProperty("spring.mybatis.typeAliasesPackage");
        LocalContainerEntityManagerFactoryBean entityManagerFactory = builder.dataSource(dataSource).build();

        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        properties.setProperty("hibernate.hbm2ddl.auto", "update");

        entityManagerFactory.setPackagesToScan(typeAliasesPackage);
        entityManagerFactory.setJpaProperties(properties);

        return entityManagerFactory;
    }*/

    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource){
        return new DataSourceTransactionManager(dataSource);
    }
}
