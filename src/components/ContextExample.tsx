import { useState } from "react";

const moments = [
  { when: "Monday", label: "The plan", title: "A launch for 200 customers", source: "Illustrative meeting note", quote: "Invite all 200 customers to the new service next month.", explanation: "The team agrees on a broad launch. The decision is recorded in a meeting note." },
  { when: "Tuesday", label: "The constraint", title: "The service needs more testing", source: "Illustrative technical review", quote: "Capacity testing only covers five customers. We need further tests before a wider rollout.", explanation: "A technical review changes what is possible. Its findings live in a different document from the original plan." },
  { when: "Wednesday", label: "The decision", title: "Start with a smaller pilot", source: "Illustrative email", quote: "Let's start with five customers. Before sending invitations, we still need to agree what would make the pilot successful.", explanation: "The team changes the plan by email. The pilot is agreed; its success criteria are still undecided." },
  { when: "Two weeks later", label: "You return", title: "“Prepare the pilot.”", source: "The task you find when you return", quote: "Prepare the pilot.", explanation: "The task tells you what to do. To understand why, you would have to find and reconnect the meeting note, technical review and email." },
];

export default function ContextExample() {
  const [step, setStep] = useState(0);
  const moment = moments[step];
  return (
    <section className="cfc-section cfc-example" id="an-example" aria-labelledby="continuity-heading">
      <div className="cfc-example-copy">
        <p className="cfc-kicker">02 / An example, step by step</p>
        <h2 id="continuity-heading">The plan changed.<br /><em>Can you pick up<br />the thread?</em></h2>
        <p>Imagine you are preparing a product launch. Over three days, the plan changes across a meeting note, a technical review and an email.</p>
        <p>Follow the timeline. Then return to the project two weeks later: what would your software need to show you to help you continue?</p>
        <span className="cfc-example-caption">A fictional scenario to explain the idea. Use the steps or “Next” to explore it.</span>
      </div>
      <div className="cfc-example-walkthrough">
        <ol className="cfc-timeline" aria-label="Example timeline">
          {moments.map((item, index) => <li key={item.label}>
            <button type="button" onClick={() => setStep(index)} aria-current={step === index ? "step" : undefined} aria-controls="example-panel">
              <span className="cfc-timeline-number" aria-hidden="true">0{index + 1}</span>
              <span className="cfc-timeline-when">{item.when}</span>
              <span className="cfc-timeline-label">{item.label}</span>
            </button>
          </li>)}
        </ol>
        <div className="cfc-example-panel" id="example-panel" aria-live="polite" aria-atomic="true">
          <p className="cfc-kicker">Step {step + 1} of 4 / {moment.when}</p>
          <h3>{moment.title}</h3>
          <figure className="cfc-example-source">
            <figcaption>{moment.source}</figcaption>
            <blockquote>{moment.quote}</blockquote>
          </figure>
          <p className="cfc-example-explanation">{moment.explanation}</p>
          {step === 3 && <div className="cfc-context-recovered">
            <p className="cfc-kicker">What a context-first system could bring back</p>
            <h4>You are preparing a five-customer pilot.</h4>
            <dl>
              <div><dt>Why five?</dt><dd>The original 200-customer launch was reduced because capacity testing is incomplete.</dd></div>
              <div><dt>What is agreed?</dt><dd>The team will start with five customers before considering a wider release.</dd></div>
              <div><dt>What needs a decision?</dt><dd>You still need to agree how to judge the pilot's success before inviting customers.</dd></div>
            </dl>
            <div className="cfc-example-sources"><span>Inspect the sources:</span>{moments.slice(0, 3).map((item, index) => <button type="button" className="cfc-text-link" key={item.source} onClick={() => setStep(index)}>{["Meeting note", "Technical review", "Email"][index]} <span aria-hidden="true">↗</span></button>)}</div>
            <p className="cfc-example-takeaway">You can return to the situation with its sources connected, and make the next decision yourself.</p>
          </div>}
        </div>
        <div className="cfc-example-controls">
          <button type="button" className="cfc-text-link" disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}><span aria-hidden="true">←</span> Previous</button>
          {step < 3 ? <button type="button" className="cfc-button" onClick={() => setStep(value => value + 1)}>{step === 2 ? "Return two weeks later" : "Next"}<span aria-hidden="true">→</span></button> : <button type="button" className="cfc-text-link" onClick={() => setStep(0)}>Start again <span aria-hidden="true">↻</span></button>}
        </div>
      </div>
    </section>
  );
}
