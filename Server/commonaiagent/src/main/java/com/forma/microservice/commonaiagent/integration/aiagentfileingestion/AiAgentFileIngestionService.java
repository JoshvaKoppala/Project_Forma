package com.forma.microservice.commonaiagent.integration.aiagentfileingestion;

import java.util.List;
import java.util.Map;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import com.forma.microservice.commonaiagent.aiagentfeignclient.CommonUtilityFeignClient;

@Service
public class AiAgentFileIngestionService {

    private final VectorStore vectorStore;
    private final CommonUtilityFeignClient commonUtilityFeignClient;

    public AiAgentFileIngestionService(VectorStore vectorStore, CommonUtilityFeignClient commonUtilityFeignClient) {
        this.vectorStore = vectorStore;
        this.commonUtilityFeignClient = commonUtilityFeignClient;
    }

    public void processAndStoreFile(String fileId, String fileName) {
        try {

            byte[] fileBytes = commonUtilityFeignClient.fetchFile(fileId);
            ByteArrayResource resource = new ByteArrayResource(fileBytes);

            TikaDocumentReader tikaReader = new TikaDocumentReader(resource);
            List<Document> rawDocuments = tikaReader.get();

            TokenTextSplitter textSplitter = TokenTextSplitter.builder().build();
            List<Document> chunkedDocs = textSplitter.apply(rawDocuments);
            System.out.println("chunkedDocs" + chunkedDocs);

            List<Document> finalDocs = chunkedDocs.stream().map(
                    doc -> new Document(doc.getId(), doc.getText(), Map.of("fileId", fileId, "fileName", fileName)))
                    .toList();
            System.out.println("finalDocs" + finalDocs);

            vectorStore.add(finalDocs);
            System.out.println("Successfully ingested and vectorized file: " + fileName);

        } catch (Exception e) {
            System.err.println("Failed to process file ingestion for fileId " + fileId + ": " + e.getMessage());
        }

    }

}
