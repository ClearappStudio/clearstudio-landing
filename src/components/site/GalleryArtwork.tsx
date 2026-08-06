export function GalleryArtwork({ className = "" }: { className?: string }) {
  return (
    <div className={`gallery-artwork ${className}`.trim()} aria-hidden="true">
      <i className="gallery-artwork__sun" />
      <i className="gallery-artwork__green" />
      <i className="gallery-artwork__coral" />
      <i className="gallery-artwork__pink" />
    </div>
  );
}
