const HOST = 'http://10.227.236.77';
const REALM = 'forma_realm';

export const CONFIG = {
  KEYCLOAK_TOKEN_URL: `${HOST}:9090/realms/${REALM}/protocol/openid-connect/token`,
  KEYCLOAK_AUTH_URL: `${HOST}:9090/realms/${REALM}/protocol/openid-connect/auth`,
  SPRING_BOOT_URL: `${HOST}:8080/common-user-login/common/user/login/dashboard`,
  AI_AGENT_URL: `${HOST}:8080/common-ai-agent/add/context`,
  AI_AGENT_DIRECT_URL: `${HOST}:8080/common-ai-agent/ask`,
  CLIENT_ID: 'forma_client',
};