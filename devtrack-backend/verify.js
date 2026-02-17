const http = require('http');

const API_URL = 'http://localhost:5000';

async function request(method, path, data = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function verify() {
    console.log('--- STARTING VERIFICATION ---');

    // 1. Health Check
    try {
        const health = await request('GET', '/health');
        console.log('✅ Health Check:', health.data.status === 'OK' ? 'PASSED' : 'FAILED');
    } catch (e) {
        console.log('❌ Health Check FAILED (Server not running?)');
        return;
    }

    // 2. User Registration
    const testUser = {
        name: 'Test User',
        email: `test_${Date.now()}@example.com`,
        password: 'password123'
    };
    const reg = await request('POST', '/api/users/register', testUser);
    console.log('✅ User Registration:', reg.status === 201 ? 'PASSED' : 'FAILED', reg.data);

    // 3. User Login
    const login = await request('POST', '/api/users/login', { email: testUser.email, password: testUser.password });
    if (login.status === 200 && login.data.token) {
        console.log('✅ User Login: PASSED');
        const token = login.data.token;

        // 4. Fetch Topics
        const topics = await request('GET', '/api/topics', null, token);
        console.log('✅ Fetch Topics:', topics.status === 200 ? 'PASSED' : 'FAILED', `(Found ${topics.data.length} topics)`);

        // 5. Fetch Habits
        const habits = await request('GET', '/api/habits', null, token);
        console.log('✅ Fetch Habits:', habits.status === 200 ? 'PASSED' : 'FAILED', `(Found ${habits.data.length} habits)`);

    } else {
        console.log('❌ User Login: FAILED', login.data);
    }

    console.log('--- VERIFICATION COMPLETE ---');
}

verify();
