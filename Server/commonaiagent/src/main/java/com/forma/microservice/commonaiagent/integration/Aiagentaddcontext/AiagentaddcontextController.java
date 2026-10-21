package com.forma.microservice.commonaiagent.integration.Aiagentaddcontext;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiagentaddcontextController {

    private final AiagentaddcontextService commonaiagentService;

    public AiagentaddcontextController(AiagentaddcontextService commonaiagentService) {
        this.commonaiagentService = commonaiagentService;
    }

    @PostMapping("/add/context")
    public String askAI(@RequestBody QueryDto query) {
        return commonaiagentService.askWithContext(query.getQuery());
    }

    @PostMapping("/ask")
    public String askDirectly(@RequestBody QueryDto query) {
        return commonaiagentService.askDirectly(query.getQuery());
    }

}
