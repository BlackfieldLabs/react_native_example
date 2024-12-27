const API_URL = 'http://eluxnetworks.net:8000/function/well-api/api';
const CONTENT_TYPE_VALUE = 'application/x-www-form-urlencoded';
const DEFAULT_TIMEOUT = 30000; // 30 seconds timeout

export default class VoiceAskAPIService {
  // Authorize
  static async checkCredentials(
    userName: string,
    password: string,
    clientId: string,
    nonce: string
  ): Promise<any> {
    try {
      console.log('VoiceAskAPIService - checkCredentials - Making API Call...');

      const requestBody = new URLSearchParams({
        function: 'credentials',
        user_name: userName,
        clientId: clientId,
        ps: password,
        nonce: nonce,
      }).toString();

      // Log the request details
      console.log('Request URL:', API_URL);
      console.log('Request Headers:', { 'Content-Type': CONTENT_TYPE_VALUE });
      console.log('Request Body:', requestBody);

      const response = await fetchWithTimeout(
        API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': CONTENT_TYPE_VALUE,
          },
          body: requestBody,
        },
        DEFAULT_TIMEOUT
      );

      console.log('Response Status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('VoiceAskAPIService - API Response:', JSON.stringify(data, null, 2));
        return data;
      } else {
        console.error('VoiceAskAPIService - API Call Failed. Status:', response.status);
        return { access_token: 0, privileges: 0 }; // Default response on error
      }
    } catch (error) {
      console.error('VoiceAskAPIService - API Call Error:', error);
      throw error;
    }
  }

  // Ask WellNuoAI
  static async askWellNuoAIQuestion(
    clientId: string,
    token: string,
    userName: string,
    question: string,
    nonce: string
  ): Promise<any> {
    try {
      console.log('VoiceAskAPIService - askWellNuoAIQuestion - Making API Call...');

      const requestBody = new URLSearchParams({
        function: 'voice_ask',
        clientId: clientId,
        token: token,
        user_name: userName,
        question: question,
        nonce: nonce,
      }).toString();

      // Log the request details
      console.log('Request URL:', API_URL);
      console.log('Request Headers:', { 'Content-Type': CONTENT_TYPE_VALUE });
      console.log('Request Body:', requestBody);

      const response = await fetchWithTimeout(
        API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': CONTENT_TYPE_VALUE,
          },
          mode: 'cors',
          body: requestBody,
        },
        DEFAULT_TIMEOUT
      );

      console.log('Response Status:', response.status);

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('VoiceAskAPIService - API Response:', JSON.stringify(jsonResponse, null, 2));
        return jsonResponse;
      } else {
        console.error('VoiceAskAPIService - API Call Failed. Status:', response.status);
        throw new Error(`API call failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('VoiceAskAPIService - API Call Error:', error);
      throw error; // Propagate the error for handling in MainLayout
    }
  }
}

const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number): Promise<Response> => {
  return new Promise<Response>((resolve, reject) => {
      const timer = setTimeout(() => {
          reject(new Error('Request timed out'));
      }, timeout);

      fetch(url, options)
          .then((response) => {
              clearTimeout(timer);
              resolve(response);
          })
          .catch((error) => {
              clearTimeout(timer);
              reject(error);
          });
  });
};
