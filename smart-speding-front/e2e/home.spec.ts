import { expect, test } from "@playwright/test";

test("landing loads and shows the hero headline", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/El Libro de Cuentas/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Anota cada peso/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Abrir mi libro/ }),
  ).toBeVisible();
});
