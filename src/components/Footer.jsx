import React from "react";

const Footer = () => {
  const submitEmail = () => {
    console.log("click");
  };
  return (
    <footer className="bg-[#FFF4DE] pt-25">
      <div className="text-center w-auto items-center mb-25">
        <h2 className="text-xl mb-10 font-bold">Get in tuch with us</h2>
        <div className="relative bg-white rounded-lg mx-auto max-w-xs">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-3 px-3 pr-16 w-full bg-white rounded-lg border border-gray-200 focus:outline-none"
          />
          <button
            className="absolute right-1 mt-1.5 top-1 px-4 py-1.5 text-sm bg-yellow-400 text-white rounded-md "
            onClick={submitEmail}
          >
            Daftar
          </button>
        </div>
      </div>
      <div className="bg-[#FFE3AF]">
        <div className="max-w-screen-xl py-10 px-4 sm:px-6 text-gray-800 mx-auto flex flex-col md:flex-row">
          <div className="p-5 w-full md:w-4/12">
            <h3 className="font-bold text-3xl text-[#B348C7] mb-4">
              Nilai<span className="text-[#F3BC55]">Ku</span>
            </h3>

            <p className="text-gray-500 text-sm mb-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className="flex gap-5">
              <div className="flex bg-amber-100 w-[40px] h-[40px] rounded-full items-center justify-center">
                <a href="#">
                  <i className="ri-instagram-line text-2xl"></i>
                </a>
              </div>
              <div className="flex bg-amber-100 w-[40px] h-[40px] rounded-full items-center justify-center">
                <a href="#">
                  <i className="ri-twitter-x-line text-2xl"></i>
                </a>
              </div>
              <div className="flex bg-amber-100 w-[40px] h-[40px] rounded-full items-center justify-center">
                <a href="#">
                  <i className="ri-facebook-circle-fill text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 w-full md:w-5/12">
            <h3 className="text-md text-indigo-600 uppercase font-bold mb-5">
              CONTACT US
            </h3>

            <div className="mb-5">
              <div className="font-bold text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex bg-amber-100 w-[30px] h-[30px] rounded-full items-center justify-center shrink-0">
                    <a href="#">
                      <i className="ri-phone-fill text-xl"></i>
                    </a>
                  </div>
                  <p className="text-base">+62812345678910</p>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className="font-bold text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex bg-amber-100 w-[30px] h-[30px] rounded-full items-center justify-center shrink-0">
                    <a href="#">
                      <i className="ri-mail-fill text-xl"></i>
                    </a>
                  </div>
                  <p className="text-base">NilaiKuTEAM@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 w-full md:w-3/12">
            <h3 className="text-md uppercase text-indigo-600 font-bold mb-5">
              ALAMAT
            </h3>
            <div className="font-bold text-sm">
              <div className="flex gap-3 items-start">
                <div className="flex bg-amber-100 w-[30px] h-[30px] rounded-full items-center justify-center shrink-0">
                  <a href="#">
                    <i className="ri-map-pin-2-fill text-xl"></i>
                  </a>
                </div>
                <p className="text-sm md:text-base">
                  Jl. Ahmad Yani No.135A, Kramat Sel, Kec. Magelang Utara, Kota
                  Magelang, Jawa Tengah 59155
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-5 bg-[#FFC962]">
          <p>Copyright © 2012 - 2025 NilaiKu®. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
