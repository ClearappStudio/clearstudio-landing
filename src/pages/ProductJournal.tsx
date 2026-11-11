import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductJournal.css";

const articles = {
  daylight: {
    name: "Daylight",
    title: "Making room for the unfinished",
    deck: "A day contains appointments, tasks and thoughts that have not found their shape yet. Designing Daylight meant giving all three somewhere to belong.",
    slug: "daylight-making-room-for-the-unfinished",
    related: "/projects/daylight",
    icon: "/assets/daylight/app-icon.png",
    intro: [
      "A meeting ends. The next appointment is already in the calendar. There are two things to follow up, a phrase worth remembering and a question that needs a little more thought. For a moment, all of it belongs together.",
      "Then the tools divide it up. The appointment stays in the calendar. The actions become a list. The thought goes into a notebook, if it gets written down at all. By the afternoon, remembering what mattered means finding the pieces again.",
      "Daylight begins with that ordinary moment. We wanted a planner for iPad that could hold the shape of a day while leaving room for the thinking happening inside it. The starting point was the page: somewhere a commitment and an unfinished thought could remain close.",
    ],
    sections: [
      { title: "The margin has a purpose", paragraphs: [
        "On paper, the edge of a schedule is rarely empty for long. A name, an arrow, a reminder for later. These small marks are useful because they can stay informal. They do not need a title, a category or a decision about where they belong before we can make them.",
        "Daylight gives the daily view a space for notes alongside tasks and calendar events. You can type a task, write directly with Apple Pencil or leave a thought in the margin. Each way of entering information suits a different moment: a keyboard for something precise, handwriting for a quick connection that would take longer to explain.",
        "Keeping those modes close is a practical design decision. When a thought arrives halfway through planning the day, capturing it should preserve the thread of what you were doing.",
      ] },
      { title: "Change the distance", paragraphs: [
        "At nine in the morning, the useful question might be what comes next. On Sunday evening, it might be whether the week has enough space. Near the end of a month, it might be where several commitments are beginning to gather. A single view cannot give each question the same care.",
        "The day, week and month in Daylight offer different distances from the same plans. Weekly tasks make it easier to place work across several days. The weekly agenda makes the time occupied by appointments visible. The month reveals patterns that disappear when you look at one date at a time.",
        "Moving between those views should feel like stepping closer to the page or further away from it. Existing Apple Calendar events remain part of that picture, and edits go back to their original calendar. A planner becomes more useful when it can work with the commitments already in your life.",
      ] },
      { title: "Let a note become something", paragraphs: [
        "Some notes are brief enough to remain in the margin. Others deserve a page of their own. A meeting can develop into a longer conversation; an idea may need a sketch, a few paragraphs and another visit tomorrow.",
        "The notebook gives those thoughts more space. A note can be linked to a calendar event, keeping the conversation close to the occasion that produced it. Selected handwriting can become a task when a thought reaches the point of needing action.",
        "That change matters. An idea often becomes clear through writing it down. The interface should allow that process to unfold before asking what the result is supposed to be.",
      ] },
      { title: "A page you can return to", paragraphs: [
        "Plans move. An appointment takes longer, a task belongs on another day, or the afternoon needs to be left open. A useful planner makes those changes feel ordinary. Moving an event or rescheduling a task is part of planning itself.",
        "The visual choices follow the same intention. Warm paper, blue, restrained colour and enough space around the writing give the page a steady character. The calendar supplies structure; the page still has room for the person using it.",
        "That is the standard we keep returning to with Daylight: can you open it, recognise where you are and continue? A fresh page should give you somewhere to begin. A page you have already used should help you find your way back.",
      ] },
    ],
    closing: "A little room for the day as it actually unfolds.",
  },
  prisma: {
    name: "PRISMA",
    title: "The balance is only the beginning",
    deck: "A number tells you how much is there. Understanding what it means takes a wider view. That question shaped PRISMA.",
    slug: "prisma-the-balance-is-only-the-beginning",
    related: "/projects/prisma/",
    icon: "/projects/prisma/assets/prisma-icon.webp",
    intro: [
      "You check your bank account and see a balance. The number is exact. The decision you came to make is still waiting: how much of that money can you use?",
      "Some of it belongs to bills that have not arrived. Some is being kept for a trip. An annual payment may be several months away, but it is already part of the picture. The account shows where the money is. The meaning of that money lives across several different times and intentions.",
      "PRISMA grew from the desire to bring those relationships into view. We wanted somewhere to plan a year, understand everyday spending and decide what to set aside, with enough continuity between those activities for the numbers to make sense together.",
    ],
    sections: [
      { title: "A year has a shape", paragraphs: [
        "A monthly budget is a useful place to start. Trouble begins when every month is expected to behave like the previous one. Insurance renewals, school costs, holidays and changes in income give a year its own uneven rhythm.",
        "PRISMA treats the annual plan as a view worth working in. Income, expenses and savings can be planned month by month, so a quieter month and an expensive one can be understood in relation to each other. The point is to make room for the irregular things you already know are coming.",
        "Looking across the year also changes the meaning of a monthly result. A month with less left over may be entirely consistent with the plan. Seeing that context helps you ask a better question: does the year still work as a whole?",
      ] },
      { title: "Give transactions meaning", paragraphs: [
        "A transaction arrives with a date, an amount and a description written for the payment system. That is enough to record it. Understanding it requires another layer: what was it for, and where does it belong in your own plan?",
        "Importing transactions and reviewing their categories creates that connection. PRISMA brings planned and actual amounts together so you can examine the difference. A category becomes useful when it reflects how you understand your life, and when similar transactions can be considered together.",
        "The review deserves attention of its own. A suggested category should remain something you can inspect and change. The aim is to reduce repetitive sorting while keeping the decisions that give the information its meaning in your hands.",
      ] },
      { title: "Saving is a decision about purpose", paragraphs: [
        "Money set aside for a holiday is still money you have. It also carries a different intention from the amount available for everyday spending. Keeping both facts visible was an important part of designing PRISMA.",
        "Savings goals give those intentions somewhere to live. Closing a month creates a moment to review the result and decide what should move towards a particular goal and what should remain in reserves. The decision connects what has just happened with what you want to make possible next.",
        "A reserve also carries continuity between months. An uneven year needs somewhere to hold the room created in one period for use in another. That is why the relationship between the annual plan, monthly close and money set aside matters more than any one total on a dashboard.",
      ] },
      { title: "Keep the picture in your hands", paragraphs: [
        "Financial information is personal in a very ordinary way. It contains routines, obligations and small decisions that do not need an audience. PRISMA is designed around local data and a workflow you can begin with an imported file, without requiring a bank connection.",
        "That approach also makes the act of review visible. You bring in the transactions, decide how they belong and look at what they change. The app gives those decisions a consistent place to accumulate.",
        "The name PRISMA expresses the idea behind that work: the same information can reveal something different when you change the angle. From an account balance to the whole year; from a payment to its purpose; from money left over to something you want to make room for. Each view should help the next decision become clearer.",
      ] },
    ],
    closing: "A clearer picture of what is here, what is spoken for and what comes next.",
  },
};

