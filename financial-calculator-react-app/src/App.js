import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RequireAuth from "./Components/Context/RequireAuth.tsx";
import ExpensesPage from "./Pages/ExpensesPage.tsx";
import HomePage from "./Pages/HomePage.tsx";
import CategoriesPage from "./Pages/CategoriesPage.tsx";
import UsersPage from "./Pages/UsersPage.tsx";
import PaymentsPage from "./Pages/PaymentsPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route
            path="*"
            element={<NavLayout body={<HomePage></HomePage>} />}
          ></Route>

          <Route
            path="/home"
            element={<NavLayout body={<HomePage></HomePage>} />}
          ></Route>
          <Route
            path="/expenses"
            element={<NavLayout body={<ExpensesPage></ExpensesPage>} />}
          ></Route>
          <Route
            path="/payments"
            element={<NavLayout body={<PaymentsPage></PaymentsPage>} />}
          ></Route>
          <Route
            path="/categories"
            element={<NavLayout body={<CategoriesPage></CategoriesPage>} />}
          ></Route>
          <Route
            path="/users"
            element={<NavLayout body={<UsersPage></UsersPage>} />}
          ></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/registration" element={<SignUpPage></SignUpPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
