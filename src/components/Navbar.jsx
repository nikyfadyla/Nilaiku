import React, { useEffect, useState } from "react";
import Logo from "../assets/images/nilaiku_logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };

    const handleInitialScrollCheck = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleInitialScrollCheck);
    handleInitialScrollCheck();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleInitialScrollCheck);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`flex py-3 md:px-8 lg:px-12 xl:px-20 backdrop-blur-sm fixed w-full top-0 z-50 transition-all duration-300   bg-white/10 shadow`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo Nilaiku" className="max-h-15 max-w-30" />
        </div>

        {/* Navigation menu */}
        <ul
          className={`items-center md:px-2 md:mr-0 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 
            bg-white md:bg-transparent text-lg font-semibold transition-all duration-300 ease-in-out
            ${isMenuOpen ? "block opacity-100 translate-y-0" : "hidden transition-discrete md:flex opacity-0 md:opacity-100 translate-y-[-100%] md:translate-y-0"}`}
        >
          <li>
            <a
              href="#home"
              className="inline-flex md:inline-flex px-3 py-2 m-2 md:m-1 relative text-[#B348C7] hover:text-[#F3BC55] 
                after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
                after:w-0 after:left-0 after:bottom-[-5px] after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById("home");
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <span>Home</span>
            </a>
          </li>

          <li className="relative group">
            <a
              href="#about"
              className="inline-flex md:inline-flex px-3 py-2 m-2 md:m-1 relative text-[#B348C7] hover:text-[#F3BC55] 
                after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
                after:w-0 after:left-0 after:bottom-[-5px] after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.querySelector("#about");
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <span>About Us</span>
            </a>
          </li>

          <li className="relative group">
            <div className="flex items-center justify-between">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("features");
                  if (element) {
                    const navbarHeight =
                      document.querySelector("nav").offsetHeight;
                    window.scrollTo({
                      top: element.offsetTop - navbarHeight + 50,
                      behavior: "smooth",
                    });
                  }
                }}
                className="flex md:inline-flex px-3 py-2 m-2 md:m-1 relative text-[#B348C7] hover:text-[#F3BC55] 
                  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
                  after:w-0 after:left-0 after:bottom-[-5px] after:transition-all after:duration-300 hover:after:w-full"
              >
                Service
              </a>
            </div>
          </li>

          <li>
            <a
              href="#team"
              className="inline-flex md:inline-flex px-3 py-2 m-2 md:m-1 relative text-[#B348C7] hover:text-[#F3BC55] 
                after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
                after:w-0 after:left-0 after:bottom-[-5px] after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.querySelector("#team");
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <span>Team</span>
            </a>
          </li>
        </ul>

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
      </nav>
    </>
  );
};

export default Navbar;
