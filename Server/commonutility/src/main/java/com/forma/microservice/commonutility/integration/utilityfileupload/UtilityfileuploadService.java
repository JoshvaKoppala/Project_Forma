package com.forma.microservice.commonutility.integration.utilityfileupload;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.forma.microservice.commonutility.utilitymodels.FormaFile;
import com.forma.microservice.commonutility.utilityrepositories.UtilityfileRepository;

@Service
public class UtilityfileuploadService {

    private final UtilityfileRepository utilityfileRepository;
    private final Utilityfileuploadeventpublisher utilityfileuploadeventpublisher;

    public UtilityfileuploadService(UtilityfileRepository utilityfileRepository,
            Utilityfileuploadeventpublisher utilityfileuploadeventpublisher) {
        this.utilityfileRepository = utilityfileRepository;
        this.utilityfileuploadeventpublisher = utilityfileuploadeventpublisher;
    }

    public String fileUpload(MultipartFile file) {

        try {
            FormaFile formaFile = new FormaFile();
            formaFile.setFileName(file.getOriginalFilename());
            formaFile.setFileType(file.getContentType());
            formaFile.setFileDate(file.getBytes());
            FormaFile savedFile = utilityfileRepository.save(formaFile);
            utilityfileuploadeventpublisher.publishFileUploadEvent(savedFile.getFileId(), savedFile.getFileName());
            return "File uploaded successfully";

        } catch (Exception e) {
            return "File upload failed!";
        }
    }

}
