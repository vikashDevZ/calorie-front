import "./App.css";
import "react-datepicker/dist/react-datepicker.css"
import { useEffect } from "react";
import { ThemeProvider } from "react-bootstrap";
import CalorieTracks from "./pages/Tracks";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddItemsForm from "./components/AddItemsForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./redux/actions";
import AdminComp from "./pages/Admin";
import User from "./pages/User";
import Message from "./components/Message";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Message />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<CalorieTracks />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/admin" element={<AdminComp />} />
            <Route path="/user/:id" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
