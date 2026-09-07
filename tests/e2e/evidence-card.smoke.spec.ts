import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("kanıt kartı kaynak, gerekçe ve elenme kararını birlikte gösterir", async ({
  page,
}) => {
  const response = await page.goto("/evidence");

  expect(response?.ok()).toBe(true);
  await expect(page.locator("[data-status='REJECTED']")).toContainText(
    "Elendi",
  );
  await expect(page.getByText("archive.org")).toBeVisible();
  await expect(page.getByRole("link", { name: /kaynağı aç/i })).toHaveAttribute(
    "href",
    "https://archive.org/details/animationandcartoons",
  );

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
