import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/Abouts.jsx";
import Features from "./components/Features.jsx";
import Team from "./components/Team.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Team/>
    </div>
  );
}

export default App;
