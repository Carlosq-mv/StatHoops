import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.css'
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";

function App() {

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/team/:team_name" element={<Team />} />  
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
