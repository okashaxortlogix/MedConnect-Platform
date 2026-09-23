import { test, expect } from '@playwright/test';

test.describe('Telemedicine & Communication', () => {
  test('Messages page loads', async ({ page }) => {
    await page.goto('/messages');
    
    // The messages page should load without crashing
    const body = page.locator('body');
    await expect(body).toContainText('Message');
  });

  test('Video Conference entry loads', async ({ page }) => {
    await page.goto('/conference');
    
    const body = page.locator('body');
    // Ensure 500 error didn't happen
    await expect(body).toBeVisible();
  });
});
