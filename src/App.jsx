import React, { useEffect } from "react";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/Abouts.jsx";
import Features from "./components/Features.jsx";
import Team from "./components/Team.jsx";
import Testimoni from "./components/Testimoni.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
      easing: "ease-in-out", // Efek transisi lebih smooth
    });
  }, []);

  // Objek untuk style background
  const backgroundStyle = {
    background: "radial-gradient(circle,rgb(255, 255, 255),rgb(232, 215, 255),rgb(232, 215, 255))",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Team />
      <Testimoni />
      <Footer />
    </div>
  );
}

export default App;
