import { useState } from 'react';
import Header from './components/header';
import './App.css';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import { Routes, Route } from 'react-router-dom'; 
import About from './pages/about/About';
import Blog from './pages/blog/Blog';
import Contact from './pages/contact/Contact'
import Login from './pages/login/Login'
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;