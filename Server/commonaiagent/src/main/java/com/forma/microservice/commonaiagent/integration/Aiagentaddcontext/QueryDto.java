package com.forma.microservice.commonaiagent.integration.Aiagentaddcontext;

public class QueryDto {

    private String query;

    public QueryDto() {
    }

    public String getQuery() {
        return query;
    }

    @Override
    public String toString() {
        return "QueryDto [query=" + query + "]";
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public QueryDto(String query) {
        this.query = query;
    }

}
