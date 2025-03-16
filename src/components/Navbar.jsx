import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener ketika komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollActive = scroll ? "py-6 -bg-white shadow" : "py-2 -bg-white shadow";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div >
      <nav
        className={`flex px-4 backdrop-blur-sm bg-opacity-10 fixed w-full top-0 z-50 transition-all duration-300 ${scrollActive}`}
      >
        <div className="text-lg font-bold  md:py-0 py-4">Logo</div>

        <ul
          className={`md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent text-lg font-semibold ${
            isMenuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <li>
            <a
              href="#"
              className="relative inline-block p-4 items-center  hover:text-orange-400 
    after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2
    after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all after:duration-300
    hover:after:w-6"
            >
              <span>Home</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex md:inline-flex p-4 items-center hover:[#F7F6F2] hover:bg-opacity-20 rounded-lg"
            >
              <span>Products</span>
            </a>
          </li>
          <li className="relative group">
            <a
              href="#"
              className="flex justify-between md:inline-flex p-4 items-center hover:bg-white hover:bg-opacity-20 rounded-lg space-x-2"
            >
              <span>Service</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current pt-1"
                viewBox="0 0 24 24"
              >
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
              </svg>
            </a>
            <ul className="hidden md:group-hover:block transition duration-300 md:absolute top-full right-0 md:w-48 bg-white bg-opacity-80 backdrop-blur-sm md:shadow-sm md:rounded-lg">
              <li>
                <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-white hover:bg-opacity-50 rounded-lg"
                >
                  Web development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-white hover:bg-opacity-50 rounded-lg"
                >
                  Web Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-white hover:bg-opacity-50 rounded-lg"
                >
                  Machine Learning
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              className="flex md:inline-flex p-4 items-center hover:bg-white hover:bg-opacity-20 rounded-lg"
            >
              <span>About Us</span>
            </a>
          </li>
        </ul>

        <div
          className="ml-auto md:hidden text-gray-500 cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </div>
      </nav>

      {/* Content to demonstrate scrolling */}
    </div>
  );
};

export default Navbar;
