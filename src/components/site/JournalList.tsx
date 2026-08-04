import { journalEntries } from "@/data/content";

export function JournalList() {
  return (
    <div className="journal-list">
      {journalEntries.map((entry) => (
        <div className="journal-entry" key={entry.title}>
          <span className="entry-type">{entry.type}</span>
          <h3>{entry.title}</h3>
          <span className="entry-date">{entry.date}</span>
        </div>
      ))}
    </div>
  );
}
