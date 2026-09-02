import { defaultLocale, translate } from "@/lib/i18n/messages";

const repositoryUrl =
  "https://github.com/buzzicra/mekanizma-lost-media-detective";

export default function HomePage() {
  const t = (key: Parameters<typeof translate>[1]) =>
    translate(defaultLocale, key);

  return (
    <main className="shell">
      <div className="grain" aria-hidden="true" />
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">{t("home.eyebrow")}</p>
        <h1 id="page-title">{t("home.title")}</h1>
        <p className="lede">{t("home.description")}</p>
        <div className="status" role="status">
          <span aria-hidden="true" />
          {t("home.status")}
        </div>
      </section>

      <section className="tracks" aria-label="İlk ürün hatları">
        <article>
          <p className="track-number" aria-hidden="true">
            01
          </p>
          <h2>{t("home.evidence.title")}</h2>
          <p>{t("home.evidence.description")}</p>
        </article>
        <article>
          <p className="track-number" aria-hidden="true">
            02
          </p>
          <h2>{t("home.case.title")}</h2>
          <p>{t("home.case.description")}</p>
        </article>
      </section>

      <footer>
        <a href={repositoryUrl} rel="noreferrer" target="_blank">
          {t("home.github")}
          <span aria-hidden="true">↗</span>
        </a>
        <p>AGPL-3.0 · Topluluk tarafından geliştiriliyor.</p>
      </footer>
    </main>
  );
}
