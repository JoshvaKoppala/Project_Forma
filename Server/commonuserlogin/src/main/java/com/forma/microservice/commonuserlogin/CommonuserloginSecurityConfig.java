package com.forma.microservice.commonuserlogin;



import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;



@Configuration

@EnableWebSecurity

public class CommonuserloginSecurityConfig {



    @Bean

    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity){

        httpSecurity

        .csrf(csrf -> csrf.disable())

        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        .authorizeHttpRequests(requets ->

            requets.requestMatchers("/common-user-login/common/user/login/dashboard").authenticated()

            .anyRequest().permitAll())

        .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return httpSecurity.build();

    }



}
