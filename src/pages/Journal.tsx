import { JournalList } from "@/components/site/JournalList";

export default function Journal() {
  return (
    <>
      <header className="page-intro journal-intro">
        <p className="eyebrow">Notes from the studio</p>
        <h1>Thinking,<br /><em>in public.</em></h1>
        <div className="intro-note">
          <span>Foundations · Process · Observations</span>
          <p>Ideas rarely arrive finished. The Journal is where we share the questions, foundations and decisions behind the work.</p>
        </div>
      </header>
      <section className="section page-section">
        <JournalList />
      </section>
    </>
  );
}
