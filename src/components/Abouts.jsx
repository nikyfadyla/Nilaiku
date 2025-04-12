import React, { useState } from "react";
import aboutImg from "../assets/images/student.png";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="about" className="px-4 pb-20 mx-auto pt-34">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div data-aos="fade-right" data-aos-duration="1000">
          <div className="relative mx-auto w-full max-w-[500px]">
            {/* Floating container */}
            <div className="relative z-10">
              <img
                src={aboutImg}
                alt="about"
                className="w-full h-auto object-contain floating-image"
                style={{
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
                }}
              />
            </div>
            
            {/* Floating badges (optional) */}
            <div className="absolute -bottom-2 -left-2 bg-white p-2 rounded-full shadow-md z-20">
              <div className="bg-[#F3BC55] p-1.5 rounded-full">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#B348C7">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-md z-20">
              <div className="bg-[#B348C7] p-1.5 rounded-full">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#F3BC55">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-10" data-aos="fade-left" data-aos-duration="1000">
          <h1
            className="lg:text-4xl/tight text-3xl text-[#B348C7] font-semibold mb-5 inline-flex md:inline-flex relative 
             transition-all duration-300 transform hover:scale-105 hover:text-[#F3BC55] group"
          >
            Apa itu
            <span className="font-bold"> Nilai</span>
            <span className="font-bold text-[#F3BC55]">Ku?</span>
            <span
              className="absolute left-0 bottom-[-10px] h-[2px] bg-[#F3BC55] w-0 
               transition-all duration-300 group-hover:w-full"
            ></span>
          </h1>
          <p className="text-xl/loose font-light">
            <span className="font-semibold">
              NilaiKu adalah aplikasi prediksi nilai ujian{" "}
            </span>
            berbasis website yang dikembangkan untuk membantu siswa memahami
            faktor-faktor yang berpengaruh pada nilai ujian. Dengan memanfaatkan
            teknologi Machine Learning, kami menyediakan prediksi nilai yang
            akurat dan rekomendasi strategi belajar sesuai kebutuhan.
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center bg-[#F9CB57] hover:bg-[#E8B84C] text-white font-medium md:font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-6"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      {/* Modal (unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-white/10 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h2 className="text-2xl font-bold text-[#B348C7] mb-4">
              Cara Kerja NilaiKu
            </h2>
            <p className="text-gray-800 mb-6">
              NilaiKu menggunakan teknologi Machine Learning untuk menganalisis
              data nilai siswa dan memberikan prediksi yang akurat. Berikut adalah
              langkah-langkahnya:
              <ol className="list-decimal list-inside mt-2">
                <li>Masukkan data nilai siswa ke dalam sistem.</li>
                <li>Sistem akan menganalisis data menggunakan algoritma canggih.</li>
                <li>Hasil prediksi dan rekomendasi pembelajaran akan ditampilkan.</li>
              </ol>
            </p>
            <button
              onClick={closeModal}
              className="inline-flex items-center justify-center bg-[#F9CB57] hover:bg-[#E8B84C] text-white font-medium md:font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .floating-image {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;