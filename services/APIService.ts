import Tts from 'react-native-tts';
import SecureStorage from '../helpers/SecureStorage';

const API_URL = 'https://eluxnetworks.net/function/well-api/api';
const CONTENT_TYPE_VALUE = 'application/x-www-form-urlencoded';
const DEFAULT_TIMEOUT = 30000; // 30 seconds timeout

export default class APIService {
  static async initTTS() {
    try {
      await Tts.setDefaultLanguage('en-UK');
      await Tts.setDefaultRate(0.5);
      await Tts.setDefaultPitch(1.0);
    } catch (err) {
      console.warn(`[${new Date().toLocaleString()}] TTS initialization failed:`, err);
    }
  }

  private static async speakResponse(text: string) {
    try {
      // Stop any ongoing speech
      await Tts.stop();
      // Speak the new text
      await Tts.speak(text);
    } catch (err) {
      console.warn(`[${new Date().toLocaleString()}] TTS speak failed:`, err);
    }
  }

  // Authorize
  static async checkCredentials(
    userName: string,
    password: string,
    clientId: string,
    nonce: string
  ): Promise<any> {
    try {
      console.log(`[${new Date().toLocaleString()}] APIService - checkCredentials - Making API Call...`);

      const requestBody = new URLSearchParams({
        function: 'credentials',
        user_name: userName,
        clientId: clientId,
        ps: password,
        nonce: nonce,
      }).toString();

      // Log the request details
      console.log(`[${new Date().toLocaleString()}] Request URL:`, API_URL);
      console.log(`[${new Date().toLocaleString()}] Request Headers:`, { 'Content-Type': CONTENT_TYPE_VALUE });
      console.log(`[${new Date().toLocaleString()}] Request Body:`, requestBody);

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

      console.log(`[${new Date().toLocaleString()}] Response Status:`, response.status);

      if (response.ok) {
        const data = await response.json();
        console.log(`[${new Date().toLocaleString()}] APIService - API Response:`, JSON.stringify(data, null, 2));
        return data;
      } else {
        console.error(`[${new Date().toLocaleString()}] APIService - API Call Failed. Status:`, response.status);
        return { access_token: 0, privileges: 0 }; // Default response on error
      }
    } catch (error) {
      console.error(`[${new Date().toLocaleString()}] APIService - API Call Error:`, error);
      throw error;
    }
  }

  // Ask WellNuoAI
  static async askWellNuoAIQuestion(
    clientId: string,
    userName: string,
    question: string,
    nonce: string,
    onTokenExpired: () => void
  ): Promise<any> {
    const tokenValid = await isTokenValid();

    if (!tokenValid) {
      console.warn(`[${new Date().toLocaleString()}] APIService - Token expired. Triggering callback.`);
      onTokenExpired(); // Execute the provided callback
      return;
    }
    try {
      console.log(`[${new Date().toLocaleString()}] APIService - askWellNuoAIQuestion - Making API Call...`);
      const token = await SecureStorage.getToken();
      if (token) {
        const requestBody = new URLSearchParams({
          function: 'voice_ask',
          clientId: clientId,
          user_name: userName,
          question: question,
          token: token,
          nonce: nonce,
        }).toString();

        // Log the request details
        console.log(`[${new Date().toLocaleString()}] APIService - Request URL:`, API_URL);
        console.log(`[${new Date().toLocaleString()}] APIService - Request Headers:`, { 'Content-Type': CONTENT_TYPE_VALUE });
        console.log(`[${new Date().toLocaleString()}] APIService - Request Body:`, requestBody);

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

        console.log(`[${new Date().toLocaleString()}] Response Status:`, response.status);

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(`[${new Date().toLocaleString()}] APIService - API Response:`, JSON.stringify(jsonResponse, null, 2));

          if (jsonResponse.response?.body) {
            await APIService.speakResponse(jsonResponse.response.body);
          } else {
            console.warn(`[${new Date().toLocaleString()}] APIService - Response missing body content`);
          }

          return jsonResponse;
        } else {
          console.error(`[${new Date().toLocaleString()}] APIService - API Call Failed. Status:`, response.status);
          throw new Error(`[${new Date().toLocaleString()}] API call failed with status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error(`[${new Date().toLocaleString()}] APIService - API Call Error:`, error);
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

export const isTokenValid = async (): Promise<boolean> => {
  try {
    console.log(`[${new Date().toLocaleString()}] APIService - Is token valid.`);
    const token = await SecureStorage.getToken();
    const timestampString = await SecureStorage.getData(SecureStorage.Keys.TokenTimestamp);

    if (!token) {
      console.log(`[${new Date().toLocaleString()}] APIService - No token found.`);
    }
    if (!timestampString) {
      console.log(`[${new Date().toLocaleString()}] APIService - No timestamp found.`);
      return false;
    }

    const timestamp = parseInt(timestampString, 10);
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    // Check if the token is older than 24 hours
    if (currentTime - timestamp > twentyFourHours) {
      return false;
    }

    console.log(`[${new Date().toLocaleString()}] APIService - Token is valid.`);
    return true;
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] APIService - Error checking token validity:`, error);
    return false;
  }
};
