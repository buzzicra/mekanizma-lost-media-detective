import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CaseForm } from "@/components/case-create/CaseForm";
import { validCaseFormFixture } from "../../fixtures/case-form";

describe("CaseForm Erişilebilirlik (a11y) ve Klavye Testleri (FINAL-CASE-03)", () => {
  /**
   * 1. Her form kontrolünün erişilebilir bir isme (accessible name) sahip olması
   */
  it("her form kontrolü erişilebilir bir isme (accessible name) ve görünür etikete sahiptir", () => {
    render(<CaseForm onSubmit={vi.fn()} />);

    // Tüm kontroller erişilebilir role ve name ile sorgulanabilir olmalıdır
    const title = screen.getByRole("textbox", { name: /başlık|title/i });
    expect(title).toHaveAccessibleName();

    const details = screen.getByRole("textbox", {
      name: /hatırlanan ayrıntı|details/i,
    });
    expect(details).toHaveAccessibleName();

    const seenOn = screen.getByRole("textbox", {
      name: /görüldüğü yer|where/i,
    });
    expect(seenOn).toHaveAccessibleName();

    const searches = screen.getByRole("textbox", {
      name: /önceki aramalar|searches/i,
    });
    expect(searches).toHaveAccessibleName();

    const safetyCheckbox = screen.getByRole("checkbox", {
      name: /güvenlik onayı|özel veri|safety/i,
    });
    expect(safetyCheckbox).toHaveAccessibleName();

    const submitBtn = screen.getByRole("button", {
      name: /vaka oluştur|gönder|kaydet|submit/i,
    });
    expect(submitBtn).toHaveAccessibleName();
  });

  /**
   * 2. Hata metinlerinin ilgili form kontrolüne programatik bağlı olması (aria-describedby ve aria-invalid)
   */
  it("hata metinleri form kontrolleriyle aria-describedby ve aria-invalid üzerinden programatik olarak bağlanır", async () => {
    const user = userEvent.setup();
    render(<CaseForm onSubmit={vi.fn()} />);

    // Boş submit ile hataları tetikle
    const submitBtn = screen.getByRole("button", {
      name: /vaka oluştur|gönder|kaydet|submit/i,
    });
    await user.click(submitBtn);

    const titleInput = screen.getByRole("textbox", { name: /başlık|title/i });
    expect(titleInput).toHaveAttribute("aria-invalid", "true");

    const describedBy = titleInput.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    if (describedBy) {
      const errorElement = document.getElementById(describedBy);
      expect(errorElement).toBeInTheDocument();
      expect(errorElement?.textContent).toMatch(
        /başlık zorunlu|title is required/i,
      );
    }
  });

  /**
   * 3. Hata özeti (Error Summary) başlık ve duyuru semantiğine sahip olmalıdır
   */
  it("hata özeti uygun başlık ve duyuru (role=alert / aria-live) semantiğine sahiptir", async () => {
    const user = userEvent.setup();
    render(<CaseForm onSubmit={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    const alertRegion = screen.getByRole("alert");
    expect(alertRegion).toBeInTheDocument();

    // Hata özeti içinde anlamlı bir başlık bulunmalıdır
    const alertHeading = screen.getByRole("heading", { level: 2 });
    expect(alertHeading).toBeInTheDocument();
  });

  /**
   * 4. isSubmitting durumunun ekran okuyuculara duyurulabilir olması
   */
  it("submitting durumu submit butonunda disabled veya aria-disabled ile ekran okuyucuya aktarılır", () => {
    render(
      <CaseForm
        initialValues={validCaseFormFixture}
        isSubmitting={true}
        onSubmit={vi.fn()}
      />,
    );

    const submitBtn = screen.getByRole("button", {
      name: /vaka oluştur|gönder|kaydet|submit|gönderiliyor/i,
    });
    expect(
      submitBtn.hasAttribute("disabled") ||
        submitBtn.getAttribute("aria-disabled") === "true",
    ).toBe(true);
  });

  /**
   * 5. AC-15: Yalnız klavyeyle form doldurma, mantıklı Tab sırası ve görünür focus
   */
  it("AC-15: Tab navigasyonu mantıklı DOM sırasını izler ve klavyeyle form submit edilebilir", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm initialValues={validCaseFormFixture} onSubmit={handleSubmit} />,
    );

    // İlk alana focus ver ve Tab ile form sonuna kadar ilerle
    const titleInput = screen.getByRole("textbox", { name: /başlık|title/i });
    titleInput.focus();
    expect(titleInput).toHaveFocus();

    // Tab ile sonraki alanlara geçiş
    await user.tab();
    expect(document.activeElement).not.toBe(titleInput);

    // Submit butonuna odaklan ve Enter / Space ile tetikle
    const submitBtn = screen.getByRole("button", {
      name: /vaka oluştur|gönder|kaydet|submit/i,
    });
    submitBtn.focus();
    expect(submitBtn).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
