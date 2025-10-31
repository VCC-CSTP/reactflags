//import { useState } from "react";
import "./App.css";
import { FlagGrid } from "./components/FlagGrid";
import { Route, Routes } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<FlagGrid />} />
      </Routes>
    </div>
  )
}

export default App;
