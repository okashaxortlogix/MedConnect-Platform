import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  // Opt out of global setup's logged-in state so we can actually see the login page
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Login page has required inputs', async ({ page }) => {
    await page.goto('/login');
    
    // Check for email and password inputs generically
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const submitButton = page.locator('button').filter({ hasText: 'Login' }).first();

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('Register page has required inputs', async ({ page }) => {
    await page.goto('/register');
    
    // Check for basic fields that should be on registration
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const submitButton = page.locator('button').filter({ hasText: 'Create Account' }).first();

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });
});
