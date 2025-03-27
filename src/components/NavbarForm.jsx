import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavbarForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      <button onClick={() => navigate(-1)} style={styles.button}>
        &#8592; Back
      </button>
      <h2 style={styles.title}>
        {location.pathname.includes("academic")
          ? "Student Academic Form"
          : location.pathname.includes("detail")
            ? "Student Detail Page"
            : "Student Data Form"}
      </h2>
      <Link to="/" style={styles.button}>
        Home
      </Link>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#4A90E2",
    color: "white",
  },
  button: {
    padding: "8px 16px",
    background: "white",
    color: "#4A90E2",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  },
  title: {
    margin: 0,
  },
};

export default NavbarForm;
