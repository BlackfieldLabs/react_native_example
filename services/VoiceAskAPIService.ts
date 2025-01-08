import Tts from 'react-native-tts';

const API_URL = 'https://eluxnetworks.net/function/well-api/api';
const CONTENT_TYPE_VALUE = 'application/x-www-form-urlencoded';
const DEFAULT_TIMEOUT = 30000; // 30 seconds timeout

export default class VoiceAskAPIService {
  static async initTTS() {
    try {
      await Tts.setDefaultLanguage('en-US');
      await Tts.setDefaultRate(0.5);
      await Tts.setDefaultPitch(1.0);
    } catch (err) {
      console.warn('TTS initialization failed:', err);
    }
  }

  private static async speakResponse(text: string) {
    try {
      // Stop any ongoing speech
      await Tts.stop();

      // Speak the new text
      await Tts.speak(text);
    } catch (err) {
      console.warn('TTS speak failed:', err);
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
    nonce: string,
    stopListening?: () => Promise<void>
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

        if (jsonResponse.response?.body) {
          await VoiceAskAPIService.speakResponse(jsonResponse.response.body);
        } else {
          console.warn('VoiceAskAPIService - Response missing body content');
        }

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
