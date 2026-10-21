package com.forma.microservice.commonuserlogin;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/common/user/login")

public class CommonuserloginController {

    @GetMapping("/dashboard")
    public String getLoggedInUserName(@AuthenticationPrincipal Jwt jwtToken) {
        return jwtToken.getClaimAsString("preferred_username");

    }

}
