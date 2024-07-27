import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Saved from "./pages/Saved";
function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <div>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="saved-anime" element={<Saved />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
