import chai from 'chai';
import createApp from '../../src/lib/createApp';
import clearDatabase from '../cleardb';

import request from 'supertest';

const { expect } = chai;

describe('Employment history', () => {
  let server;
  let token;
  beforeEach(async () => {
    const app = await createApp();
    server = await app.listen(3001);
    await clearDatabase();
    //   create new user account for the tests
    await request(server)
      .post('/v1/users/signup')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test@example.com',
        password: 'test',
        confirmPassword: 'test',
      });
    // login user to get access token
    const {
      body: { accessToken },
    } = await request(server)
      .post('/v1/users/login')
      .send({
        email: 'test@example.com',
        password: 'test',
      });
    token = accessToken;
  });

  afterEach(async () => {
    await server.close();
    await clearDatabase();
  });

  describe('POST /employments/new', async () => {
    it('should create new employment record', async () => {
      const response = await request(server)
        .post('/v1/employments/new')
        .send({
          title: 'Software developer',
          employer: 'andela',
          startDate: '2018-02-20',
          endDate: '2019-02-20',
          city: 'Nairobi',
          description: 'I will add more details',
        })
        .set({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'user-key': token,
        });

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal(
        'Employment record added successfully',
      );
    });

    it('should not create employment record without access token', async () => {
      const response = await request(server)
        .post('/v1/employments/new')
        .send({
          title: 'Software developer',
          employer: 'andela',
          startDate: '2018-20-02',
          endDate: '2019-20-02',
          city: 'Nairobi',
          description: '',
        });

      expect(response.status).to.equal(401);
      expect(response.body.error.message).to.equal(
        'Missing authorization token',
      );
    });

    it('should not create record if fields are empty', async () => {
      const response = await request(server)
        .post('/v1/employments/new')
        .send({
          title: '',
          employer: '',
          startDate: '',
          endDate: '',
          city: '',
          description: '',
        })
        .set({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'user-key': token,
        });

      expect(response.status).to.equal(400);
      const {
        body: { data },
      } = response;

      data.forEach(err => {
        Object.keys(err).forEach(key => {
          if (key === 'startDate' || key === 'endDate') {
            expect(err[key]).to.equal(
              `${key} should be in the format yyyy-mm-dd`,
            );
          } else {
            expect(err[key]).to.equal(`${key} field should not be empty`);
          }
        });
      });
    });

    it('should not create record if fields are not provided', async () => {
      const response = await request(server)
        .post('/v1/employments/new')
        .set({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'user-key': token,
        });

      expect(response.status).to.equal(400);
      const {
        body: { data },
      } = response;

      data.forEach(err => {
        Object.keys(err).forEach(key => {
          expect(err[key]).to.equal(`${key} is a required field`);
        });
      });
    });

    it('should validate endDate if provided', async () => {
      const response = await request(server)
        .post('/v1/employments/new')
        .send({
          title: 'Software developer',
          employer: 'andela',
          startDate: '2018-20-02',
          endDate: '',
          city: 'Nairobi',
          description: '',
        })
        .set({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'user-key': token,
        });

      expect(response.status).to.equal(400);
      const {
        body: {
          data: [endDate],
        },
      } = response;

      expect(endDate['endDate']).to.equal(
        `endDate should be in the format yyyy-mm-dd`,
      );
    });

    it('should check validity of token provided', async () => {
      const response = await request(server)
        .post('/v1/employments/new')
        .set({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'user-key':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6OCwiaWF0IjoxNTc2OTU5MjU0fQ.gJcA7TSRsBE6WulFnJKrPHYCGZ3MrX2aZrA9E_0RBAc',
        });

      expect(response.status).to.equal(401);
      const {
        body: {
          error: { message },
        },
      } = response;

      expect(message).to.equal('Invalid authorization token');
    });
  });
});
