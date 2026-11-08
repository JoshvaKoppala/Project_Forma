package com.forma.microservice.commonutility.utilitymodels;

public record FileUploadEvent(
        String fileId,
        String fileName) {
}