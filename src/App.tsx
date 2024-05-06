import { Route, Routes } from "react-router-dom";
import { Landing } from "./Components/Landing/Landing";
import { Home } from "./Components/Home/Home";

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;