import axios from 'axios';

const baseURL = 'http://localhost:3000'; // For offline testing
// Or use API Gateway endpoint if testing deployed version

describe('Items API (integration)', () => {
  let createdItem: any;

  it('POST /items - should create item', async () => {
    const response = await axios.post(`${baseURL}/items`, {
      name: 'Mocha',
      size: 'Medium',
      price: 4.0,
    });

    expect(response.status).toBe(201);
    createdItem = response.data;
  });

  it('GET /items/:id - should retrieve item', async () => {
    const response = await axios.get(`${baseURL}/items/${createdItem.id}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe('Mocha');
  });

  it('PUT /items/:id - should update item', async () => {
    const response = await axios.put(`${baseURL}/items/${createdItem.id}`, {
      price: 4.5,
    });

    expect(response.status).toBe(200);
  });

  it('DELETE /items/:id - should delete item', async () => {
    const response = await axios.delete(`${baseURL}/items/${createdItem.id}`);
    expect(response.status).toBe(200);
  });
});