//import { useState } from "react";
import "./App.css";
import { FlagGrid } from "./components/FlagGrid";
import { Route, Routes } from "react-router-dom";
import { FlagDetail } from "./components/FlagDetail";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path='/' element={<FlagGrid />} />
        <Route path='/detail/:country' element={<FlagDetail />} />
      </Routes>
    </div>
  )
}

export default App;
