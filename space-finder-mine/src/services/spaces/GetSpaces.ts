import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function getSpaces(
  event: APIGatewayProxyEvent,
  dynamoDbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const spaceId = event.queryStringParameters["id"];
      const getItemResponse = await dynamoDbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: spaceId },
          },
        })
      );
      if (getItemResponse.Item) {
        return { statusCode: 200, body: JSON.stringify(getItemResponse.Item) };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`Space with id ${spaceId} not found!`),
        };
      }
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify("Id required!"),
      };
    }
  }

  const result = await dynamoDbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );
  console.log(result.Items);

  const response: APIGatewayProxyResult = {
    statusCode: 201,
    body: JSON.stringify(result.Items),
  };

  return response;
}
