package com.herita.quest.Config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class Transaction {
    @Bean(name = "transactionManager")
    public PlatformTransactionManager add(EntityManagerFactory dbFactory){
        return new JpaTransactionManager(dbFactory);
    }
}
