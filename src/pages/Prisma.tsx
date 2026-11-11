import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, LockKeyhole, Sparkles, Layers3 } from "lucide-react";
import "./Prisma.css";

type Language = "en" | "es";

const dictionary = {
  en: {
    back: "All projects", switchLanguage: "Language", coming: "Coming soon · iPad",
    eyebrow: "CLEAR STUDIO / INTRODUCING PRISMA", titleOne: "Give your money", titleTwo: "a clearer shape.",
    heroDesc: "Not another place to check your balance. A considered space to understand your finances, shape your budget, and decide what comes next.",
    heroTag: "Personal finance, with perspective", scroll: "Discover the idea",
    statementKicker: "01 / THE IDEA", statementA: "Numbers tell you", statementB: "what happened.", statementC: "Clarity helps you decide", statementD: "what happens next.",
    statementDesc: "Between bank statements, spreadsheets, and the plans in your head, the whole picture can get lost. PRISMA brings it back into focus.",
    methodKicker: "02 / THE EXPERIENCE", methodTitle: "A place for every part of the picture.",
    steps: [
      { number: "01", title: "Understand", description: "See your accounts, movements and monthly position together. Review what needs attention, without losing sight of the whole." },
      { number: "02", title: "Plan", description: "Build a budget around real life. Twelve months, categories that make sense to you, and room for months that don't go to plan." },
      { number: "03", title: "Choose", description: "Give the money that's left a purpose. Allocate it to savings funds, close the month with intention, and move forward." }
    ],
    interactiveKicker: "03 / A DIFFERENT VIEW", interactiveTitle: "A living picture. Not a static spreadsheet.",
    interactiveDesc: "Explore a conceptual view of PRISMA's monthly rhythm. Every month has its own story.",
    demoLabel: "INTERACTIVE CONCEPT · SAMPLE DATA", demoView: "Monthly perspective", demoIncome: "Income", demoExpenses: "Expenses", demoResult: "Monthly result", demoSaved: "Allocated to savings", demoCategories: "Where the money goes", demoCategoryNames: ["Home", "Groceries", "Family", "Everyday"], demoNote: "Illustrative interface — real PRISMA screenshots coming soon.",
    months: ["October", "November", "December"], 
    principlesKicker: "04 / THE PRINCIPLES", principlesTitle: "Thoughtful by design.", principles: [
      { title: "Your rules.", desc: "Choose your categories, base currency, and how you plan. Your finances shouldn't have to fit someone else's template." },
      { title: "A little less admin.", desc: "Bring in CSV statements, review transactions, and let learned rules help make repeated work lighter." },
      { title: "Privacy at the center.", desc: "Designed for local storage. No mandatory bank connection. Password-encrypted backup exports for added control." }
    ],
    closingEyebrow: "NEXT / PRISMA FOR IPAD", closingOne: "A little more clarity.", closingTwo: "A lot more possibility.",
    closingDesc: "PRISMA is taking shape. We're refining the experience before opening it up to everyone.",
    soon: "Coming soon", finalNote: "Made with intention by Clear Studio.", noRelease: "No launch date announced yet.",
    home: "Clear Studio home"
  },
  es: {
    back: "Todos los proyectos", switchLanguage: "Idioma", coming: "Próximamente · iPad",
    eyebrow: "CLEAR STUDIO / PRESENTAMOS PRISMA", titleOne: "Dale a tu dinero", titleTwo: "una forma más clara.",
    heroDesc: "No es otro lugar donde consultar tu saldo. Es un espacio pensado para entender tus finanzas, dar forma a tu presupuesto y decidir qué viene después.",
    heroTag: "Finanzas personales, con perspectiva", scroll: "Descubre la idea",
    statementKicker: "01 / LA IDEA", statementA: "Los números te cuentan", statementB: "qué ha pasado.", statementC: "La claridad te ayuda a decidir", statementD: "qué viene después.",
    statementDesc: "Entre extractos bancarios, hojas de cálculo y planes que solo tienes en la cabeza, es fácil perder la visión de conjunto. PRISMA te ayuda a recuperarla.",
    methodKicker: "02 / LA EXPERIENCIA", methodTitle: "Cada pieza, en su sitio.",
    steps: [
      { number: "01", title: "Entiende", description: "Reúne cuentas, movimientos y resultado mensual. Revisa lo que necesita atención sin perder de vista el conjunto." },
      { number: "02", title: "Planifica", description: "Construye un presupuesto para la vida real: doce meses, categorías a tu medida y espacio para los meses que no salen según lo previsto." },
      { number: "03", title: "Decide", description: "Da un propósito al dinero disponible. Repártelo entre fondos de ahorro y cierra cada mes con intención." }
    ],
    interactiveKicker: "03 / OTRA PERSPECTIVA", interactiveTitle: "Un presupuesto vivo. No una hoja inmóvil.",
    interactiveDesc: "Explora una representación conceptual del ritmo mensual de PRISMA. Cada mes tiene su propia historia.",
    demoLabel: "CONCEPTO INTERACTIVO · DATOS DE EJEMPLO", demoView: "Perspectiva mensual", demoIncome: "Ingresos", demoExpenses: "Gastos", demoResult: "Resultado del mes", demoSaved: "Asignado al ahorro", demoCategories: "En qué se va el dinero", demoCategoryNames: ["Hogar", "Alimentación", "Familia", "Día a día"], demoNote: "Interfaz ilustrativa: próximamente incorporaremos capturas reales de PRISMA.",
    months: ["Octubre", "Noviembre", "Diciembre"],
    principlesKicker: "04 / LOS PRINCIPIOS", principlesTitle: "Cada detalle importa.", principles: [
      { title: "Tus reglas.", desc: "Elige categorías, moneda principal y manera de planificar. Tus finanzas no tienen por qué encajar en la plantilla de otra persona." },
      { title: "Menos trabajo repetido.", desc: "Importa extractos CSV, revisa movimientos y utiliza reglas aprendidas para simplificar la clasificación." },
      { title: "Privacidad en el centro.", desc: "Almacenamiento local, sin conexión bancaria obligatoria y exportaciones de copias cifradas con contraseña." }
    ],
    closingEyebrow: "PRÓXIMAMENTE / PRISMA PARA IPAD", closingOne: "Un poco más de claridad.", closingTwo: "Mucho más por decidir.",
    closingDesc: "PRISMA está tomando forma. Estamos perfeccionando la experiencia antes de abrirla a todo el mundo.",
    soon: "Próximamente", finalNote: "Creado con intención por Clear Studio.", noRelease: "Todavía no hay fecha de lanzamiento anunciada.",
    home: "Inicio de Clear Studio"
  }
};

