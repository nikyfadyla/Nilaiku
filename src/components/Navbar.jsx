import React, { useEffect, useState } from "react";
import Logo from '../assets/images/nilaiku_logo.png';


/**
 * Komponen Navbar untuk menampilkan navigasi di bagian atas halaman.
 */
const Navbar = () => {
  // State untuk mengontrol apakah menu mobile terbuka atau tidak
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State untuk menentukan apakah halaman sedang di-scroll
  const [scroll, setScroll] = useState(false);

  // State untuk mengontrol apakah sub-menu "Service" terbuka atau tidak (hanya di mobile)
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  // Efek untuk mendeteksi scroll dan mengubah state `scroll`
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
  // Tentukan kelas CSS berdasarkan state `scroll`

  /**
   * Fungsi untuk membuka/menutup menu mobile.
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Fungsi untuk membuka/menutup sub-menu "Service" di mobile.
   */
  const toggleServiceMenu = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  return (
    <>
      {/* Navbar utama */}
      <nav
        className={`  flex px-20 backdrop-blur-sm fixed w-full top-0 z-50 transition-all duration-300 py-1 bg-white/10 shadow`}
      >
        {/* Logo atau judul navbar */}
        <div className="flex  items-center">
          <img src={Logo} alt="Logo Nilaiku"
          className="max-h-15 max-w-30"/>
        </div>

        {/* Daftar menu navigasi */}
        <ul
          className={`items-center  md:px-2 md:mr-12 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 
            bg-white md:bg-transparent text-lg font-semibold transition-all duration-300 ease-in-out
            ${isMenuOpen ? "block opacity-100 translate-y-0" : "hidden transition-discrete md:flex opacity-0 md:opacity-100 translate-y-[-100%] md:translate-y-0"}`}
        >
          {/* Menu Home */}
          <li>
            <a
              href="#home"
              className="inline-flex md:inline-flex m-4 relative text-[#B348C7] hover:text-[#F3BC55] 
  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
  after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById("#home");
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

          {/* Menu About Us */}
          <li className="relative group">
            <a
              href="#about"
              className="inline-flex md:inline-flex    m-4  relative text-[#B348C7] hover:text-[#F3BC55] 
  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
  after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
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

          {/* Menu Service dengan sub-menu */}
          <li className="relative group">
            <div className="flex  items-center justify-between">
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
                className="flex md:inline-flex  m-4    relative text-[#B348C7] hover:text-[#F3BC55] 
        after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
        after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
              >
                Service
              </a>

              {/* Tombol untuk membuka sub-menu di mobile */}
              <button
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    toggleServiceMenu();
                  }
                }}
                className="p-2 md:hidden transition-discrete transition-transform duration-300"
              >
                <i
                  className={`ri-arrow-down-s-line text-2xl ${
                    isServiceOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </button>
            </div>

            {/* Sub-menu Service sebagai ul dengan li bertingkat */}
            <ul
              className={`
      md:invisible md:group-hover:visible md:opacity-0 ml-1 md:group-hover:opacity-100
      transition-all duration-300 
      md:absolute top-full left-0 md:w-48 
      md:bg-white/10 md:backdrop-blur-sm md:shadow-sm md:rounded-lg text-sm z-50
      ${isServiceOpen ? "block opacity-100" : "hidden transition-discrete md:block opacity-0"} 
    `}
            >
              <li>
                <a
                  href="#prediksi"
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
                  className="inline-flex   ml-5 my-3  
        hover:bg-opacity-50 rounded-lg text-[#B348C7] hover:text-[#F3BC55]
        relative after:absolute after:content-[''] after:h-[1px] 
        after:bg-[#F3BC55] after:w-0 after:left-0 after:bottom-[-10px] 
        after:transition-all after:duration-300 hover:after:w-full"
                >
                  Prediksi Nilai Otomatis
                </a>
              </li>

              <li>
                <a
                  href="#analisis"
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
                  className="inline-block ml-5 my-3 
        hover:bg-opacity-50 rounded-lg text-[#B348C7] hover:text-[#F3BC55]
                
                 
                    relative after:absolute after:content-[''] after:h-[1px] 
        after:bg-[#F3BC55] after:w-0 after:left-0 after:bottom-[-10px] 
        after:transition-all after:duration-300 hover:after:w-full"
                >
                  Analisis Data Interaktif
                </a>
              </li>
              <li>
                <a
                  href="#analisis"
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
                  className="inline-flex ml-5 my-3 md:mb-7  
        hover:bg-opacity-50 rounded-lg text-[#B348C7] hover:text-[#F3BC55]
                
                 
                    relative after:absolute after:content-[''] after:h-[1px] 
        after:bg-[#F3BC55] after:w-0 after:left-0 after:bottom-[-10px] 
        after:transition-all after:duration-300 hover:after:w-full"
                >
                  Rekomendasi pembelajaran
                </a>
              </li>
            </ul>
          </li>

          {/* Menu Team */}
          <li>
            <a
              href="#team"
              className=" inline-flex md:inline-flex   mt-4 mb-7 md:mt-0  md:mb-0 m-4 relative text-[#B348C7] hover:text-[#F3BC55] 
  after:absolute after:content-[''] after:block after:h-[1px] after:bg-[#F3BC55] 
  after:w-0 after:left-0 after:bottom-[-10px] after:transition-all after:duration-300 hover:after:w-full"
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

        {/* Tombol toggle menu untuk mobile */}
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
