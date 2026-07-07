import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import Record from "./pages/Record/Record.jsx";
import Register from "./pages/Register/Register.jsx";

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
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;