# Forma

Forma is a mobile client backed by Spring Boot microservices, Keycloak, PostgreSQL, and pgvector.

## Prerequisites

- Git
- Docker Compose
- Java 21
- Node.js and npm
- Ollama for the AI agent

## Start the local infrastructure

From the repository root:

```sh
docker compose up -d
```

This starts PostgreSQL, pgvector, and Keycloak. Keycloak imports the `forma-realm` realm from `keycloak/forma-realm.json` on first startup. The local development admin account is `admin` / `admin`; create a test user in the imported realm before signing in.

The compose file uses development-only credentials and must not be used as a production deployment.

## Run the backend

In separate terminals, start the services from the repository root:

```sh
./Server/commonserviceregistry/mvnw -f Server/commonserviceregistry/pom.xml spring-boot:run
./Server/commoncloudconfig/mvnw -f Server/commoncloudconfig/pom.xml spring-boot:run
./Server/commonuserlogin/mvnw -f Server/commonuserlogin/pom.xml spring-boot:run
./Server/commonapigateway/mvnw -f Server/commonapigateway/pom.xml spring-boot:run
./Server/commonaiagent/mvnw -f Server/commonaiagent/pom.xml spring-boot:run
```

The AI agent also requires these Ollama models:

```sh
ollama pull qwen2.5-coder:1.5b
ollama pull nomic-embed-text:v1.5
```

Its PDF ingestion is optional; set `FORMA_AI_DOCUMENT` to a Spring resource location if you want to ingest a document. Personal documents are intentionally not tracked.

Run tests for a service with its Maven wrapper, for example:

```sh
./Server/commonuserlogin/mvnw -f Server/commonuserlogin/pom.xml test
```

## Run the mobile client

```sh
cd Client
npm ci
npm start
```

The client defaults to `http://10.0.2.2` on the Android emulator (the emulator's host-machine bridge) and `http://localhost` on iOS simulators. For a physical device, set `EXPO_PUBLIC_API_HOST` to your development machine's LAN address, for example `http://192.168.1.10`. The Keycloak client is a public mobile client; do not add a client secret to the app.

For a physical device, configure Keycloak's `forma_client` redirect URI and web origin to match the Expo redirect URI and the development host. OAuth identity providers (such as Google or GitHub) require their own provider credentials in Keycloak and are not included in this repository.