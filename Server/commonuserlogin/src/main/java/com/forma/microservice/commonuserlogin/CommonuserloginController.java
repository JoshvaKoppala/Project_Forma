package com.forma.microservice.commonuserlogin;



import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;



@RestController

@RequestMapping("/common/user/login")

public class CommonuserloginController {



    @GetMapping("/dashboard")

    public String getMethodName() {

        return "Hello you are in login dashboard!!!!!!!!";

    }





}
