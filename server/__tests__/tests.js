const request = require('supertest');
const app = require('../index'); // Replace './app' with the path to your Express server file

describe('GET /reviews', () => {
  it('should return the correct response from the database', async () => {
    const response = await request(app).get('/reviews');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(/* Expected response from the database */);
  });
});
