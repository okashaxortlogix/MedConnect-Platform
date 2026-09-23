import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ request }) => {
  // We use the request context directly to register and login so we don't depend on UI flakiness for setup.
  const email = 'playwright@test.com';
  const password = 'password123';

  // 1. Attempt to register the dummy user (it's fine if it fails because it already exists)
  await request.post('/api/register', {
    data: {
      fullName: 'Test Doctor',
      email: email,
      password: password,
      phoneNumber: '0000000000',
      pmdcNumber: '00000-A'
    }
  });

  // 2. Login as the dummy user
  const response = await request.post('/api/login', {
    data: {
      email: email,
      password: password
    }
  });

  // Ensure login was successful
  expect(response.ok()).toBeTruthy();

  // 3. Save the auth state
  await request.storageState({ path: authFile });
});