type Product = keyof typeof articles;

function Arrow() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M5 5h14v14"/></svg>;
}

function DaylightFigure() {
  return <figure className="pj-screen">
    <img src="/assets/daylight/day-en-v2.webp" width="1448" height="1086" alt="Daylight daily planner showing tasks, calendar events and handwritten notes in the margin." loading="lazy"/>
    <figcaption><span>A day, with room around it.</span><span>Screen edited for presentation · Sample content</span></figcaption>
  </figure>;
}

function PrismaFigure() {
  return <figure className="pj-money-figure">
    <div className="pj-money-question"><span className="pj-label">One balance. Several intentions.</span><h2>What is already<br/>spoken for?</h2><p>An account balance becomes more useful when the commitments and plans behind it are visible.</p></div>
    <div className="pj-money-ledger"><dl>
      <div className="pj-money-total"><dt>In the account</dt><dd>€2,400</dd></div>
      <div><dt><i/> Upcoming commitments</dt><dd>− €1,400</dd></div>
      <div><dt><i/> Already set aside</dt><dd>− €600</dd></div>
      <div className="pj-money-available"><dt>Room for the next decision</dt><dd>€400</dd></div>
    </dl><span className="pj-label">Concept illustration · Fictional amounts</span></div>
    <figcaption>An illustration of the question behind PRISMA, rather than a product screen.</figcaption>
  </figure>;
}

