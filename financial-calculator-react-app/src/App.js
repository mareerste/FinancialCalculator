import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";
import LoginPage from "./Pages/LoginPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavLayout />}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
