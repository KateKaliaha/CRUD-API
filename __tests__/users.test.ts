import request from 'supertest';
import { server } from '../src/index';

let testId: Record<string, string> = {};

describe('Scenario 1', () => {
  afterAll(() => {
    server.close();
    testId = {};
  });

  it('first request should return empty array and status 200', async () => {
    await request(server).get('/api/users').expect(200, []);
  });

  it('should create user with correct input data', async () => {
    const response = await request(server).post('/api/users').send({
      username: 'Alex',
      age: 30,
      hobbies: [],
    });
    testId.id1 = response.body.id;
    expect(response.body).toEqual({
      id: testId.id1,
      username: 'Alex',
      age: 30,
      hobbies: [],
    });
  });

  it('should return changed user', async () => {
    const response = await request(server)
      .put(`/api/users/${testId.id1}`)
      .send({
        username: 'Nina',
        age: 30,
        hobbies: [],
      });

    expect(response.body).toEqual({
      id: `${testId.id1}`,
      username: 'Nina',
      age: 30,
      hobbies: [],
    });
  });

  it(`should return user by id`, async () => {
    const response = await request(server).get(`/api/users/${testId.id1}`);

    expect(response.body).toEqual({
      id: `${testId.id1}`,
      username: 'Nina',
      age: 30,
      hobbies: [],
    });
  });

  it('should delete user and return status 204', async () => {
    await request(server).delete(`/api/users/${testId.id1}`).expect(204);
  });

  it('should return empty data', async () => {
    await request(server).get(`/api/users`).expect(200, []);
  });

  it(`should return status 404 and message User not found!`, async () => {
    const response = await request(server).get(`/api/users/${testId.id1}`);
    expect(response.statusCode).toEqual(404);
    expect(response.text).toContain('User not found!');
  });
});

describe('Scenario 2', () => {
  afterAll(() => {
    server.close();
    testId = {};
  });

  it(`request with incorrect path should return status 404`, async () => {
    const response = await request(server).get('/user/users');
    expect(response.statusCode).toEqual(404);
    expect(response.text).toContain('Invalid request!');
  });

  it(`request with incorrect path shouldn't create a new user and should return empty users data`, async () => {
    const response = await request(server).post('/user/users').send({
      username: 'Alex',
      age: 30,
      hobbies: [],
    });
    expect(response.statusCode).toEqual(404);
    expect(response.text).toContain('Invalid request!');

    await request(server).get('/api/users').expect(200, []);
  });

  it('should create two users with correct input data', async () => {
    const response1 = await request(server)
      .post('/api/users')
      .send({
        username: 'Alex',
        age: 30,
        hobbies: ['swim'],
      });
    testId.id1 = response1.body.id;
    expect(response1.body).toEqual({
      id: testId.id1,
      username: 'Alex',
      age: 30,
      hobbies: ['swim'],
    });

    const response2 = await request(server)
      .post('/api/users')
      .send({
        username: 'Samanta',
        age: 25,
        hobbies: ['sewing'],
      });
    testId.id2 = response2.body.id;
    expect(response2.body).toEqual({
      id: testId.id2,
      username: 'Samanta',
      age: 25,
      hobbies: ['sewing'],
    });
  });

  it('should return data with two users', async () => {
    const response = await request(server).get(`/api/users`);
    expect(response.body.length).toBe(2);
  });

  it(`request with incorrect user data (without required area) shouldn't create a new user`, async () => {
    const response = await request(server).post('/api/users').send({
      age: 30,
      hobbies: [],
    });
    expect(response.statusCode).toEqual(404);
    expect(response.text).toContain('Body does not contain required fields');
  });

  it('should return data with two users', async () => {
    const response = await request(server).get(`/api/users`);
    expect(response.body.length).toBe(2);
  });
});

