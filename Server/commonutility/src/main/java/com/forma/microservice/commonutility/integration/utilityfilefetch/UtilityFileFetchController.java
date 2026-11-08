package com.forma.microservice.commonutility.integration.utilityfilefetch;

import java.io.FileNotFoundException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forma.microservice.commonutility.utilitymodels.FormaFile;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/file")
public class UtilityFileFetchController {
    private final UtilityFileFetchService utilityFileFetchService;

    public UtilityFileFetchController(UtilityFileFetchService utilityFileFetchService) {
        this.utilityFileFetchService = utilityFileFetchService;
    }

    @GetMapping("/fetch")
    public ResponseEntity<byte[]> fetchFile(@RequestBody String fileIdString) throws FileNotFoundException {
        FormaFile file = utilityFileFetchService.getFile(fileIdString);
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(file.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
                .body(file.getFileDate());
    }

}
