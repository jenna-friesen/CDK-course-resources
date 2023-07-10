import * as cdk from "aws-cdk-lib";
import { Fn } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

interface PhotoHandlersStackProps extends cdk.StackProps {
  targetBucketArn: string
}

export class PhotosHandlerStack extends cdk.Stack {
  private stackSuffix: string;

  constructor(scope: Construct, id: string, props: PhotoHandlersStackProps) {
    super(scope, id, props);

    const targetBucket = Fn.importValue("photos-bucket");

    new LambdaFunction(this, "PhotosHandler", {
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      code: Code.fromInline(`
      exports.handler = async (event) => {
        console.log("hello!: " + process.env.TARGET_BUCKET)
      };
      `),
      environment: { TARGET_BUCKET: props.targetBucketArn },
    });
  }
}
