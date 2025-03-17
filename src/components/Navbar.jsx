import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

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

  let scrollActive = scroll
    ? "py-6 bg-white/10 shadow"
    : "py-2 bg-white/10 shadow";
  let scrollService = scroll
    ? "my-6 bg-white/10 md:shadow"
    : "my-2 bg-white/10 md:shadow";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServiceMenu = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  return (
    <div>
      <nav
        className={`flex px-4 backdrop-blur-sm fixed w-full  top-0 z-50 transition-all duration-300 ${scrollActive}`}
      >
        <div className="text-lg font-bold md:py-0 py-4">Logo</div>

        <ul
          className={`md:px-2 md:mr-12 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent text-lg font-semibold ${
            isMenuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <li>
            <a
              href="#"
              className="inline-flex md:inline-flex m-4 items-center relative hover:text-[#fb7c1a] 
  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#fb7c1a] 
  after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
            >
              <span>Home</span>
            </a>
          </li>

          <li className="relative group">
            <a
              href="#"
              className="inline-flex md:inline-flex m-4 items-center relative hover:text-[#fb7c1a] 
  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#fb7c1a] 
  after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
            >
              <span>Products</span>
            </a>
          </li>

          <li className="relative group">
            <div className="flex items-center justify-between">
              <a
                href="#services"
                className="flex md:inline-flex m-4 items-center relative hover:text-[#fb7c1a] 
  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#fb7c1a] 
  after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
              >
                <span>Service</span>
              </a>
              <button
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    toggleServiceMenu();
                  }
                }}
                className="p-2 md:hidden"
              >
                <i className="ri-arrow-down-s-line text-2xl"></i>
              </button>
            </div>
            <ul
              className={`
  md:invisible md:group-hover:visible md:opacity-0 ml-1 md:group-hover:opacity-100
  transition-all duration-300 
  md:absolute top-full left-0 md:w-48 
  md:bg-white/10 md:backdrop-blur-sm md:shadow-sm md:rounded-lg text-sm z-50
  ${isServiceOpen ? "block" : "hidden md:block"} ${scrollService}
`}
            >
              <li>
                <a
                  href="#"
                  className="inline-flex px-4 py-3 hover:bg-white hover:bg-opacity-50 rounded-lg relative hover:text-[#fb7c1a]
      after:absolute after:content-[''] after:block after:h-[0.1rem] after:bg-[#fb7c1a] 
      after:w-0 after:left-4 after:right-4 after:bottom-1 after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex px-4 py-3 hover:bg-white hover:bg-opacity-50 rounded-lg relative hover:text-[#fb7c1a]
      after:absolute after:content-[''] after:block after:h-[0.1rem] after:bg-[#fb7c1a] 
      after:w-0 after:left-4 after:right-4 after:bottom-1 after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]"
                >
                  Web Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex px-4 py-3 hover:bg-white hover:bg-opacity-50 rounded-lg relative hover:text-[#fb7c1a]
      after:absolute after:content-[''] after:block after:h-[0.1rem] after:bg-[#fb7c1a] 
      after:w-0 after:left-4 after:right-4 after:bottom-1 after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]"
                >
                  Machine Learning
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#"
              className=" inline-flex md:inline-flex m-4 items-center relative hover:text-[#fb7c1a] 
  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#fb7c1a] 
  after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
            >
              <span>About Us</span>
            </a>
          </li>
        </ul>

        <div
          className="flex ml-auto md:hidden text-gray-500 cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <i className="ri-close-large-fill text-4xl p-4"></i>
          ) : (
            <i className="ri-menu-line text-4xl p-4"></i>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
