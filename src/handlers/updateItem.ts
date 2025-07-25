import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const db = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME!;

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters?.id;
  const body = event.body ? JSON.parse(event.body) : null;

  if (!id || !body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing ID or request body" }),
    };
  }

  const updateExpression = [];
  const ExpressionAttributeNames: Record<string, string> = {};
  const ExpressionAttributeValues: Record<string, any> = {};

  for (const key in body) {
    updateExpression.push(`#${key} = :${key}`);
    ExpressionAttributeNames[`#${key}`] = key;
    ExpressionAttributeValues[`:${key}`] = body[key];
  }

  try {
    await db.update({
      TableName: tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item updated" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update item", error: err }),
    };
  }
};