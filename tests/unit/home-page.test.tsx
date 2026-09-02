import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("ürün amacını ve iki ilk ürün hattını açıklar", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Kayıp bir içeriği birlikte bulmanın yolu.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Kanıt kartı" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Vaka formu" }),
    ).toBeInTheDocument();
  });

  it("GitHub reposuna güvenli yeni sekme bağlantısı verir", () => {
    render(<HomePage />);

    const repositoryLink = screen.getByRole("link", {
      name: /Projeyi GitHub'da incele/,
    });

    expect(repositoryLink).toHaveAttribute(
      "href",
      "https://github.com/buzzicra/mekanizma-lost-media-detective",
    );
    expect(repositoryLink).toHaveAttribute("target", "_blank");
    expect(repositoryLink).toHaveAttribute("rel", "noreferrer");
  });
});
