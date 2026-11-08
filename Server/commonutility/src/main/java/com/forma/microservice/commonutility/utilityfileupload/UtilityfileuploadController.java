package com.forma.microservice.commonutility.utilityfileupload;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.forma.microservice.commonutility.utilitymodels.FormaFile;
import com.forma.microservice.commonutility.utilityrepositories.UtilityfileRepository;



@RestController
@RequestMapping("/file")
public class UtilityfileuploadController {

    private final UtilityfileRepository fileRepository;

    public UtilityfileuploadController(UtilityfileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @PostMapping("/upload")
    public String postMethodName(@RequestParam("file") MultipartFile file) {
        try {
            FormaFile saveFile = new FormaFile();
            saveFile.setFileName(file.getOriginalFilename());
            saveFile.setFileType(file.getContentType());
            saveFile.setFileDate(file.getBytes());
            fileRepository.save(saveFile);
            return "File uploaded successfully";

        } catch (Exception e) {
            return "File upload failed!";
        }
    }

}