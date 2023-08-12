import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
