import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";

const AWS_REGION = 'us-west-2'

Amplify.configure({
    Auth: {
        region: AWS_REGION,
        userPoolId: 'us-west-2_rIZEsrBAo',
        userPoolWebClientId: '75doe34gmhbf3tbj61qjl659f8',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }

})

export class AuthService {
  public async login(userName: string, password: string) {
    const result = (await Auth.signIn(userName, password)) as CognitoUser;
    return result;
  }
}
