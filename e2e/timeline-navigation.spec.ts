import { test, expect } from '@playwright/test';

test.describe('Timeline Navigation', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Google Search');
  });

  test('should scroll to timeline section', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#timeline"]');
    await page.waitForTimeout(1000);
    const timelineSection = page.locator('#timeline');
    await expect(timelineSection).toBeVisible();
  });

  test('should filter milestones', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Show Filters');
    await page.click('input[type="checkbox"]');
    await page.waitForTimeout(500);
  });

  test('should search milestones', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder*="Search"]', 'algorithm');
    await page.waitForTimeout(500);
  });
});
