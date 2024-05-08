import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import NoMatch from "./NoMatch";
import Login from "./Login";
import Signup from "./Signup";
import AdminDashboard from "./AdminDashboard";
import { useUser } from "../context/userContext";
import UserDashNav from "./UserDashNav";

const LandingPage = () => {
  const { userData } = useUser();
  return (
    <>
      <BrowserRouter basename="/">
        {userData ? <UserDashNav /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default LandingPage;
