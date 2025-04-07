import React from "react";
import { Link } from "react-router-dom";
import ilustration from "../assets/images/imageHero.png";

const Hero = () => {
  // SVG Icons
  const ChartIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 10v5h2v-5H7zm4-3v8h2v-8h-2zm4-5v13h2V5h-2z"/>
    </svg>
  );

  const LightbulbIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 22a1 1 0 0 1-1-1v-1h2v1a1 1 0 0 1-1 1zm-4-3a1 1 0 1 1 0-2h8a1 1 0 0 1 0 2H8zm-1-3a7 7 0 1 1 10 0H7z"/>
    </svg>
  );

  const BookIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zM5 16.05c.162-.033.329-.05.5-.05h15V4H5v12.05z"/>
    </svg>
  );

  const FlaskIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a9.94 9.94 0 0 1-.029-.758V4h-2v3.243z"/>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
    </svg>
  );

  return (
    <div id="home" className="pb-10">
      <div className="min-h-screen pt-16 md:pt-20 flex flex-col px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#F9F6FF] to-[#E8D7FF]">
        <div className="flex-grow container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left section */}
            <div className="w-full lg:w-1/2 py-8 lg:py-16 order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="bg-[#B348C7] p-2 rounded-full mr-3">
                  <ChartIcon />
                </div>
                <span className="text-[#B348C7] font-semibold text-sm md:text-base">
                  PREDIKSI CERDAS
                </span>
              </div>
              
              <h1 className="text-[#F3BC55] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Selamat Datang di <span className="text-[#B348C7]">Nilai</span>
                <span className="text-[#F3BC55]">Ku</span>
              </h1>
              
              <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 font-light">
                Prediksi nilai ujian siswa dengan analisis data berbasis Machine
                Learning. Dapatkan rekomendasi pembelajaran yang tepat untuk
                meningkatkan prestasi akademik Anda.
              </p>
              
              {/* Features grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-6 md:mb-8">
                <div className="flex items-center">
                  <span className="text-[#B348C7] mr-2"><LightbulbIcon /></span>
                  <span className="text-sm md:text-base">Analisis Cerdas</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#B348C7] mr-2"><BookIcon /></span>
                  <span className="text-sm md:text-base">Rekomendasi Belajar</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#B348C7] mr-2"><ChartIcon /></span>
                  <span className="text-sm md:text-base">Prediksi Akurat</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#B348C7] mr-2"><FlaskIcon /></span>
                  <span className="text-sm md:text-base">Teknologi AI</span>
                </div>
              </div>
              
              {/* Button */}
              <div className="w-full sm:w-auto">
                <Link
                  to="/student-data"
                  className="inline-flex items-center justify-center bg-[#F9CB57] hover:bg-[#E8B84C] text-white font-medium md:font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Ayo mulai Prediksi
                  <span className="ml-2"><ArrowRightIcon /></span>
                </Link>
              </div>
            </div>

            {/* Right section */}
            <div className="w-full lg:w-1/2 py-8 lg:py-16 order-1 lg:order-2 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl">
                {/* Window frame */}
                <div className="absolute inset-0 -z-10">
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 right-0 h-20 bg-[#948bd6] rounded-t-full border-4 border-[#948bd6] border-b-0 flex justify-center items-end pb-2">
                      <div className="flex space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="absolute top-20 left-0 right-0 bottom-0 bg-[#948bd6] border-4 border-t-0 border-[#948bd6] rounded-b-lg"></div>
                  </div>
                </div>
                
                {/* Image */}
                <div className="relative z-10 pt-6 pb-8 px-6">
                  <img
                    src={ilustration}
                    alt="Ilustrasi prediksi nilai"
                    className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300 floating-image"
                    style={{
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
                    }}
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -bottom-2 -left-2 bg-white p-2 rounded-full shadow-md z-20">
                  <div className="bg-[#F3BC55] p-1.5 rounded-full">
                    <ChartIcon />
                  </div>
                </div>
                
                <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-md z-20">
                  <div className="bg-[#B348C7] p-1.5 rounded-full">
                    <LightbulbIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Hero;