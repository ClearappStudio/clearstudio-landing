import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import About from "@/pages/About";
import ClearMail from "@/pages/ClearMail";
import DigitalArtGallery from "@/pages/DigitalArtGallery";
import RoomsOfLight from "@/pages/RoomsOfLight";
import ArrivalRoom from "@/pages/ArrivalRoom";
import OpenSkyRoom from "@/pages/OpenSkyRoom";
import SignalsRoom from "@/pages/SignalsRoom";
import BetweenShapesRoom from "@/pages/BetweenShapesRoom";
import BloomRoom from "@/pages/BloomRoom";
import BlueHourRoom from "@/pages/BlueHourRoom";
import StillWaterRoom from "@/pages/StillWaterRoom";
import Home from "@/pages/Home";
import Journal from "@/pages/Journal";
import JournalEntry from "@/pages/JournalEntry";
import LegacyEmailLanding from "@/pages/LegacyEmailLanding";
import ProjectDetail from "@/pages/ProjectDetail";
import Projects from "@/pages/Projects";
import Studies from "@/pages/Studies";
import StudyDetail from "@/pages/StudyDetail";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/clear-mail" element={<ClearMail />} />
        <Route path="/projects/digital-art-gallery" element={<DigitalArtGallery />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light" element={<RoomsOfLight />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light/arrival" element={<ArrivalRoom />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light/open-sky" element={<OpenSkyRoom />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light/signals" element={<SignalsRoom />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light/between-shapes" element={<BetweenShapesRoom />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light/bloom" element={<BloomRoom />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light/blue-hour" element={<BlueHourRoom />} />
        <Route path="/projects/digital-art-gallery/rooms-of-light/still-water" element={<StillWaterRoom />} />
        <Route path="/projects/wallpapers" element={<DigitalArtGallery />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
        <Route path="/studies" element={<Studies />} />
        <Route path="/studies/:studySlug" element={<StudyDetail />} />
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
