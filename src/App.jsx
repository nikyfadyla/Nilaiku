import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/Abouts.jsx";
import Features from "./components/Features.jsx";
import Team from "./components/Team.jsx";
import Testimoni from "./components/Testimoni.jsx";
import Footer from "./components/Footer.jsx";

import StudentDataForm from "./form-section/StudentDataForm.jsx";
import StudentAcademicForm from "./form-section/StudentAcademicForm.jsx";
import StudentDetailPage from "./form-section/StudentDetailPage.jsx";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const backgroundStyle = {
    background:
      "radial-gradient(circle, rgb(255, 255, 255), rgb(232, 215, 255), rgb(232, 215, 255))",
    minHeight: "100vh",
  };

  return (
    <Router>
      <div style={backgroundStyle}>
        <Navbar /> {/* Navbar selalu tampil di semua halaman */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Features />
                <Team />
                <Testimoni />
                <Footer />
              </>
            }
          />
          <Route path="/student-data" element={<StudentDataForm />} />
          <Route path="/student-data/:id" element={<StudentDataForm />} />
          <Route
            path="/student-academic/:student_id"
            element={<StudentAcademicForm />}
          />
          <Route
            path="/student-detail/:student_id"
            element={<StudentDetailPage />}
          />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
