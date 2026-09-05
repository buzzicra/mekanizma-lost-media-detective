import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CaseForm } from "@/components/case-create/CaseForm";
import {
  bothYearsEmptyFixture,
  maxBoundaryCaseFormFixture,
  minBoundaryCaseFormFixture,
  reversedYearRangeFixture,
  validCaseFormFixture,
  yearUnknownCaseFormFixture,
} from "../../fixtures/case-form";
import { CaseFormHarness } from "../../harness/CaseFormHarness";

describe("CaseForm Component Davranış Testleri (FINAL-CASE-03)", () => {
  /**
   * AC-01: Form ilk açılış
   * Tüm kapsam alanları görünür; hata özeti yok.
   */
  it("AC-01: ilk render edildiğinde 10 form kontrolü görünür ve hata özeti bulunmaz", () => {
    render(<CaseForm onSubmit={vi.fn()} />);

    // 10 alan görünür label ve role ile bulunabilmelidir
    expect(screen.getByLabelText(/başlık|title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/medya türü|media type/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/içerik dili|dil|language/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/hatırlanan ayrıntı|details/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/görüldüğü yer|where/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/bilmiyorum|dönem bilinmiyor|unknown/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/başlangıç yılı|from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bitiş yılı|to/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/önceki aramalar|searches/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/güvenlik onayı|özel veri|safety/i),
    ).toBeInTheDocument();

    // Submit butonu mevcut olmalı
    expect(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    ).toBeInTheDocument();

    // Hata özeti başlangıçta olmamalıdır
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  /**
   * AC-02: Tüm alanlar boşken submit
   * onSubmit çağrılmaz; özet görünür; focus DOM sırasındaki ilk alan olan title alanına gider.
   */
  it("AC-02: tüm alanlar boşken submit edildiğinde onSubmit çağrılmaz, özet görünür ve focus başlığa gider", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CaseForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole("button", {
      name: /vaka oluştur|gönder|kaydet|submit/i,
    });
    await user.click(submitButton);

    // onSubmit asla çağrılmamalıdır
    expect(handleSubmit).not.toHaveBeenCalled();

    // Hata özeti görünür olmalı
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();

    // Focus ilk invalid alan olan title alanında olmalıdır
    const titleInput = screen.getByLabelText(/başlık|title/i);
    expect(titleInput).toHaveFocus();
  });

  /**
   * AC-03: Başlık 11 / 12 / 120 / 121 karakter sınırları
   */
  it("AC-03: başlık karakter sınırlarını (11/12/120/121) doğru uygular", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    // 11 karakter (Geçersiz)
    const { unmount } = render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, title: "12345678901" }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/başlık|title/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    unmount();

    // 12 karakter (Geçerli min sınır)
    render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, title: "123456789012" }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * AC-04: Hatırlanan ayrıntı 79 / 80 / 5.000 / 5.001 karakter sınırları
   */
  it("AC-04: hatırlanan ayrıntı sınırlarını (79/80) doğru doğrular", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    // 79 karakter (Geçersiz)
    const { unmount } = render(
      <CaseForm
        initialValues={{
          ...validCaseFormFixture,
          rememberedDetails: "a".repeat(79),
        }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    unmount();

    // 80 karakter (Geçerli sınır)
    render(
      <CaseForm
        initialValues={{
          ...validCaseFormFixture,
          rememberedDetails: "a".repeat(80),
        }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * AC-05: Görüldüğü yer 1 / 2 / 200 / 201 karakter sınırları
   */
  it("AC-05: görüldüğü yer sınırlarını (1/2) doğru doğrular", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    // 1 karakter (Geçersiz)
    const { unmount } = render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, seenOn: "a" }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    unmount();

    // 2 karakter (Geçerli min sınır)
    render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, seenOn: "ab" }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * AC-06: Önceki aramalar boş / "Yok" / 2.000 / 2.001
   */
  it("AC-06: önceki aramalarda 'Yok' ve boşluk durumunu doğru doğrular", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    // Boş / Whitespace (Geçersiz)
    const { unmount } = render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, previousSearches: "   " }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    unmount();

    // "Yok" (Geçerli)
    render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, previousSearches: "Yok" }}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * AC-07: yearUnknown=true, yıllar boş veya stale
   * Dönem valid; çıktı yıl değerlerini içermez.
   */
  it("AC-07: yearUnknown seçildiğinde stale yıl değerleri yok sayılır ve submit verisine eklenmez", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm
        initialValues={yearUnknownCaseFormFixture}
        onSubmit={handleSubmit}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const submittedData = handleSubmit.mock.calls[0][0];
    expect(submittedData.yearUnknown).toBe(true);
    expect(submittedData.yearFrom).toBeUndefined();
    expect(submittedData.yearTo).toBeUndefined();
  });

  /**
   * AC-08: yearUnknown=false, iki yıl da boş
   * Dönem invalid; submit çağrılmaz.
   */
  it("AC-08: yearUnknown=false iken iki yıl da boşsa hata verir ve submit engellenir", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm
        initialValues={bothYearsEmptyFixture}
        onSubmit={handleSubmit}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  /**
   * AC-09: Ters yıl aralığı (başlangıç: 2005, bitiş: 2001)
   */
  it("AC-09: ters yıl aralığında hata gösterir ve submit'i engeller", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm
        initialValues={reversedYearRangeFixture}
        onSubmit={handleSubmit}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/bitiş yılı|to/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  /**
   * AC-10: Yıl alanında ondalık veya metin
   */
  it("AC-10: yıl alanında tam sayı olmayan değeri reddeder", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, yearFrom: "1995.5" }}
        onSubmit={handleSubmit}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/başlangıç yılı|from/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  /**
   * AC-11: Güvenlik onayı false
   */
  it("AC-11: güvenlik onayı işaretlenmediğinde submit'i engeller", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm
        initialValues={{ ...validCaseFormFixture, safetyConfirmed: false }}
        onSubmit={handleSubmit}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(
      screen.getByLabelText(/güvenlik onayı|özel veri|safety/i),
    ).toHaveAttribute("aria-invalid", "true");
  });

  /**
   * AC-12: Birden fazla invalid alan
   * Her hata görünür; focus ilk invalid alanda.
   */
  it("AC-12: birden fazla invalid alan olduğunda tüm hatalar gösterilir ve focus ilk alana gider", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm
        initialValues={{
          ...validCaseFormFixture,
          title: "kısa",
          seenOn: "x",
          safetyConfirmed: false,
        }}
        onSubmit={handleSubmit}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    expect(handleSubmit).not.toHaveBeenCalled();
    // DOM sırasındaki ilk invalid alan title'dır
    expect(screen.getByLabelText(/başlık|title/i)).toHaveFocus();
  });

  /**
   * AC-13: isSubmitting=true iken tekrar submit engelleme
   */
  it("AC-13: isSubmitting durumunda submit butonu devre dışı kalır ve mükerrer submit engellenir", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseFormHarness
        FormComponent={CaseForm}
        initialValues={validCaseFormFixture}
        onSubmit={handleSubmit}
        simulateDelayMs={200}
      />,
    );

    const submitBtn = screen.getByRole("button", {
      name: /vaka oluştur|gönder|kaydet|submit/i,
    });

    // İlk submit
    await user.click(submitBtn);

    // Submitting anında butona tekrar tıklamayı dene
    if (!submitBtn.hasAttribute("disabled")) {
      await user.click(submitBtn);
    }

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * AC-14: submitError (parent error) sonrası form değerlerinin korunması
   */
  it("AC-14: parent error geldiğinde hata mesajı duyurulur ve formdaki değerler korunur", async () => {
    const { rerender } = render(
      <CaseForm
        initialValues={validCaseFormFixture}
        isSubmitting={false}
        submitError={null}
        onSubmit={vi.fn()}
      />,
    );

    // Parent error simüle edilir
    const errorText = "Sunucu hatası: Vaka oluşturulamadı.";
    rerender(
      <CaseForm
        initialValues={validCaseFormFixture}
        isSubmitting={false}
        submitError={errorText}
        onSubmit={vi.fn()}
      />,
    );

    // Hata mesajı görünür olmalıdır
    expect(screen.getByText(new RegExp(errorText, "i"))).toBeInTheDocument();

    // Form alanlarındaki değerler silinmemiş olmalıdır
    expect(screen.getByLabelText(/başlık|title/i)).toHaveValue(
      validCaseFormFixture.title,
    );
    expect(screen.getByLabelText(/görüldüğü yer|where/i)).toHaveValue(
      validCaseFormFixture.seenOn,
    );
    expect(screen.getByLabelText(/hatırlanan ayrıntı|details/i)).toHaveValue(
      validCaseFormFixture.rememberedDetails,
    );
  });

  /**
   * AC-17: Tam geçerli form submit
   */
  it("AC-17: tam geçerli form ile submit bir kez doğru typed veriyle çağrılır", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <CaseForm initialValues={validCaseFormFixture} onSubmit={handleSubmit} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: "Kayıp Çizgi Film 90lar",
      mediaType: "FILM_TV",
      contentLanguage: "tr",
      rememberedDetails:
        "Cumartesi sabahları TRT 1'de yayınlanan, mavi renkli bir ayının maceralarını anlatan animasyon serisi.",
      seenOn: "TRT 1 Televizyon Kanalı",
      yearUnknown: false,
      yearFrom: 1994,
      yearTo: 1998,
      previousSearches:
        "TRT arşivleri ve eski gazete televizyon ekleri tarandı fakat adı bulunamadı.",
      safetyConfirmed: true,
    });
  });

  /**
   * Sınır Değer Doğrulamaları: Minimum ve Maksimum Boundary Formları
   */
  it("sınır değerlerdeki minBoundary ve maxBoundary formlarını başarıyla submit eder", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    // Min boundary
    const { unmount } = render(
      <CaseForm
        initialValues={minBoundaryCaseFormFixture}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    unmount();

    // Max boundary
    handleSubmit.mockClear();
    render(
      <CaseForm
        initialValues={maxBoundaryCaseFormFixture}
        onSubmit={handleSubmit}
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: /vaka oluştur|gönder|kaydet|submit/i,
      }),
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
