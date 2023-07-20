import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";

const dynamoDbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getSpaces(event, dynamoDbClient);
        return getResponse;
      case "POST":
        const postResponse = await postSpaces(event, dynamoDbClient);
        return postResponse;
      case "PUT":
        const putResponse = await updateSpaces(event, dynamoDbClient);
        return putResponse;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

export { handler };
