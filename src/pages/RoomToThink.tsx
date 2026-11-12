import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import "./RoomToThink.css";

const initialTasks = [
  { id: 1, title: "Sketch the opening", project: "Rooms of Light", date: "2026-11-12", note: "Give the first image a little more time. Let the room arrive before the words.", done: false },
  { id: 2, title: "Review the colour proofs", project: "Studio Studies", date: "2026-11-12", note: "Compare the quiet blue on warm paper and on screen.", done: false },
  { id: 3, title: "Send the exhibition notes", project: "Rooms of Light", date: "2026-11-13", note: "Include the final sequence and the updated captions.", done: false },
  { id: 4, title: "Collect material references", project: "Research", date: "2026-11-13", note: "Glass, soft reflections and the texture of uncoated paper.", done: true },
  { id: 5, title: "Write a quieter introduction", project: "Journal", date: "2026-11-16", note: "Start with the question. Leave the explanation for later.", done: false },
  { id: 6, title: "Test the reading rhythm", project: "Studio Studies", date: "2026-11-17", note: "Read the page on a tablet. Notice where the pace changes.", done: false },
  { id: 7, title: "Prepare the next conversation", project: "Clear Studio", date: "2026-11-18", note: "Three ideas, one useful question, enough room to listen.", done: false },
];
const modes = ["Compact", "Balanced", "Spacious"] as const;
type Mode = typeof modes[number];
const observations: Record<Mode, { label: string; text: string }> = {
  Compact: { label: "More in view.", text: "Shorter distances between items. More of the week stays visible, while each task has less space of its own." },
  Balanced: { label: "A measured rhythm.", text: "Enough separation to distinguish each task, while keeping its neighbours close. A starting point, rather than a universal answer." },
  Spacious: { label: "One thing at a time.", text: "Each task has more presence. The list asks for more scrolling, and the overview gradually gives way to individual items." },
};
export default function RoomToThink() {
  const [mode, setMode] = useState<Mode>("Balanced");
  const [tasks, setTasks] = useState(initialTasks);
  const [selected, setSelected] = useState(1);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const task = tasks.find(t => t.id === selected)!;
  const completed = [selected === 3, tasks.find(t => t.id === 3)?.date === "2026-11-16", !!tasks.find(t => t.id === 2)?.done];
  const prompts = ["Find “Send the exhibition notes” and open it.", "Move that task to Monday, 16 November.", "Mark “Review the colour proofs” as complete."];
  useEffect(() => { document.title = "Room to think — Interface Studies · Clear Studio"; }, []);
  useEffect(() => { if (started && step < 3 && completed[step]) setStep(s => s + 1); }, [selected, tasks, started, step]);
  function update(values: Partial<typeof task>) { setTasks(items => items.map(t => t.id === selected ? { ...t, ...values } : t)); }
  function reset() { setTasks(initialTasks); setSelected(1); setStep(0); setStarted(false); }
  return <article className="rtt">
    <section className="rtt-hero">
      <div className="rtt-kicker"><Link to="/studies">Studio Studies</Link><span>004 / Interfaces</span></div>
      <h1>Room<br />to <em>think.</em></h1>
      <div className="rtt-hero-bottom"><p>How much room<br />does a thought need?</p><div><p>The same tasks. The same tools.<br />A different amount of space between them.</p><a href="#experiment">Explore the study <ArrowDown size={16} /></a></div></div>
      <div className="rtt-spacing" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    </section>
    <section className="rtt-intro"><span className="rtt-label">01 / The question</span><h2>Space changes<br />the conversation.</h2><p>A little more air can give an item presence. A little less can bring a whole week into view. What happens when you have something to do?</p></section>
    <section id="experiment" className="rtt-experiment">
      <div className="rtt-experiment-top"><div><span className="rtt-label">02 / Try it yourself</span><h2>Find your rhythm.</h2></div><p>Change the spacing as you work.<br />Your tasks and selection stay with you.</p></div>
      <div className="rtt-controls"><div className="rtt-segment" role="group" aria-label="Interface spacing">{modes.map(m => <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>{m}</button>)}</div><button className="rtt-reset" onClick={reset}><RotateCcw size={14} /> Reset</button></div>
      <div className="rtt-app" data-density={mode.toLowerCase()}>
        <div className="rtt-app-bar"><span><i /> A small working week</span><span>November 2026</span></div>
        <div className="rtt-workspace"><div className="rtt-agenda"><div className="rtt-agenda-heading"><div><small>YOUR STUDIO</small><h3>A few things<br />worth doing.</h3></div><span>{tasks.filter(t => !t.done).length} open</span></div>
          <div className="rtt-task-list" aria-label="Studio tasks">{tasks.map(t => <div className={`rtt-task ${selected === t.id ? "is-selected" : ""} ${t.done ? "is-done" : ""}`} key={t.id}><button className="rtt-check" aria-label={`${t.done ? "Reopen" : "Complete"} ${t.title}`} aria-pressed={t.done} onClick={() => setTasks(items => items.map(x => x.id === t.id ? {...x, done: !x.done} : x))}>{t.done && <Check size={13} />}</button><button className="rtt-task-open" aria-pressed={selected === t.id} onClick={() => setSelected(t.id)}><span>{t.title}</span><small>{t.project}</small></button><time dateTime={t.date}>{new Date(t.date + "T12:00:00Z").toLocaleDateString("en-GB", {day:"numeric", month:"short", timeZone:"UTC"})}</time></div>)}</div>
        </div><aside className="rtt-detail" aria-label="Selected task"><small>THE DETAIL</small><div className="rtt-detail-mark" aria-hidden="true">↗</div><p className="rtt-detail-project">{task.project}</p><h3>{task.title}</h3><p>{task.note}</p><label htmlFor="task-date">Planned for</label><input id="task-date" type="date" value={task.date} onChange={e => { if(e.target.value) update({date:e.target.value}); }} /><button className="rtt-complete" onClick={() => update({ done: !task.done })}>{task.done ? "Reopen task" : "Mark complete"}{task.done && <Check size={15} />}</button><span className="rtt-detail-foot">A place for the thing in front of you.</span></aside></div>
      </div>
      <div className="rtt-caption" aria-live="polite"><strong>{observations[mode].label}</strong><p>{observations[mode].text}</p><span>{mode}</span></div>
      <div className="rtt-challenge"><span className="rtt-label">A small exercise</span><div aria-live="polite"><h3>{!started ? "Give the space a purpose." : step === 3 ? "Same work. A different feeling?" : prompts[step]}</h3><p>{!started ? "Try three simple actions. Switch compositions whenever you like and notice what becomes easier to see." : step === 3 ? "Try another composition. Notice the trade between seeing the whole list and giving each item room." : `Action ${step + 1} of 3 · Use the agenda above.`}</p></div><button onClick={() => { if (step === 3) reset(); else setStarted(true); }}>{!started ? "Begin exercise" : step === 3 ? "Try again" : `${step}/3 complete`}<ArrowUpRight size={16} /></button></div>
    </section>
    <section className="rtt-reading"><span className="rtt-label">03 / What changes</span><h2>More space.<br /><em>Different compromises.</em></h2><div className="rtt-reading-grid"><div><span>01</span><h3>The overview</h3><p>Compact layouts keep more relationships visible at once. The cost is proximity: items sit closer together and need a clear visual hierarchy.</p></div><div><span>02</span><h3>The individual</h3><p>Generous spacing gives each item a stronger boundary. The cost is distance: neighbouring tasks may move out of view.</p></div><div><span>03</span><h3>The context</h3><p>A quick scan and a thoughtful review ask different things of an interface. The useful amount of space depends on the work, the screen and the person.</p></div></div><p className="rtt-note">An exploration of interface density, not a usability benchmark. Only spacing changes between compositions; typography, content and tools remain the same. Your edits live in this page and reset when you leave.</p></section>
    <section className="rtt-ending"><p>Clarity is a relationship<br />between things.</p><Link to="/studies">Back to Studio Studies <ArrowUpRight size={19} /></Link></section>
  </article>;
}
