import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Forgot from "./pages/Auth/Forgot";
import Reset from "./pages/Auth/Reset"
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/login" element={<Login/> } />
        <Route path="/register" element={<Register /> } />
        <Route path="/forgot" element={<Forgot /> } />
        <Route path="/resetpassword/:resetToken" element={<Reset /> } />

        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;