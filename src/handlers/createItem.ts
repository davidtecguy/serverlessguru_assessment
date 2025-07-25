import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const db = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME!;

export const handler: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body || '{}');
  const item = { id: uuidv4(), ...data };

  await db.put({ TableName: tableName, Item: item }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };
};