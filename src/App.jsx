import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import Record from "./pages/Record/Record.jsx";
import Register from "./pages/Register/Register.jsx";
import MemorialTimeline from "./pages/MemorialTimeline/MemorialTimeline.jsx";
import Timeline from "./pages/Timeline/Timeline.jsx";
import TimelinePreview from "./pages/Timeline/TimelinePreview.jsx";

function App() {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/record/:plantName" element={<Record />} />
              <Route path="/register" element={<Register />} />
              <Route path="/memorialTimeline" element={<MemorialTimeline />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/timelinepreview/:id" element={<TimelinePreview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;