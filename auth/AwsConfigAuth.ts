export const AwsConfigAuth = {
    region: 'eu-central-1', // Frankfurt
    userPoolId: 'eu-central-1_iabkzgxRz',
    userPoolWebClientId: 'lfn7bshvf8hi5ol09675d2n17',
    cookieStorage: {
      domain: 'dev.cbrrvn.tech',
      path: '/',
      expires: 365, // Number of days
      sameSite: 'strict',
      secure: true,
    },
    authenticationFlowType: 'USER_SRP_AUTH', // Authentication flow type
  };
