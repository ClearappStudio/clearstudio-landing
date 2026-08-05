import { Link, Navigate, useParams } from "react-router-dom";

export default function JournalEntry() {
  const { entrySlug } = useParams();

  if (entrySlug !== "why-clear-studio-exists") {
    return <Navigate to="/journal" replace />;
  }

  return (
    <article className="journal-article">
      <header className="article-header">
        <Link className="article-back" to="/journal">← Journal</Link>
        <p className="eyebrow">Foundations · 5 August 2026</p>
        <h1>Why Clear Studio exists</h1>
        <p className="article-deck">
          Digital life has become extraordinarily capable. It has also become
          more fragmented, demanding and complicated than it needs to be.
        </p>
      </header>

      <div className="article-body">
        <p className="article-lead">
          Clear Studio exists to reduce unnecessary complexity in digital life.
          That sentence is deliberately simple. It gives the studio a direction
          without deciding in advance what every piece of work must become.
        </p>

        <p>
          We live among remarkable tools. They let us work across continents,
          preserve almost everything, create with fewer barriers and carry an
          astonishing amount of capability in our pockets. But capability and
          clarity are not the same thing. As our tools have grown more powerful,
          digital life has also accumulated more interfaces, more fragments,
          more decisions and more small demands on our attention.
        </p>

        <p>
          Some complexity is real. Difficult problems do not become honest by
          pretending they are easy, and good work cannot always be reduced to a
          single button. But much of the complexity we encounter is not inherent
          to the problem. It is the residue of products built around categories,
          organisations and technical boundaries rather than the lives of the
          people using them. It asks us to remember where things are, reconstruct
          what happened and translate continually between systems that do not
          understand one another.
        </p>

        <blockquote>
          The aim is not simplicity at any cost. It is to remove the complexity
          that never needed to be there.
        </blockquote>

        <h2>No single shape</h2>

        <p>
          Clear Studio is an independent studio for software, design and ideas.
          Sometimes the right response to a problem is a product. Sometimes it
          is a system: a considered way of working with tools that already
          exist. Sometimes it is a visual object that changes the character of
          an everyday screen. And sometimes the most useful thing we can make is
          an idea that gives us a better way to see the problem in the first
          place.
        </p>

        <p>
          This is why the studio is intentionally broad. It does not begin with
          an expected format and then look for something to put inside it. It
          begins with a real tension and asks what form would resolve it most
          clearly. The projects may look different from one another because the
          problems are different. What connects them is the standard they are
          held to: each should leave some part of digital life calmer, clearer or
          more humane than it found it.
        </p>

        <h2>Clarity is not emptiness</h2>

        <p>
          We are drawn to restraint, but not to sterility. Clear work can still
          be warm, expressive, playful and full of character. Removing noise
          should make room for meaning, not remove personality with it. A useful
          object deserves an identity of its own; a thoughtful interface can be
          quiet without becoming anonymous.
        </p>

        <p>
          The same principle applies to how the work is made. Start with the
          real problem, not the fashionable solution. Question the assumptions
          that created the friction. Remove until what remains feels deliberate.
          Give every project the identity it needs. Technology matters, but it
          is never the reason on its own.
        </p>

        <h2>A place to think as well as build</h2>

        <p>
          Clear Studio is also a place for ideas that may take time to become
          products. Context-first Computing began with a simple observation:
          software has become very good at preserving information, while people
          still carry most of the burden of reconstructing why that information
          matters. The idea now guides Notebook, but its value is larger than a
          single application. It offers a direction for a different relationship
          with software—one built around continuity and understanding rather
          than isolated fragments.
        </p>

        <p>
          The Journal is where thinking like this can remain visible while it is
          still developing. Clear Studio should not present only finished
          objects. The questions behind them, the decisions made along the way
          and the principles that survive the work are part of the work too.
        </p>

        <blockquote>
          Sometimes through software. Sometimes through design. Sometimes simply
          through an idea that changes how we think.
        </blockquote>

        <p>
          Clear Studio is small by design and wide in its curiosity. It exists
          to make thoughtful things without forcing every idea into the same
          shape—and to keep asking where digital life could demand less of us
          while giving us more.
        </p>
      </div>

      <footer className="article-footer">
        <span>Clear Studio Foundations</span>
        <Link to="/about">About Clear Studio <span aria-hidden="true">↗</span></Link>
      </footer>
    </article>
  );
}
