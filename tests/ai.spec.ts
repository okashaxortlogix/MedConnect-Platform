import { test, expect } from '@playwright/test';

test.describe('AI Tools', () => {
  test('AI Chat interface loads', async ({ page }) => {
    await page.goto('/ai/chat');
    
    // Check if the chat input is present
    const input = page.locator('input[type="text"], textarea').first();
    await expect(input).toBeVisible({ timeout: 10000 });
  });

  test('AI Diagnosis interface loads', async ({ page }) => {
    await page.goto('/ai/diagnosis');
    
    // Look for form or input area
    const body = page.locator('body');
    await expect(body).toContainText('Diagnosis');
  });
});
