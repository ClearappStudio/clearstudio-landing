import { JournalList } from "@/components/site/JournalList";

export default function Journal() {
  return (
    <>
      <header className="page-intro">
        <p className="eyebrow">Notes from the studio</p>
        <h1>Journal</h1>
        <p>
          Ideas, foundations and an honest look at the process behind the work.
        </p>
      </header>
      <section className="section page-section">
        <JournalList />
      </section>
    </>
  );
}
