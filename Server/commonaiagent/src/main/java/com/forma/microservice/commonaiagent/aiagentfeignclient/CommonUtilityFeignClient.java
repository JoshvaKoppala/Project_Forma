package com.forma.microservice.commonaiagent.aiagentfeignclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.forma.microservice.commoncore.baseconfiguration.FeignClientAuthConfig;

@FeignClient (name = "common-utility", path = "/file", configuration = FeignClientAuthConfig.class)
public interface CommonUtilityFeignClient {

    @GetMapping("/fetch")
    byte[] fetchFile(@RequestParam("fileId") String fileIdString);

}
