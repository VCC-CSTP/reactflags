//import { useState } from "react";
import "./App.css";
import {FlagGrid} from './components/FlagGrid';

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-4xl font-bold underline">Flags</h1>
      <FlagGrid />
    </div>
  );
}

export default App;
