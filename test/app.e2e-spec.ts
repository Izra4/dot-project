// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/modules/users/users.service';

describe('Auth API (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleFixture.get<UsersService>(UsersService);

    app = moduleFixture.createNestApplication();
    await app.init();

    // await usersService.create('testuser', 'testemail','testpassword');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testemail', password: 'testpassword' })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('token');
      });
  });

  it('/auth/login (POST) - wrong credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testemail', password: 'wrongpassword' })
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('message', 'email / password invalid');
      });
  });

  it('/users/profile (GET) - need access token', () => {
    return request(app.getHttpServer())
      .get('/users/profile')
      .expect(401);
  });

  it('/users/profile (GET) - token is valid', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testemail', password: 'testpassword' });

    const token = loginResponse.body.token;

    return request(app.getHttpServer())
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('status', 200);
        expect(response.body).toHaveProperty('data');
        const userData = response.body.data;
        expect(userData).toHaveProperty('id');
        expect(userData).toHaveProperty('name', 'testuser');
        expect(userData).toHaveProperty('email', 'testemail');
        expect(userData).toHaveProperty('createdAt');
        expect(userData).toHaveProperty('updatedAt');
      });
  });
});
