const API_URL = 'http://eluxnetworks.net:8000/function/well-api/api';
const CONTENT_TYPE_VALUE = 'application/x-www-form-urlencoded';

export default class VoiceAskAPIService {

  //Authorize
  static async checkCredentials(
    userName: string,
    password: string,
    clientId: string,
    nonce: string
  ): Promise<any> {
    try {
      console.log('VoiceAskAPIService - checkCredentials - Making API Call...');
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': CONTENT_TYPE_VALUE,
          },
          body: new URLSearchParams({
            function: 'credentials',
            user_name: userName,
            clientId: clientId,
            ps: password,
            nonce: nonce
          }).toString(),
        });

      if (response.status === 200) {
        const data = await response.json();
        console.log('VoiceAskAPIService - API Response:', data);
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

  //AskWellNuoAI
  static async askWellNuoAIQuestion(
    clientId: string,
    token: string,
    userName: string,
    question: string,
    nonce: string
  ): Promise<any> {
    try {
      console.log('VoiceAskAPIService - askWellNuoAIQuestion - Making API Call...');
      console.log('VoiceAskAPIService - voice_ask, \nclientId: ', clientId,
        '\ntoken: ', token,
        '\nuser_name: ', userName,
        '\nquestion: ', question,
        '\nnonce:', nonce);
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': CONTENT_TYPE_VALUE,
          },
          mode: 'cors',
          body: new URLSearchParams({
            function: 'voice_ask',
            clientId: clientId,
            token: token,
            user_name: userName,
            question: question,
            nonce: nonce,
          }).toString(),
        }
      );

      const jsonResponse = await response.json();
      console.log('VoiceAskAPIService - API Response:', jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error('VoiceAskAPIService - API Call Error:', error);
      throw error; // Propagate the error for handling in MainLayout
    }
  }
}
