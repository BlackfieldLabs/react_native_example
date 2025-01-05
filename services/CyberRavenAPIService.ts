import Auth from '@aws-amplify/auth';

const CyberRavenAPIService = {
  /**
   * Login to CyberRaven using AWS Cognito
   * @param {string} username - The username of the user
   * @param {string} password - The user's password
   * @returns {Promise<string>} - Resolves with the JWT access token
   */
  login: async (username: string, password:string) => {
    try {
      console.log('Auth:', Auth); // Should log the Auth object with its methods

      const user = await Auth.signIn({ username: 'nenad.stojkovic@brightmarbles.io', password: 'Mazilica.89' });

      // Get the user's session token
      const session = await Auth.fetchAuthSession();
      const idToken = session.tokens?.idToken?.payload;

      console.log('Login successful. ID Token:', idToken);
      return idToken;
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      throw new Error(error.message || 'Unable to log in');
    }
  },

//   const signIn = async (username: string, password: string) => {
//     try {
//       const result = await Auth.signIn(username, password);

//       if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
//         setUser(result);
//         // Redirect the user to the create password page
//         return { isSignInSuccess: false, message: 'NEW_PASSWORD_REQUIRED' };
//       } else {
//         setUsername(result.username);
//         setIsAuthenticated(true);

//         return { isSignInSuccess: true, message: '' };
//       }
//     } catch (error) {
//       return {
//         isSignInSuccess: false,
//         message: t('CommonErrors.incorrectUsernameOrPassword'),
//       };
//     }
//   };
};

export default CyberRavenAPIService;
