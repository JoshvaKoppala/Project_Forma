const HOST = 'http://192.168.1.8';
const REALM = 'forma_realm';

export const CONFIG = {
  KEYCLOAK_TOKEN_URL: `${HOST}:9090/realms/${REALM}/protocol/openid-connect/token`,
  KEYCLOAK_AUTH_URL: `${HOST}:9090/realms/${REALM}/protocol/openid-connect/auth`,
  SPRING_BOOT_URL: `${HOST}:8080/common-user-login/common/user/login/dashboard`,
  CLIENT_ID: 'forma_client',
};