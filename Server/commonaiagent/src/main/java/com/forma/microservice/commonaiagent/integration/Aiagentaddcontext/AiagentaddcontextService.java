package com.forma.microservice.commonaiagent.integration.Aiagentaddcontext;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

@Service
public class AiagentaddcontextService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public AiagentaddcontextService(ChatClient.Builder chatClientBuilder, VectorStore vectorStore) {
        this.chatClient = chatClientBuilder.build();
        this.vectorStore = vectorStore;
    }

    public String askWithContext(String userQuery) {

        // Perform similarity search in pgvector
        SearchRequest searchRequest = SearchRequest.builder()
                .query(userQuery)
                .topK(3)
                .build();

                System.out.println("SerchRequest-----------> "+searchRequest);

        List<Document> similarDocuments = vectorStore.similaritySearch(searchRequest);

        System.out.println(similarDocuments);

        // Extract and combine the context text from the documents
        String context = similarDocuments.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n\n"));

                System.out.println("Context---------------> "+context);

        // construct a strict system prompt to prevent hallucination
        String systemPrompt = """
                You are a helpful AI assistant. Use the following context to answer the user's question.
                If you do not know the answer based on the context, state that you do not know.
                Do not make up facts outside the provided context. If the question is out of the context reply with
                "Sorry, please ask questions related to the context. Thank you!!!!!"

                Context:
                {context}
                """;

        // send the augmented prompt to your local llm model
        return chatClient.prompt()
                .system(sp -> sp.text(systemPrompt).param("context", context))
                .user(userQuery)
                .call()
                .content();
    }

    public String askDirectly(String userQuery) {
        return chatClient.prompt()
                .user(userQuery)
                .call()
                .content();
    }
}
