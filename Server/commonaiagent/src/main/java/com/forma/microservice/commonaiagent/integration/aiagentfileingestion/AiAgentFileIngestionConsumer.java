package com.forma.microservice.commonaiagent.integration.aiagentfileingestion;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forma.microservice.commonaiagent.aiagentmodels.FileUploadEvent;

@Component
public class AiAgentFileIngestionConsumer {

    private final AiAgentFileIngestionService ingestionService;
    private final ObjectMapper objectMapper;

    public AiAgentFileIngestionConsumer(AiAgentFileIngestionService ingestionService, ObjectMapper objectMapper) {
        this.ingestionService = ingestionService;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "forma-topic", groupId = "forma-group")
    public void consume(String jsonPayload) {
        try {
            FileUploadEvent event = objectMapper.readValue(jsonPayload, FileUploadEvent.class);
            ingestionService.processAndStoreFile(event.fileId(), event.fileName());
        } catch (Exception e) {
            throw new RuntimeException("Failed to process Kafka message payload", e);
        }
    }
}