const sampleMonths = [
  { income: 4820, expenses: 4210, saving: 390, bars: [74, 57, 46, 32] },
  { income: 4260, expenses: 4490, saving: -230, bars: [81, 60, 48, 33] },
  { income: 7450, expenses: 4730, saving: 1820, bars: [71, 55, 51, 30] }
];

const formatMoney = (n: number, lang: Language) =>
  new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0
  }).format(n);

export default function Prisma() {
  const [lang, setLang] = useState<Language>("en");
  const [month, setMonth] = useState(1);
  const t = dictionary[lang];
  const sample = sampleMonths[month];
  useEffect(() => {
    const prevTitle = document.title;
    const prevLang = document.documentElement.lang;
    document.title = "PRISMA by Clear Studio — " + (lang === "en" ? "A clearer perspective on money" : "Tu dinero, con más claridad");
    document.documentElement.lang = lang;
    return () => {
      document.title = prevTitle;
      document.documentElement.lang = prevLang;
    };
  }, [lang]);

  return (
    <article className="prisma-landing">
      <div className="prisma-ambient" aria-hidden="true" />
      <header className="prisma-topbar">
        <Link to="/" className="prisma-studio-link" aria-label={t.home}>CLEAR <span>STUDIO.</span></Link>
        <div className="prisma-top-actions">
          <Link className="prisma-back" to="/projects"><ArrowLeft size={14} /> {t.back}</Link>
          <div className="prisma-languages" role="group" aria-label={t.switchLanguage}>
            <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} className={lang === "en" ? "selected" : ""}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={() => setLang("es")} aria-pressed={lang === "es"} className={lang === "es" ? "selected" : ""}>ES</button>
          </div>
        </div>
      </header>

      <section className="prisma-hero" aria-labelledby="prisma-hero-title">
        <div className="prisma-hero-text">
          <p className="prisma-eyebrow">{t.eyebrow}</p>
          <h1 id="prisma-hero-title">{t.titleOne}<br/><em>{t.titleTwo}</em></h1>
          <p className="prisma-hero-description">{t.heroDesc}</p>
          <div className="prisma-hero-meta">
            <span className="prisma-availability"><span className="prisma-pulse" aria-hidden="true" />{t.coming}</span>
            <span className="prisma-hero-small">{t.heroTag}</span>
          </div>
        </div>
        <div className="prisma-hero-art" aria-label="PRISMA visual identity">
          <div className="prisma-orbit prisma-orbit-one" aria-hidden="true" />
          <div className="prisma-orbit prisma-orbit-two" aria-hidden="true" />
          <div className="prisma-light-ray prisma-ray-one" aria-hidden="true" />
          <div className="prisma-light-ray prisma-ray-two" aria-hidden="true" />
          <div className="prisma-light-ray prisma-ray-three" aria-hidden="true" />
          <div className="prisma-logo-glow" aria-hidden="true" />
          <img className="prisma-icon-large" src="/assets/prisma/app-icon.webp" alt="PRISMA — white diamond on a violet and blue gradient" width="512" height="512" fetchPriority="high" />
          <div className="prisma-art-label" aria-hidden="true">P R I S M A <span> / 001</span></div>
        </div>
        <a className="prisma-scroll-prompt" href="#prisma-idea">{t.scroll}<ArrowDownRight size={18}/></a>
      </section>

      <section className="prisma-statement prisma-space" id="prisma-idea" aria-labelledby="prisma-statement-title">
        <p className="prisma-eyebrow">{t.statementKicker}</p>
        <div className="prisma-statement-grid">
          <h2 id="prisma-statement-title">{t.statementA}<br/><span>{t.statementB}</span><br/>{t.statementC}<br/><strong>{t.statementD}</strong></h2>
          <p>{t.statementDesc}</p>
        </div>
        <div className="prisma-statement-horizon" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
      </section>

      <section className="prisma-process prisma-space" aria-labelledby="prisma-process-title">
        <div className="prisma-section-heading">
          <p className="prisma-eyebrow">{t.methodKicker}</p>
          <h2 id="prisma-process-title">{t.methodTitle}</h2>
        </div>
        <div className="prisma-process-grid">
          {t.steps.map((step, i) => (
            <div className="prisma-process-card" key={step.number}>
              <div className="prisma-step-art" aria-hidden="true">
                {i === 0 ? <div className="prisma-step-threads"><span/><span/><span/><span/></div> :
                  i === 1 ? <div className="prisma-step-columns"><span/><span/><span/><span/><span/><span/></div> :
                  <div className="prisma-step-circles"><span/><span/><span/></div>}
              </div>
              <p className="prisma-step-number">{step.number} / 03</p>
              <h3>{step.title}</h3>
              <p className="prisma-step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="prisma-interactive prisma-space" aria-labelledby="prisma-interactive-title">
        <div className="prisma-section-heading">
          <p className="prisma-eyebrow">{t.interactiveKicker}</p>
          <h2 id="prisma-interactive-title">{t.interactiveTitle}</h2>
          <p className="prisma-intro">{t.interactiveDesc}</p>
        </div>
        <div className="prisma-demo-layout">
          <div className="prisma-demo-aside">
            <div className="prisma-demo-aside-mark"><img src="/assets/prisma/app-icon.webp" width="52" height="52" alt="" /><span>PRISMA</span></div>
            <p>{t.demoLabel}</p>
            <div className="prisma-demo-aside-line" aria-hidden="true"><span/><span/><span/></div>
            <span className="prisma-demo-aside-foot">{t.demoNote}</span>
          </div>
          <div className="prisma-demo" aria-label={t.demoLabel}>
            <div className="prisma-demo-header">
              <div className="prisma-demo-identity"><span className="prisma-demo-gem" aria-hidden="true" /><strong>PRISMA</strong><small>BY CLEAR STUDIO</small></div>
              <span className="prisma-demo-caption">{t.demoView}</span>
            </div>
            <div className="prisma-demo-main">
              <div className="prisma-demo-month">
                <button type="button" aria-label={lang === "en" ? "Previous month" : "Mes anterior"} onClick={() => setMonth((month + 2) % 3)}><ChevronLeft size={20} /></button>
                <h3 aria-live="polite">{t.months[month]} 2026</h3>
                <button type="button" aria-label={lang === "en" ? "Next month" : "Mes siguiente"} onClick={() => setMonth((month + 1) % 3)}><ChevronRight size={20}/></button>
              </div>
              <div className="prisma-demo-result">
                <div><span>{t.demoResult}</span><strong key={month}>{formatMoney(sample.income - sample.expenses, lang)}</strong></div>
                <div className="prisma-demo-result-glimmer" aria-hidden="true"/>
              </div>
              <div className="prisma-demo-stats">
                <div><span>{t.demoIncome}</span><strong>{formatMoney(sample.income, lang)}</strong></div>
                <div><span>{t.demoExpenses}</span><strong>{formatMoney(sample.expenses, lang)}</strong></div>
                <div><span>{t.demoSaved}</span><strong>{formatMoney(sample.saving, lang)}</strong></div>
              </div>
              <div className="prisma-demo-breakdown">
                <p>{t.demoCategories}</p>
                {t.demoCategoryNames.map((category, i) => (
                  <div className="prisma-demo-bar-row" key={category}>
                    <span>{category}</span>
                    <div className="prisma-demo-track"><i style={{width:sample.bars[i] + "%"}}/></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="prisma-principles prisma-space" aria-labelledby="prisma-principles-title">
        <p className="prisma-eyebrow">{t.principlesKicker}</p>
        <div className="prisma-principles-grid">
          <h2 id="prisma-principles-title">{t.principlesTitle}</h2>
          <div className="prisma-principles-list">
            {t.principles.map((p, i) => (
              <div className="prisma-principle" key={p.title}>
                <div className="prisma-principle-icon">{i===0?<Layers3 size={22}/>:i===1?<Sparkles size={22}/>:<LockKeyhole size={22}/>}</div>
                <div><h3>{p.title}</h3><p>{p.desc}</p></div>
                <span>0{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="prisma-finale prisma-space" aria-labelledby="prisma-finale-title">
        <div className="prisma-finale-halo" aria-hidden="true"/>
        <p className="prisma-eyebrow">{t.closingEyebrow}</p>
        <img src="/assets/prisma/app-icon.webp" alt="" width="100" height="100" className="prisma-finale-icon" loading="lazy"/>
        <h2 id="prisma-finale-title">{t.closingOne}<br/><em>{t.closingTwo}</em></h2>
        <p>{t.closingDesc}</p>
        <span className="prisma-final-pill"><span className="prisma-pulse" aria-hidden="true"/>{t.soon}</span>
        <small>{t.noRelease}</small>
      </section>
      <footer className="prisma-footer">
        <Link to="/" aria-label={t.home}>CLEAR STUDIO.</Link>
        <span>{t.finalNote}</span>
        <Link to="/projects">{t.back} <ArrowRight size={14}/></Link>
      </footer>
    </article>
  );
}
