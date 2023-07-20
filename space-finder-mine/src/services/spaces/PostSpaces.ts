import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export async function postSpaces(
  event: APIGatewayProxyEvent,
  dynamoDbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = v4();
  const item = JSON.parse(event.body);

  const result = await dynamoDbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: {
          S: randomId,
        },
        location: {
          S: item.location,
        },
      },
    })
  );
  console.log(result);

  const response: APIGatewayProxyResult = {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }),
  };

  return response;
}
