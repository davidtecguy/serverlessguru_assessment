import { handler } from '../../../src/handlers/getItem';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('getItem', () => {
  beforeEach(() => ddbMock.reset());

  it('should return item if found', async () => {
    ddbMock.on(GetCommand).resolves({ Item: { id: '123', name: 'Espresso' } });

    const response = await handler({ pathParameters: { id: '123' } } as any);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).name).toBe('Espresso');
  });

  it('should return 404 if item not found', async () => {
    ddbMock.on(GetCommand).resolves({});

    const response = await handler({ pathParameters: { id: 'not-found' } } as any);
    expect(response.statusCode).toBe(404);
  });
});