export default function ProductJournal({ product }: { product: Product }) {
  const data = articles[product];
  const otherProduct = product === "daylight" ? "prisma" : "daylight";
  const other = articles[otherProduct];
  const words = [data.title, data.deck, ...data.intro, ...data.sections.flatMap(s => [s.title, ...s.paragraphs]), data.closing].join(" ").split(/\s+/).length;
  useEffect(() => {
    const previous = document.title;
    document.title = `${data.name}: ${data.title} — Clear Studio Journal`;
    return () => { document.title = previous; };
  }, [data]);

  return <article className={`product-journal pj-${product}`}>
    <header className="pj-hero">
      <div className="pj-topline"><Link to="/journal">← Journal</Link><span>Designing {data.name}</span></div>
      <div className="pj-hero-grid">
        <div className="pj-hero-copy"><p className="pj-label">Process · 11 November 2026</p><h1>{data.title}<span>.</span></h1><p className="pj-deck">{data.deck}</p><div className="pj-byline"><span>Clear Studio</span><span>{Math.ceil(words / 210)} min read</span></div></div>
        <div className="pj-hero-art" aria-hidden="true">{product === "daylight" ? <><div className="pj-door-light"/><img src={data.icon} alt="" width="1024" height="1024"/><span>A fresh page.<br/>A clearer day.</span></> : <><div className="pj-orbit pj-orbit-one"/><div className="pj-orbit pj-orbit-two"/><div className="pj-orbit pj-orbit-three"/><img src={data.icon} alt="" width="420" height="420"/><span>YOUR MONEY, IN PERSPECTIVE</span></>}</div>
      </div>
    </header>

    <div className="pj-opening"><span className="pj-label">The starting point</span><div className="pj-prose">{data.intro.map((p,i) => <p className={i === 0 ? "pj-lead" : undefined} key={p}>{p}</p>)}</div></div>

    {product === "daylight" ? <DaylightFigure/> : <PrismaFigure/>}

    <div className="pj-chapters">{data.sections.map((section,i) => <section className="pj-chapter" key={section.title}>
      <div className="pj-chapter-heading"><span className="pj-label">0{i+1}</span><h2>{section.title}</h2></div>
      <div className="pj-prose">{section.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
      {product === "daylight" && i === 1 && <figure className="pj-inset-screen"><img src="/assets/daylight/week-agenda-en-v2.webp" width="1448" height="1086" loading="lazy" alt="Daylight weekly agenda showing the distribution of sample appointments across seven days."/><figcaption>A different distance from the same plans. Screen edited for presentation · Sample content.</figcaption></figure>}
    </section>)}</div>

    <section className="pj-closing"><p className="pj-label">The intention</p><h2>{data.closing}</h2><Link className="pj-project-link" to={data.related} reloadDocument={product === "prisma"}>Explore {data.name}<Arrow/></Link></section>
    <nav className="pj-read-next" aria-label="Related Journal article"><span className="pj-label">Another perspective</span><Link to={`/journal/${other.slug}`}><span>{other.name}</span><h2>{other.title}</h2><Arrow/></Link><Link className="pj-all" to="/journal">All Journal entries</Link></nav>
  </article>;
}
