import React from "react";

const Footer = () => {
  return (
    <div className="bg-zinc-200">
      <div className="max-w-screen-xl py-10 px-4 sm:px-6 text-gray-800 mx-auto flex flex-col md:flex-row">
        <div className="p-5 w-full md:w-4/12">
                  <h3 className="font-bold text-3xl text-[#B348C7] mb-4">Nilai<span className="text-[#F3BC55]">Ku</span></h3>
                  
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
    </div>
  );
};

export default Footer;
