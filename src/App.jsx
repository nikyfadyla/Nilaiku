import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar.jsx";
import NavbarForm from "./components/NavbarForm.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/Abouts.jsx";
import Features from "./components/Features.jsx";
import Team from "./components/Team.jsx";
import Testimoni from "./components/Testimoni.jsx";
import Footer from "./components/Footer.jsx";

import StudentDataForm from "./form-section/StudentDataForm.jsx";
import StudentAcademicForm from "./form-section/StudentAcademicForm.jsx";
import StudentDetailPage from "./form-section/StudentDetailPage.jsx";

function Layout({ children }) {
  const location = useLocation();

  // Daftar path yang valid untuk menampilkan NavbarForm
  const formPaths = [
    "/student-data",
    "/student-data/",
    "/student-data/edit",
    "/student-academic",
    "/student-academic/",
    "/student-detail",
  ];

  // Cek apakah halaman saat ini adalah halaman formulir
  const isFormPage = formPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(path + "/")
  );

  return (
    <div style={backgroundStyle}>
      {isFormPage ? <NavbarForm /> : <Navbar />}
      {children}
    </div>
  );
}

const backgroundStyle = {
  background:
    "radial-gradient(circle, rgb(255, 255, 255), rgb(232, 215, 255), rgb(232, 215, 255))",
  minHeight: "100vh",
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Hero />
              <About />
              <Features />
              <Team />
              <Testimoni />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/student-data"
          element={
            <Layout>
              <StudentDataForm />
            </Layout>
          }
        />
        <Route
          path="/student-data/:id"
          element={
            <Layout>
              <StudentDataForm />
            </Layout>
          }
        />
        <Route
          path="/student-academic/:student_id"
          element={
            <Layout>
              <StudentAcademicForm />
            </Layout>
          }
        />
        <Route
          path="/student-detail/:student_id"
          element={
            <Layout>
              <StudentDetailPage />
            </Layout>
          }
        />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
