import { useState, useEffect } from "react";
import Header from "./components/header";
import "./App.css";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import PostList from "./components/PostList";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import axios from "axios";
import Newpost from "./pages/newpost/Newpost";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="app-container">
      <Header setToken={setToken} token={token} />
      <Routes>
        <Route
          path="/"
          element={<Home token={token} />} // Pass token
        />
        <Route
          path="/blog"
          element={<Blog token={token} />} // Pass token
        />
        <Route
          path="/blog/:id"
          element={<Blog token={token} />} // Pass token
        />
        <Route path="/contact" element={<Contact token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/about" element={<About token={token} />} />
        <Route path="/newpost" element={<Newpost token={token} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
