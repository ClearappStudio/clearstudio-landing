import { JournalList } from "@/components/site/JournalList";

export default function Journal() {
  return (
    <>
      <header className="page-intro journal-intro">
        <p className="eyebrow">Foundations · Process · Observations</p>
        <h1>Thinking,<br /><em>in public.</em></h1>
        <div className="intro-note">
          <p>Ideas rarely arrive finished. The Journal is where we share the questions, foundations and decisions behind the work.</p>
        </div>
      </header>
      <section className="section page-section">
        <JournalList />
      </section>
    </>
  );
}
