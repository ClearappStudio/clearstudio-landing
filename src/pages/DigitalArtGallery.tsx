import { Link } from "react-router-dom";
import { GalleryArtwork } from "@/components/site/GalleryArtwork";

export default function DigitalArtGallery() {
  return (
    <article className="digital-gallery">
      <section className="dag-hero" aria-labelledby="dag-title">
        <div className="dag-hero-copy">
          <p className="dag-eyebrow">A Clear Studio Project</p>
          <h1 id="dag-title">Digital<br />Art Gallery</h1>
          <p>Original digital artworks created for the places where ideas happen.</p>
        </div>
        <GalleryArtwork className="dag-hero-art" />
      </section>

      <section className="dag-intro">
        <h2>A gallery for<br />digital spaces.</h2>
        <div>
          <p>Digital Art Gallery presents original exhibitions designed for the screens where people think, write and create. Each exhibition is a complete world, made of rooms, artworks and a distinct visual atmosphere.</p>
          <p>The gallery is free to visit. Selected exhibitions are also released as digital editions for Mac, iPad and iPhone.</p>
        </div>
      </section>

      <section className="dag-exhibitions" id="exhibitions" aria-labelledby="current-exhibition">
        <div className="dag-section-head">
          <h2 id="current-exhibition">Current exhibition</h2>
          <span>Exhibition 01</span>
        </div>
        <Link className="dag-featured" to="/projects/digital-art-gallery/rooms-of-light">
          <GalleryArtwork className="dag-cover" />
          <div className="dag-feature-copy">
            <div>
              <span className="dag-status">Now showing</span>
              <h3>Rooms<br />of Light</h3>
              <p>An exhibition about colour, light and attention. Eight imagined spaces moving from energy to stillness.</p>
            </div>
            <div className="dag-feature-meta">
              <span>8 artworks</span><span>3 movements</span><span>Exhibition 01</span><span>Enter exhibition →</span>
            </div>
          </div>
        </Link>

        <div className="dag-section-head dag-section-head--archive">
          <h2>Exhibition archive</h2>
          <span>The gallery will grow over time</span>
        </div>
        <div className="dag-archive">
          {[
            ["Colour Studies", "Not yet announced"],
            ["Morning", "Not yet announced"],
            ["Quiet Geometry", "Not yet announced"],
          ].map(([title, status]) => (
            <article className="dag-archive-card" key={title}>
              <span>Future exhibition</span><h3>{title}</h3><span>{status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dag-about" id="about-gallery">
        <h2>Art for the spaces<br />where ideas happen.</h2>
        <p>We spend thousands of hours looking at screens, yet the visual environment behind our work is often treated as an afterthought. Digital Art Gallery explores a different possibility: that the space surrounding digital work can be considered with the same care as any physical room.</p>
      </section>

      <div className="dag-return"><Link to="/projects">← Back to all projects</Link></div>
    </article>
  );
}
