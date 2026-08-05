export type Project = {
  slug: string;
  title: string;
  type: string;
  status: string;
  description: string;
  tone: "context" | "notebook" | "mail" | "wallpapers";
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
    slug: "wallpapers",
    title: "Wallpapers",
    type: "Design",
    status: "Coming soon",
    description:
      "Colourful digital spaces created to make everyday screens feel more personal and considered.",
    tone: "wallpapers",
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
    title: "Designing the first wallpaper collection",
    date: "Coming soon",
    sortDate: "0000-00-00",
    upcomingOrder: 1,
  },
].sort((a, b) => {
  const upcomingDifference = (b.upcomingOrder ?? 0) - (a.upcomingOrder ?? 0);

  return upcomingDifference || b.sortDate.localeCompare(a.sortDate);
});
