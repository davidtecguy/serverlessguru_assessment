import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const db = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME!;

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing ID" }),
    };
  }

  try {
    await db.delete({
      TableName: tableName,
      Key: { id },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item deleted" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to delete item", error: err }),
    };
  }
};