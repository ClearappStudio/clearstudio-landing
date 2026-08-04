import { Link } from "react-router-dom";

const states = [
  ["Action Items", "Correos con cosas que tienes que hacer tú."],
  ["Read Later", "Correos que requieren tiempo y atención, no una respuesta inmediata."],
  ["Waiting On", "Conversaciones en las que ahora le toca actuar a otra persona."],
  ["Vault", "Información importante que querrás poder recuperar en el futuro."],
];

const steps = [
  "Cada correo nuevo exige una decisión sencilla.",
  "Si requiere algo de ti, pasa al lugar que le corresponde.",
  "Si no requiere atención, se archiva.",
  "Cuando se resuelve, desaparece de tu espacio de trabajo.",
];

export default function ClearMail() {
  return (
    <article className="clear-mail-page">
      <header className="clear-mail-hero">
        <div className="clear-mail-topline"><span>Clear Studio / System 01</span><span>Private beta</span></div>
        <div className="mail-mark" aria-hidden="true"><i /><i /><i /></div>
        <div className="clear-mail-title">
          <p>Clear Mail</p>
          <h1>El email no se organiza.<br /><em>Se termina.</em></h1>
        </div>
        <p className="clear-mail-lede">Un sistema sencillo para reducir tu bandeja a decisiones claras y devolverle espacio a tu cabeza.</p>
      </header>

      <section className="mail-section mail-problem">
        <p className="mail-kicker">01 / The problem</p>
        <div><h2>El correo no te roba tiempo.<br /><span>Te roba atención.</span></h2><p>Correos importantes mezclados con ruido. Cosas pendientes que viven en tu cabeza. Un “luego lo miro” que nunca termina de llegar.</p><strong>No tienes demasiados correos. Tienes demasiadas decisiones abiertas.</strong></div>
      </section>

      <section className="mail-manifesto">
        <p>One simple idea</p>
        <h2>Un correo solo debería existir mientras requiere tu atención.</h2>
        <span>Nada más. Nada menos.</span>
      </section>

      <section className="mail-section mail-system">
        <p className="mail-kicker">02 / The system</p>
        <div><h2>Cuatro estados.<br />Ningún limbo.</h2><p className="mail-system-intro">Todo correo nuevo termina en uno de estos lugares —o se archiva directamente.</p><div className="mail-state-grid">{states.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div>
      </section>

      <section className="mail-flow">
        <p className="mail-kicker">03 / How it works</p>
        <h2>La claridad aparece cuando cada cosa tiene un final.</h2>
        <ol>{steps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="mail-section mail-privacy">
        <p className="mail-kicker">04 / Privacy</p>
        <div><h2>Tu correo sigue siendo tuyo.</h2><p>No almacenamos el contenido completo. No leemos adjuntos. No vendemos datos. Clear Mail guarda decisiones, no tu vida.</p></div>
      </section>

      <section className="mail-cta" id="clear-mail-beta">
        <p>Private beta</p>
        <h2>El correo no debería vivir en tu cabeza.</h2>
        <p>Estamos probando el sistema con un grupo reducido. Si te interesa, cuéntanoslo.</p>
        <a href="mailto:hello@clearstudio.app?subject=Clear%20Mail%20private%20beta">I want to try Clear Mail <span>↗</span></a>
      </section>
      <Link className="project-back" to="/projects">← All projects</Link>
    </article>
  );
}
