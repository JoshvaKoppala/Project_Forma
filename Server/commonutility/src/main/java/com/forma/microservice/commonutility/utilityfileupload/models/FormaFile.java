package com.forma.microservice.commonutility.utilityfileupload.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormaFile {

    @Id
    @GeneratedValue(generator = "uuid")
    private String fileId;

    private String fileName;

    private String fileType;

    @Lob
    private byte[] fileDate;

}
