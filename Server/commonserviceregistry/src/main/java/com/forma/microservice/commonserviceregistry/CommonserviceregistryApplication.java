package com.forma.microservice.commonserviceregistry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class CommonserviceregistryApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommonserviceregistryApplication.class, args);
	}

}
