import { CONFIG } from '../config/config';



export const authService = {

  // 1. Password Grant: Authenticate with Keycloak

  loginWithPassword: async (username, password) => {

    const params = new URLSearchParams();

    params.append('grant_type', 'password');

    params.append('client_id', CONFIG.CLIENT_ID);

    params.append('username', username);

    params.append('password', password);

    const response = await fetch(CONFIG.KEYCLOAK_TOKEN_URL, {



      method: 'POST',

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded',

      },

      body: params.toString(),

    });



    const data = await response.json();



    if (!response.ok) {

      throw new Error(data.error_description || 'Authentication failed.');

    }



    return data.access_token;

  },



  // 2. Authorization Code Grant: Exchange social login code for token

  exchangeSocialCode: async (code, redirectUri) => {

    const params = new URLSearchParams();

    params.append('grant_type', 'authorization_code');

    params.append('client_id', CONFIG.CLIENT_ID);

    params.append('code', code);

    params.append('redirect_uri', redirectUri);



    const response = await fetch(CONFIG.KEYCLOAK_TOKEN_URL, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded',

      },

      body: params.toString(),

    });



    const data = await response.json();



    if (!response.ok) {

      throw new Error(data.error_description || 'Failed to exchange authorization code.');

    }



    return data.access_token;

  },



  // 3. Resource Server: Call Spring Boot with JWT Bearer Token

  fetchDashboard: async (accessToken) => {
    console.log("spring url: ", CONFIG.SPRING_BOOT_URL );

    const response = await fetch(CONFIG.SPRING_BOOT_URL, {

      method: 'GET',

      headers: {

        'Authorization': `Bearer ${accessToken}`,

        'Content-Type': 'application/json',

      },

    });



    if (!response.ok) {

      throw new Error(`Spring Boot rejected token (Status: ${response.status})`);

    }



    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {

      return await response.json();

    }

    return await response.text();

  },

};
