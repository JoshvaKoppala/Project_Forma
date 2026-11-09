package com.forma.microservice.commonaiagent.aiagentmodels;

public record FileUploadEvent(
        String fileId,
        String fileName) {

}
