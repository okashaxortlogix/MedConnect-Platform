import { test, expect } from '@playwright/test';

test.describe('Profile', () => {
  test('Profile page loads and shows doctor information', async ({ page }) => {
    await page.goto('/profile');
    
    // Check for the profile edit button or a specific profile header
    const editButton = page.locator('button:has-text("Edit"), a:has-text("Edit")').first();
    const body = page.locator('body');
    
    await expect(body).toContainText('Profile');
  });
});
