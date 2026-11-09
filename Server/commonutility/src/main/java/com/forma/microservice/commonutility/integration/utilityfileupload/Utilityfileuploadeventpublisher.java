package com.forma.microservice.commonutility.integration.utilityfileupload;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.forma.microservice.commonutility.utilitymodels.FileUploadEvent;

@Service
public class Utilityfileuploadeventpublisher {

    private final KafkaTemplate<String, FileUploadEvent> kafkaTemplate;
    private static final String TOPIC = "forma-topic";

    public Utilityfileuploadeventpublisher(KafkaTemplate<String, FileUploadEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishFileUploadEvent(String fileId, String fileName) {
        FileUploadEvent uploadEvent = new FileUploadEvent(fileId, fileName);

        kafkaTemplate.send(TOPIC,uploadEvent);
        System.out.println("Published Kafka event for fileId: " + fileId + " to topic: " + TOPIC);

    }
}
