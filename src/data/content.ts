export type Project = {
  slug: string;
  title: string;
  type: string;
  status: string;
  description: string;
  tone: "context" | "notebook" | "mail" | "gallery";
  size: "wide" | "narrow";
};

export const projects: Project[] = [
  {
    slug: "context-first-computing",
    title: "Context-first Computing",
    type: "Idea",
    status: "In development",
    description:
      "A new way of thinking about software: built around situations and understanding, not isolated fragments.",
    tone: "context",
    size: "wide",
  },
  {
    slug: "notebook",
    title: "Notebook",
    type: "Software",
    status: "In development",
    description:
      "A personal notebook designed to help you recover context and continue meaningful work.",
    tone: "notebook",
    size: "narrow",
  },
  {
    slug: "clear-mail",
    title: "Clear Mail",
    type: "System",
    status: "Private beta",
    description:
      "A calmer system for finishing email instead of continuously organising it.",
    tone: "mail",
    size: "narrow",
  },
  {
    slug: "digital-art-gallery",
    title: "Digital Art Gallery",
    type: "Design",
    status: "Coming soon",
    description:
      "Original digital artworks created for the places where ideas happen.",
    tone: "gallery",
    size: "wide",
  },
];

export type JournalEntry = {
  slug?: string;
  type: string;
  title: string;
  date: string;
  sortDate: string;
  upcomingOrder?: number;
  excerpt?: string;
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "why-clear-studio-exists",
    type: "Foundations",
    title: "Why Clear Studio exists",
    date: "5 Aug 2026",
    sortDate: "2026-08-05",
    excerpt:
      "Digital life has become extraordinarily capable. It has also become more fragmented, demanding and complicated than it needs to be.",
  },
  {
    type: "Idea",
    title: "Introducing Context-first Computing",
    date: "Coming soon",
    sortDate: "0000-00-00",
    upcomingOrder: 2,
  },
  {
    type: "Process",
    title: "Designing the first digital exhibition",
    date: "Coming soon",
    sortDate: "0000-00-00",
    upcomingOrder: 1,
  },
].sort((a, b) => {
  const upcomingDifference = (b.upcomingOrder ?? 0) - (a.upcomingOrder ?? 0);

  return upcomingDifference || b.sortDate.localeCompare(a.sortDate);
});

export type ColourStudy = {
  slug: string;
  number: string;
  name: string;
  value: string;
  className: string;
  note: string;
  status: string;
  field: string;
  started: string;
  palette: { name: string; value: string }[];
};

export const colourStudies: ColourStudy[] = [
  {
    slug: "quiet-blue",
    number: "No. 001",
    name: "Quiet Blue",
    value: "#6D8FB8",
    className: "quiet-blue",
    note: "A blue that leaves room for thought.",
    status: "Ongoing study",
    field: "Interfaces / digital spaces",
    started: "August 2026",
    palette: [
      { name: "Quiet Blue", value: "#6D8FB8" },
      { name: "Deep Thought", value: "#10253F" },
      { name: "Pale Air", value: "#DCE7F1" },
      { name: "Warm Paper", value: "#F2EFE7" },
    ],
  },
  {
    slug: "soft-signal",
    number: "No. 002",
    name: "Soft Signal",
    value: "#E98552",
    className: "soft-signal",
    note: "Warm enough to guide, never to shout.",
    status: "Early study",
    field: "Signals / wayfinding",
    started: "August 2026",
    palette: [
      { name: "Soft Signal", value: "#E98552" },
      { name: "Burnt Note", value: "#472514" },
      { name: "Apricot Air", value: "#F4C8AC" },
      { name: "Warm Paper", value: "#F2EFE7" },
    ],
  },
  {
    slug: "new-leaf",
    number: "No. 003",
    name: "New Leaf",
    value: "#91AE83",
    className: "new-leaf",
    note: "A useful green with a little optimism.",
    status: "Early study",
    field: "Software / calm states",
    started: "August 2026",
    palette: [
      { name: "New Leaf", value: "#91AE83" },
      { name: "Forest Type", value: "#19321D" },
      { name: "Soft Growth", value: "#D8E4D2" },
      { name: "Warm Paper", value: "#F2EFE7" },
    ],
  },
];
