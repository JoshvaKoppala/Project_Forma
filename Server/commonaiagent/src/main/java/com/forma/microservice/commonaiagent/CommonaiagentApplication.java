package com.forma.microservice.commonaiagent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

import com.forma.microservice.commoncore.baseconfiguration.CommonSecurityConfig;

@SpringBootApplication
@EnableFeignClients
@Import(CommonSecurityConfig.class)
public class CommonaiagentApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommonaiagentApplication.class, args);
	}

}
