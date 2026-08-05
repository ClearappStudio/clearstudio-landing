import { Link } from "react-router-dom";
import { journalEntries } from "@/data/content";

export function JournalList({ limit }: { limit?: number }) {
  const entries = typeof limit === "number" ? journalEntries.slice(0, limit) : journalEntries;

  return (
    <div className="journal-list">
      {entries.map((entry) => {
        const content = (
          <>
            <span className="entry-type">{entry.type}</span>
            <h3>{entry.title}</h3>
            <span className="entry-date">{entry.date}</span>
            {entry.slug && <span className="entry-arrow" aria-hidden="true">↗</span>}
          </>
        );

        return entry.slug ? (
          <Link className="journal-entry journal-entry--linked" to={`/journal/${entry.slug}`} key={entry.title}>
            {content}
          </Link>
        ) : (
          <div className="journal-entry journal-entry--upcoming" key={entry.title}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
