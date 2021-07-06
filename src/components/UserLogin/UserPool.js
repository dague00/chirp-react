
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_splEJrZfs',
  ClientId: '7p5v94ohigea0sd5ghkt2mlkfj'
};


export default new CognitoUserPool(poolData)