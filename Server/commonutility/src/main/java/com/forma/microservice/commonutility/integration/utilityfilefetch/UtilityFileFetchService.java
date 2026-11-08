package com.forma.microservice.commonutility.integration.utilityfilefetch;

import java.io.FileNotFoundException;

import org.springframework.stereotype.Service;

import com.forma.microservice.commonutility.utilitymodels.FormaFile;
import com.forma.microservice.commonutility.utilityrepositories.UtilityfileRepository;

@Service
public class UtilityFileFetchService {

    private final UtilityfileRepository fileRepository;

    public UtilityFileFetchService(UtilityfileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FormaFile getFile(String fileId) throws FileNotFoundException {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("FIle with given Id not found"));
    }
}
