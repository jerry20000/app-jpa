package com.hpe.mybatis.config;

/**
 * Description
 * date 2017/5/25
 *
 * @author liyi
 * @version 1.0
 */
//@Configuration
//@EnableTransactionManagement
public class DataBaseConfiguration {

 /*   private RelaxedPropertyResolver propertyResolver;

    private static Logger log = LoggerFactory.getLogger(DataBaseConfiguration.class);

    @Override
    public void setEnvironment(Environment env) {
        this.propertyResolver = new RelaxedPropertyResolver(env, "spring.datasource.");
    }

    @Bean(name="writeDataSource", destroyMethod = "close", initMethod="init")
    @Primary
    public DataSource writeDataSource() {
        log.debug("Configruing Write DataSource");

        DruidDataSource datasource = new DruidDataSource();
        datasource.setUrl(propertyResolver.getProperty("url"));
        datasource.setDriverClassName(propertyResolver.getProperty("type"));
        datasource.setUsername(propertyResolver.getProperty("user"));
        datasource.setPassword(propertyResolver.getProperty("password"));

        return datasource;
    }

    @Bean(name="readOneDataSource", destroyMethod = "close", initMethod="init")
    public DataSource readOneDataSource() {
        log.debug("Configruing Read One DataSource");

        DruidDataSource datasource = new DruidDataSource();
        datasource.setUrl(propertyResolver.getProperty("url"));
        datasource.setDriverClassName(propertyResolver.getProperty("type"));
        datasource.setUsername(propertyResolver.getProperty("user"));
        datasource.setPassword(propertyResolver.getProperty("password"));

        return datasource;
    }

    @Bean(name="readTowDataSource", destroyMethod = "close", initMethod="init")
    public DataSource readTowDataSource() {
        log.debug("Configruing Read Two DataSource");

        DruidDataSource datasource = new DruidDataSource();
        datasource.setUrl(propertyResolver.getProperty("url"));
        datasource.setDriverClassName(propertyResolver.getProperty("type"));
        datasource.setUsername(propertyResolver.getProperty("user"));
        datasource.setPassword(propertyResolver.getProperty("password"));

        return datasource;
    }


    @Bean(name="readDataSources")
    public List<DataSource> readDataSources(){
        List<DataSource> dataSources = new ArrayList<DataSource>();
        dataSources.add(readOneDataSource());
        dataSources.add(readTowDataSource());
        return dataSources;
    }*/
}