describe('Scenario 3', () => {
  afterAll(() => {
    server.close();
    testId = {};
  });

  it('should create two users with correct input data', async () => {
    const response1 = await request(server)
      .post('/api/users')
      .send({
        username: 'Alex',
        age: 30,
        hobbies: ['swim'],
      });
    testId.id1 = response1.body.id;
    expect(response1.body).toEqual({
      id: testId.id1,
      username: 'Alex',
      age: 30,
      hobbies: ['swim'],
    });

    const response2 = await request(server)
      .post('/api/users')
      .send({
        username: 'Samanta',
        age: 25,
        hobbies: ['sewing'],
      });
    testId.id2 = response2.body.id;
    expect(response2.body).toEqual({
      id: testId.id2,
      username: 'Samanta',
      age: 25,
      hobbies: ['sewing'],
    });
  });

  it(`shouldn't return data with invalid id and should send message 'ID is not uuid format!'`, async () => {
    const response = await request(server).get(
      `/api/users/9cf39ee2-3f18-4564-b183-d616755a424`,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.text).toContain('ID is not uuid format!');
  });

  it(`shouldn't update data with invalid id and should send message 'ID is not uuid format!'`, async () => {
    const response = await request(server)
      .put(`/api/users/9cf39ee2-3f18-4564-b183-d616755a424`)
      .send({
        id: testId.id2,
        username: 'Nikky',
        age: 25,
        hobbies: ['sewing'],
      });
    expect(response.statusCode).toEqual(400);
    expect(response.text).toContain('ID is not uuid format!');

    const responseUserData = await request(server).get(
      `/api/users/${testId.id2}`,
    );

    expect(responseUserData.body).toEqual({
      id: `${testId.id2}`,
      username: 'Samanta',
      age: 25,
      hobbies: ['sewing'],
    });
  });

  it(`shouldn't update data with not founded id and should send message 'User not exist!'`, async () => {
    const response = await request(server)
      .put(`/api/users/9cf39ee2-3f18-4564-b183-d616755a424a`)
      .send({
        id: testId.id2,
        username: 'Nikky',
        age: 25,
        hobbies: ['sewing'],
      });
    expect(response.statusCode).toEqual(404);
    expect(response.text).toContain('User not exist!');

    const responseUserData = await request(server).get(
      `/api/users/${testId.id2}`,
    );

    expect(responseUserData.body).toEqual({
      id: `${testId.id2}`,
      username: 'Samanta',
      age: 25,
      hobbies: ['sewing'],
    });
  });

  it(`shouldn't update data with incorrect data (without required area) and should send message 'Body does not contain required fields'`, async () => {
    const response = await request(server)
      .put(`/api/users/${testId.id2}`)
      .send({
        username: 'Nikky',
        hobbies: ['sewing'],
      });
    expect(response.statusCode).toEqual(404);
    expect(response.text).toContain('Body does not contain required fields');

    const responseUserData = await request(server).get(
      `/api/users/${testId.id2}`,
    );

    expect(responseUserData.body).toEqual({
      id: `${testId.id2}`,
      username: 'Samanta',
      age: 25,
      hobbies: ['sewing'],
    });
  });

  it(`shouldn't delete data with invalid id and should send message 'ID is not uuid format!'`, async () => {
    const response = await request(server).delete(
      `/api/users/9cf39ee2-3f18-4564-b183-d616755a424`,
    );

    expect(response.statusCode).toEqual(400);
    expect(response.text).toContain('ID is not uuid format!');

    await request(server)
      .get(`/api/users/${testId.id2}`)
      .expect(200, {
        id: `${testId.id2}`,
        username: 'Samanta',
        age: 25,
        hobbies: ['sewing'],
      });
  });

  it(`shouldn't delete data with not founded id and should send message 'User not exist!'`, async () => {
    const response = await request(server).delete(
      `/api/users/9cf39ee2-3f18-4564-b183-d616755a424a`,
    );

    expect(response.statusCode).toEqual(404);
    expect(response.text).toContain('User not exist!');

    await request(server)
      .get(`/api/users/${testId.id2}`)
      .expect(200, {
        id: `${testId.id2}`,
        username: 'Samanta',
        age: 25,
        hobbies: ['sewing'],
      });
  });
});
