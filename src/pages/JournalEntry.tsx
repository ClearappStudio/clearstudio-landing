import { Link, Navigate, useParams } from "react-router-dom";
import "./FindingBloom.css";

function FindingBloom() {
  const image = (name: string, alt: string, className?: string) => (
    <img className={className} src={`/assets/journal/finding-bloom/${name}.png`} alt={alt} />
  );

  return (
    <article className="finding-bloom">
      <section className="fb-hero">
        <div className="fb-shell fb-hero-grid">
          <div>
            <p className="fb-eyebrow">Journal · Process · August 2026</p>
            <h1>Finding<br />Bloom.</h1>
            <p className="fb-deck">Five images. Four increasingly convincing directions. And one final decision to leave them behind.</p>
            <div className="fb-meta"><span>Digital Art Gallery</span><span>Exhibition 01 — Rooms of Light</span></div>
          </div>
          <figure className="fb-master-hero">
            <span>05 / master</span>
            <div className="fb-master-frame">{image("5", "Bloom final master artwork")}</div>
          </figure>
        </div>
      </section>

      <section className="fb-opening">
        <div className="fb-shell fb-opening-grid">
          <div className="fb-label">The premise</div>
          <div className="fb-opening-copy">
            <p className="fb-lead">Bloom was always meant to be the emotional centre of <em>Rooms of Light</em>.</p>
            <p>The brief described a moment where the palette became more confident, more generous, and where light itself seemed to expand. It was supposed to celebrate optimism without becoming loud: a warm point in the exhibition before the sequence gradually returned to quieter tones.</p>
            <p>The first four images found one answer to that brief. They moved from a recognisable architectural room towards something progressively softer, brighter and more atmospheric. Taken on their own, the progression made sense. Each image removed a little structure and gave colour a little more space.</p>
            <p>That is precisely why the fifth image matters. The final master did not continue the sequence. It questioned it.</p>
          </div>
        </div>
      </section>

      <section className="fb-process-intro">
        <div className="fb-shell">
          <div className="fb-line" />
          <div className="fb-process-grid">
            <h2>A direction can improve and still be the wrong direction.</h2>
            <p>The development images were not failed attempts. Quite the opposite: by the fourth, the idea had become coherent, controlled and visually resolved. What they revealed was something harder to notice — that Bloom was becoming beautiful in a way that did not quite belong to the work we wanted.</p>
          </div>
        </div>
      </section>

      <section className="fb-stage">
        <div className="fb-shell fb-stage-one">
          <figure className="fb-landscape">{image("1", "Bloom development 01, an architectural room filled with coral and golden light")}</figure>
          <div className="fb-stage-copy">
            <div className="fb-number">01 · A room</div>
            <h3>The brief begins as architecture.</h3>
            <p>The first image is unmistakably a place. Walls, floor, an opening, a strong direction of sunlight. Coral and yellow already give it the warmth Bloom needed, while the blue edge prevents the scene from becoming closed or overly sweet.</p>
            <p>It works as a room. Perhaps too well. The eye first understands the architecture and only afterwards experiences the colour.</p>
          </div>
        </div>
      </section>

      <section className="fb-spread">
        <div className="fb-shell fb-spread-grid">
          <div className="fb-spread-left">
            <figure className="fb-landscape">{image("2", "Bloom development 02, architecture loosening into fields of light")}</figure>
            <figcaption className="fb-caption"><span>02</span><p>The geometry loosens. Light is no longer simply entering the room; it starts to become part of its structure.</p></figcaption>
          </div>
          <div>
            <figure className="fb-landscape">{image("3", "Bloom development 03, overlapping warm colour fields with a pink centre")}</figure>
            <figcaption className="fb-caption"><span>03</span><p>A small pink centre changes the emotional balance. The architecture remains, but the image is increasingly read as overlapping fields of colour.</p></figcaption>
            <div className="fb-spread-text"><p>By this point, the process seemed to have found its logic: <em>keep dissolving the room until atmosphere becomes the subject.</em></p></div>
          </div>
        </div>
      </section>

      <section className="fb-turning">
        <figure className="fb-turning-art">{image("4", "Bloom development 04, a luminous abstract atmosphere of coral, yellow, pink and blue")}</figure>
        <div className="fb-shell fb-turning-caption">
          <h3>04.<br />Almost there.</h3>
          <div>
            <p>The fourth version takes that idea furthest. Hard edges have nearly disappeared. Coral, yellow, pink and blue flow through one another; the original room survives mainly as depth, a horizon and the suggestion of surfaces.</p>
            <p>It is probably the most seductive image in the sequence. And that created the real problem.</p>
            <p>Bloom had become increasingly luminous, but also increasingly close to a beautiful atmosphere. The work was beginning to illustrate optimism rather than embody it. It needed a different kind of confidence.</p>
          </div>
        </div>
      </section>

      <section className="fb-pivot">
        <div className="fb-shell fb-pivot-grid">
          <div className="fb-label">The change</div>
          <div><blockquote>The final step was not refinement. It was permission to start again.</blockquote><p>Instead of asking how the fourth image could become more abstract, the question changed: what would remain of Bloom if the sunset, the horizon and almost all of the expected warmth disappeared?</p></div>
        </div>
      </section>

      <section className="fb-master-section">
        <div className="fb-shell fb-master-grid">
          <figure className="fb-master-large">{image("5", "Bloom final master artwork, a luminous abstract space", "fb-master-complete")}</figure>
          <div className="fb-master-copy">
            <div className="fb-number">05 · The master</div>
            <h2>Bloom becomes quieter — and more itself.</h2>
            <p>The final image changes almost everything that had seemed essential. The warm horizontal landscape becomes a more expansive composition. The architecture opens into flowing coral, yellow, pink and blue, while translucent forms pass across one another like fabric, light or a room that has become too luminous to name.</p>
            <p>Yet the original brief is still there. The palette is confident, but confidence no longer depends on structure. The forms are generous because they occupy the image without filling it with detail. Light expands through translucency and overlap rather than through a single glowing opening in a room.</p>
            <p>Most importantly, the work leaves more space for the viewer. The development images describe a luminous place. The master creates a condition that is harder to name and easier to inhabit.</p>
            <p className="fb-pull">The fifth image did not perfect the previous four. It showed what they had been trying to discover.</p>
          </div>
        </div>
      </section>

      <section className="fb-closing">
        <div className="fb-shell fb-closing-grid">
          <h2>What survived the process was the intention, not the solution.</h2>
          <div className="fb-closing-copy">
            <p>There is a temptation in iterative work to treat each version as a rung on a ladder: every image should move visibly closer to the final one. Bloom did not behave like that. Four iterations developed one visual language with increasing clarity. Then the final work stepped sideways into another.</p>
            <p>That does not make those earlier images disposable. They established what the piece cared about: softness, generosity, expansion, colour that alters the emotional quality of a space. Once those qualities were understood, the particular room that had carried them was no longer necessary.</p>
            <p>Perhaps that is the useful part of keeping the process. It reminds us that iteration is not always the gradual correction of an object. Sometimes it is a way of understanding the question well enough to abandon your best answer.</p>
            <p className="fb-quote">“Colour changes not only what we see, but how we feel while looking.”</p>
          </div>
        </div>
      </section>

      <section className="fb-related">
        <div className="fb-shell fb-related-grid">
          <div className="fb-label">Related project</div>
          <div><h3>Rooms of Light</h3><p>Bloom is part of Exhibition 01 from the Clear Studio Digital Art Gallery, a sequence of eight works exploring colour, light and attention as imagined digital spaces.</p><Link to="/projects/digital-art-gallery">Visit Digital Art Gallery ↗</Link></div>
        </div>
      </section>
    </article>
  );
}

export default function JournalEntry() {
  const { entrySlug } = useParams();

  if (entrySlug === "finding-bloom") {
    return <FindingBloom />;
  }

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
