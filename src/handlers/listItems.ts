import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const db = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME!;

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const result = await db.scan({ TableName: tableName }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to list items", error: err }),
    };
  }
};