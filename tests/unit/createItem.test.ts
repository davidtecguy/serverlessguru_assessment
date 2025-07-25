import { handler } from '../../../src/handlers/createItem';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('createItem', () => {
  beforeEach(() => ddbMock.reset());

  it('should create an item and return 201', async () => {
    ddbMock.on(PutCommand).resolves({});

    const event = {
      body: JSON.stringify({ name: 'Latte', size: 'Large', price: 4.5 }),
    };

    const response = await handler(event as any);

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body.name).toBe('Latte');
  });

  it('should return 400 if body is missing', async () => {
    const response = await handler({} as any);
    expect(response.statusCode).toBe(400);
  });
});