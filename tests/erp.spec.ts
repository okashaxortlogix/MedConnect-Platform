import { test, expect } from '@playwright/test';

test.describe('Hospital ERP', () => {
  test('ERP Dashboard loads', async ({ page }) => {
    await page.goto('/erp');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Patients portal loads', async ({ page }) => {
    await page.goto('/patients');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
