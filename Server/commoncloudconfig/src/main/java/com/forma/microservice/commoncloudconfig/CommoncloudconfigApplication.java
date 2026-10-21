package com.forma.microservice.commoncloudconfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class CommoncloudconfigApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommoncloudconfigApplication.class, args);
	}

}
