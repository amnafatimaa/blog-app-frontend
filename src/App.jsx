import { useState } from 'react';
import Header from './components/header';
import './App.css';
import Footer from './components/footer/footer';
import Home from './pages/home/home';

function App() {
  return (
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Home />
        </main>
        <Footer />
      </div>
  );
}


export default App;