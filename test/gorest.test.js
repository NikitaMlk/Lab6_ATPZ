const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.TOKEN;

describe('GoRest API Tests', function () {

    it('GET /users - отримати список користувачів', async function () {
        const { expect } = await import('chai');
        const response = await axios.get('https://gorest.co.in/public/v2/users', {
            headers: { Authorization: `742e2b3f3ada870f439ba9d4c4a63d5457ebd09561eb11ab71e318018c666828` }
        });
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
    });

    it('POST /users - додати нового користувача', async function () {
        const { expect } = await import('chai');
        const newUser = {
            name: 'John Doe',
            gender: 'male',
            email: `johndoe${Math.random()}@example.com`,
            status: 'active'
        };
    
        const response = await axios.post(`${API_URL}/users`, newUser, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
    
        expect(response.status).to.equal(201);
        expect(response.data).to.have.property('id');
    });

    it('PUT /users/:id - оновити користувача', async function () {
        const { expect } = await import('chai');
        
        // створюємо нового користувача щоб мати валідний ID
        const newUser = {
            name: 'John Doe',
            gender: 'male',
            email: `johndoe${Math.random()}@example.com`,
            status: 'active'
        };
    
        const createdUserResponse = await axios.post(`${API_URL}/users`, newUser, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
    
        const userId = createdUserResponse.data.id;
    
        const updatedUser = { name: 'John Updated' };
    
        const response = await axios.put(`${API_URL}/users/${userId}`, updatedUser, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
    
        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal('John Updated');
    });

    it('DELETE /users/:id - видалити користувача', async function () {
        const { expect } = await import('chai');
        
        const newUser = {
            name: 'John Doe',
            gender: 'male',
            email: `johndoe${Math.random()}@example.com`,
            status: 'active'
        };
    
        const createdUserResponse = await axios.post(`${API_URL}/users`, newUser, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
    
        const userId = createdUserResponse.data.id;
    
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
    
        expect(response.status).to.equal(204);
    });
});
