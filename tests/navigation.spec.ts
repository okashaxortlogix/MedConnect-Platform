import { test, expect } from '@playwright/test';

test.describe('Global Navigation Health Checks', () => {
  const routes = [
    '/login',
    '/register',
    '/forgot-password',
    '/knowledge',
    '/knowledge/labs',
    '/knowledge/workups',
    '/guidelines'
  ];

  for (const route of routes) {
    test(`Route ${route} should load successfully without server errors`, async ({ page }) => {
      const response = await page.goto(route);
      
      // Ensure we got a valid response (not null)
      expect(response).not.toBeNull();
      
      // Verify status code is not a server error (500+) or not found (404)
      if (response) {
        expect(response.status()).toBeLessThan(400);
      }
      
      // Ensure the page actually has some content in the body
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });
  }
});
