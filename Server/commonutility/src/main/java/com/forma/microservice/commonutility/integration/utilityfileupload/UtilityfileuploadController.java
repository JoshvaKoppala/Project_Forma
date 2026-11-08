package com.forma.microservice.commonutility.integration.utilityfileupload;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
public class UtilityfileuploadController {

    private final UtilityfileuploadService utilityfileuploadService;

    public UtilityfileuploadController(UtilityfileuploadService utilityfileuploadService) {
        this.utilityfileuploadService = utilityfileuploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Object> fileUpload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(utilityfileuploadService.fileUpload(file));
    }

}