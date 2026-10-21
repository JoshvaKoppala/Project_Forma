package com.forma.microservice.commonuserlogin;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {"JWT_ISSUER_URI=http://10.227.236.77:9090/realms/forma_realm"})
class CommonuserloginApplicationTests {

	@Test
	void contextLoads() {
	}

}
