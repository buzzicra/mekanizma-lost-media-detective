import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("ana sayfa ürün amacını ve geliştirme durumunu gösterir", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Kayıp bir içeriği birlikte bulmanın yolu.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "İlk dikey dilim hazırlanıyor",
  );
  await expect(
    page.getByRole("heading", { name: "Kanıt kartı" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vaka formu" })).toBeVisible();
});

test("ana sayfada ciddi erişilebilirlik ihlali ve yatay taşma yoktur", async ({
  page,
}) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
