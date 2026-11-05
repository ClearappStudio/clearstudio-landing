import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import supportEn from "./Daylight-support-en.html?raw";
import supportEs from "./Daylight-support-es.html?raw";
import privacyEn from "./Daylight-privacy-en.html?raw";
import privacyEs from "./Daylight-privacy-es.html?raw";
import "./DaylightHelp.css";

export default function DaylightHelp({ page }: { page: "support" | "privacy" }) {
  const [search] = useSearchParams();
  const es = search.get("lang") === "es";
  const suffix = es ? "?lang=es" : "";
  const label = page === "support" ? (es ? "Soporte" : "Support") : (es ? "Privacidad" : "Privacy");
  const content = page === "support" ? (es ? supportEs : supportEn) : (es ? privacyEs : privacyEn);
  useEffect(() => {
    const previous = document.title;
    const previousLanguage = document.documentElement.lang;
    document.title = `${label} · Daylight by Clear Studio`;
    document.documentElement.lang = es ? "es" : "en";
    return () => { document.title = previous; document.documentElement.lang = previousLanguage; };
  }, [label, es]);
  return <article className="daylight-help" lang={es ? "es" : "en"}>
    <nav className="dh-nav" aria-label={es ? "Navegación de Daylight" : "Daylight navigation"}>
      <Link to="/projects/daylight">← Daylight</Link>
      <div>
        <Link to={`/projects/daylight/support${suffix}`} aria-current={page === "support" ? "page" : undefined}>{es ? "Soporte" : "Support"}</Link>
        <Link to={`/projects/daylight/privacy${suffix}`} aria-current={page === "privacy" ? "page" : undefined}>{es ? "Privacidad" : "Privacy"}</Link>
        <Link className="dh-language" to={`/projects/daylight/${page}${es ? "" : "?lang=es"}`} lang={es ? "en" : "es"}>{es ? "EN" : "ES"}</Link>
      </div>
    </nav>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </article>;
}
