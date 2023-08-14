import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RequireAuth from "./Components/Context/RequireAuth.tsx";
import ExpensesPage from "./Pages/ExpensesPage.tsx";
import HomePage from "./Pages/HomePage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="*" element={<NavLayout />}></Route>
          <Route path="/" element={<NavLayout />}></Route>
          <Route
            path="/home"
            element={<NavLayout body={<HomePage></HomePage>} />}
          ></Route>
          <Route
            path="/expenses"
            element={
              <NavLayout
                body={
                  <ExpensesPage
                    title={"Expense"}
                    message={"Track your montly expenses"}
                  ></ExpensesPage>
                }
              />
            }
          ></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
