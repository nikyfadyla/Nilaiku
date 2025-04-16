import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/nilaiku_logo.png";

const NavbarForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getTitle = () => {
    if (location.pathname.includes("academic")) return "Student Academic Form";
    if (location.pathname.includes("detail")) return "Student Detail Page";
    return "Student Data Form";
  };

  return (
    <nav
      className={`flex px-4 md:px-20 backdrop-blur-sm fixed w-full top-0 z-50 transition-all duration-300 py-1 bg-white/10 shadow`}
    >
      {/* Logo */}
      <div className="flex items-center m-2 cursor-pointer">
        <a
          href="https://nilaiku.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Logo} alt="Logo Nilaiku" className="max-h-15 max-w-30" />
        </a>
      </div>

      {/* Navigation buttons - desktop */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white text-[#B348C7] rounded-lg hover:bg-[#F3BC55] hover:text-white transition-colors duration-300"
        >
          &#8592; Back
        </button>

        <h2 className="text-xl font-semibold text-[#B348C7]">{getTitle()}</h2>

        <Link
          to="/"
          className="px-4 py-2 bg-white text-[#B348C7] rounded-lg hover:bg-[#F3BC55] hover:text-white transition-colors duration-300"
        >
          Home
        </Link>
      </div>

      {/* Mobile menu button */}
      <div
        className="flex ml-auto md:hidden text-gray-500 cursor-pointer"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <i className="ri-close-large-fill text-4xl p-4 transition-transform duration-300 transform rotate-180"></i>
        ) : (
          <i className="ri-menu-line text-4xl p-4 transition-transform duration-300"></i>
        )}
      </div>

      {/* Mobile menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out
          ${isMenuOpen ? "block opacity-100 translate-y-0" : "hidden opacity-0 translate-y-[-100%]"}`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => {
              navigate(-1);
              toggleMenu();
            }}
            className="px-4 py-2 bg-[#B348C7] text-white rounded-lg hover:bg-[#F3BC55] transition-colors duration-300"
          >
            &#8592; Back
          </button>

          <h2 className="text-xl font-semibold text-[#B348C7] text-center">
            {getTitle()}
          </h2>

          <Link
            to="/"
            onClick={toggleMenu}
            className="px-4 py-2 bg-[#B348C7] text-white rounded-lg hover:bg-[#F3BC55] text-center transition-colors duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarForm;
