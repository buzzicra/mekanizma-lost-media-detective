import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const CASE_FORM_ROUTE = "/cases/new";

test.describe("Vaka Formu E2E", () => {
  test("375 px mobilde taşma ve ciddi a11y ihlali yoktur", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const response = await page.goto(CASE_FORM_ROUTE);

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("boş submit hata özetini gösterir ve ilk invalid alana odaklanır", async ({
    page,
  }) => {
    await page.goto(CASE_FORM_ROUTE);
    await page.getByRole("button", { name: /gönder/i }).click();

    await expect(
      page.getByRole("heading", {
        name: "Formda düzeltmen gereken alanlar var",
      }),
    ).toBeVisible();
    await expect(page.getByLabel(/başlık/i)).toBeFocused();
  });

  test("form yalnız klavyeyle doldurulur ve typed çıktı üretir", async ({
    page,
  }) => {
    await page.goto(CASE_FORM_ROUTE);

    const title = page.getByLabel("Başlık", { exact: false });
    await title.focus();
    await page.keyboard.type("Çocukken izlediğim kayıp çizgi film");
    await page.keyboard.press("Tab");

    const mediaType = page.getByLabel("Medya türü", { exact: false });
    await expect(mediaType).toBeFocused();
    await mediaType.press("v");
    await expect(mediaType).toHaveValue("VIDEO");
    await page.keyboard.press("Tab");
    await page.keyboard.type("tr");
    await page.keyboard.press("Tab");
    await page.keyboard.type(
      "Mavi bir karakter eski bir televizyonda her sabah aynı şarkıyla maceraya başlıyordu.",
    );
    await page.keyboard.press("Tab");
    await page.keyboard.type("Televizyon");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.type("1998");
    await page.keyboard.press("Tab");
    await page.keyboard.type("2001");
    await page.keyboard.press("Tab");
    await page.keyboard.type("Yok");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("button", { name: /gönder/i })).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("heading", { name: "Form verisi geçerli" }),
    ).toBeVisible();
    await expect(page.getByText("1998–2001")).toBeVisible();
  });
});
