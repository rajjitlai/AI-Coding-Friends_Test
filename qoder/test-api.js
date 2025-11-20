const axios = require('axios');

async function testAPI() {
  const baseURL = 'http://localhost:5000';
  
  try {
    // Test registration
    console.log('Testing registration...');
    const registerResponse = await axios.post(`${baseURL}/register`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Registration response:', registerResponse.data);
    
    const token = registerResponse.data.token;
    
    // Test login
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${baseURL}/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Login response:', loginResponse.data);
    
    // Test me endpoint
    console.log('\nTesting me endpoint...');
    const meResponse = await axios.get(`${baseURL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Me response:', meResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testAPI();