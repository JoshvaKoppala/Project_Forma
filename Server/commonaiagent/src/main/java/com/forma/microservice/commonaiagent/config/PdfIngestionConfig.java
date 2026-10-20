package com.forma.microservice.commonaiagent.config;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Configuration
public class PdfIngestionConfig {
    private static final Logger logger = LoggerFactory.getLogger(PdfIngestionConfig.class);

    private final ResourceLoader resourceLoader;
    private final String documentLocation;

    public PdfIngestionConfig(ResourceLoader resourceLoader,
                              @Value("${forma.ai.document:}") String documentLocation) {
        this.resourceLoader = resourceLoader;
        this.documentLocation = documentLocation;
    }

    @Bean
    CommandLineRunner ingestPdf(VectorStore vectorStore) {
        return args -> {
            if (documentLocation.isBlank()) {
                logger.info("PDF ingestion is disabled; set FORMA_AI_DOCUMENT to enable it.");
                return;
            }

            Resource pdfResource = resourceLoader.getResource(documentLocation);
            if (pdfResource.exists()) {
                PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(pdfResource);
                List<Document> documents = pdfReader.read();
                vectorStore.add(documents);
                logger.info("Successfully ingested and embedded PDF into pgvector.");
            } else {
                throw new IllegalStateException("Configured PDF resource does not exist: " + documentLocation);
            }
        };
    }
}