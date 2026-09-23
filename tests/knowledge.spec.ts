import { test, expect } from '@playwright/test';

test.describe('Knowledge Hub', () => {
  
  test('Guidelines page loads and has items', async ({ page }) => {
    await page.goto('/guidelines');
    
    // Check for standard grid items (usually lists are inside grids or flex)
    // We look for links that route to a specific guideline ID
    const guidelineLinks = page.locator('a[href^="/guidelines/"]');
    
    // Ensure there's at least one guideline link
    await expect(guidelineLinks.first()).toBeVisible({ timeout: 10000 });
  });

  test('Lab Values page loads properly', async ({ page }) => {
    await page.goto('/knowledge/labs');
    
    // Look for the unified select dropdown we added earlier
    const selectDropdown = page.locator('select').first();
    await expect(selectDropdown).toBeVisible();

    // Look for the search input
    const searchInput = page.locator('input[type="text"]').first();
    await expect(searchInput).toBeVisible();
  });

  test('Diagnostic Workups page loads properly', async ({ page }) => {
    await page.goto('/knowledge/workups');
    
    // The page should have a search input
    const searchInput = page.locator('input[type="text"]').first();
    await expect(searchInput).toBeVisible();
  });
});
