import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import About from "@/pages/About";
import ClearMail from "@/pages/ClearMail";
import Home from "@/pages/Home";
import Journal from "@/pages/Journal";
import JournalEntry from "@/pages/JournalEntry";
import LegacyEmailLanding from "@/pages/LegacyEmailLanding";
import ProjectDetail from "@/pages/ProjectDetail";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/clear-mail" element={<ClearMail />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:entrySlug" element={<JournalEntry />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/clear-mail-preview" element={<LegacyEmailLanding />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
