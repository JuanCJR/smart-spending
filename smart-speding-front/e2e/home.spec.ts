import { expect, test } from "@playwright/test";

test("home page loads and shows the app title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Smart Spending/);
  await expect(
    page.getByRole("heading", { name: "Smart Spending" }),
  ).toBeAttached();
});
