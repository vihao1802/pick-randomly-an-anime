import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <div className="bg-[#131313] min-h-screen flex flex-col">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="saved-anime" element={<Saved />} />
            <Route path="search" element={<Search />} />
            <Route
              path="*"
              element={<h1 className="text-white">Page not found</h1>}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
