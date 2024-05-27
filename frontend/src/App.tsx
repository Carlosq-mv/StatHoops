import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.css'
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MyTeams from "./pages/MyTeams";
import LandingPage from "./pages/LandingPage";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}
function RegisterAndLogout() {
  localStorage.clear()
  return <Signup />
}

function App() {

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<RegisterAndLogout />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/home" element={<ProtectedRoutes> <Home/> </ProtectedRoutes>} />
            <Route path="/team/:team_name" element={<ProtectedRoutes> <Team/> </ProtectedRoutes>} />  
            <Route path="/myteams" element={<ProtectedRoutes> <MyTeams/> </ProtectedRoutes>} />  
            <Route path="/stathoops" element={<ProtectedRoutes> <LandingPage /> </ProtectedRoutes>} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
