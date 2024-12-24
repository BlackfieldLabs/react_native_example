export default class VoiceAskAPIService {
    static async makeApiCall(
      clientId: string,
      token: string,
      userName: string,
      question: string,
      nonce: string
    ): Promise<any> {
      try {
        console.log('VoiceAskAPIService - Making API Call...');
        console.log('VoiceAskAPIService - voice_ask, clientId: ', clientId, '\ntoken: ', token, '\nuser_name: ', userName, '\nquestion: ', question, '\nnonce:', nonce);
        const response = await fetch(
          'http://eluxnetworks.net:8000/function/well-api/api',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
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
  