const studies = [
  { number: "No. 01", name: "Quiet Blue", value: "#6D8FB8", className: "quiet-blue", note: "A blue that leaves room for thought." },
  { number: "No. 02", name: "Soft Signal", value: "#E98552", className: "soft-signal", note: "Warm enough to guide, never to shout." },
  { number: "No. 03", name: "New Leaf", value: "#91AE83", className: "new-leaf", note: "A useful green with a little optimism." },
];

export function ColorStudies() {
  return (
    <div className="colour-studies">
      {studies.map((study) => (
        <article className={`colour-study colour-study--${study.className}`} key={study.name}>
          <div className="colour-study__meta"><span>{study.number}</span><span>{study.value}</span></div>
          <div><h3>{study.name}</h3><p>{study.note}</p></div>
        </article>
      ))}
    </div>
  );
}
