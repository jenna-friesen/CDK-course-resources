import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { CfnUserPoolGroup, UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { CfnUserGroup } from "aws-cdk-lib/aws-elasticache";
import { Construct } from "constructs";

export class AuthStack extends Stack {
  public userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, prop?: StackProps) {
    super(scope, id, prop);
    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminsGroup();
  }

  private createUserPool() {
    this.userPool = new UserPool(this, "SpaceUserPool", {
      selfSignUpEnabled: true,

      signInAliases: { username: true, email: true },
    });

    new CfnOutput(this, "SpacesUserPoolId", {
      value: this.userPool.userPoolId,
    });
  }
  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient("SpaceUserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
    });
    new CfnOutput(this, "SpacesUserPoolClientId", {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createAdminsGroup() {
    new CfnUserPoolGroup(this, 'SpaceAdmins', {
        userPoolId: this.userPool.userPoolId,
        groupName: 'admins'
    })
  }
}
