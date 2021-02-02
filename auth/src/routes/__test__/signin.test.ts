import request from 'supertest';
import { app } from '../../app';

it('fails when a email does not exist is supplied', async () => {
	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400);
});

it('fails when an incorrect password is supplied', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'wrong',
		})
		.expect(400);
});

it('responds with a cookie when gives valid credentials', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test1@test.com',
			password: 'password1',
        })
        .expect(201);  

	const response = await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test1@test.com',
			password: 'password1',
		})
		.expect(200);

	expect(response.get('Set-Cookie')).toBeDefined;
});
