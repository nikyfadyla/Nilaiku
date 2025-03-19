import React from "react";
import Study from "../assets/images/study.jpg";

const Features = () => {
  return (
    <section
      id="features"
      className="px-4 sm:px-6  mx-auto md:mx-15 py-8 md:py-30"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-center   text-purple-600 mb-15 md:mb-25">
        Fitur Utama
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="p-3 md:p-4 rounded-lg transition-transform hover:scale-105">
          <div className="w-full aspect-video overflow-hidden rounded-md mb-4">
            <img
              src={Study}
              alt="Study"
              className="w-full h-full object-cover bg-gray-300 rounded-md"
            />
          </div>
          <div id="prediksi">
            <h3 className="text-purple-500 font-semibold text-lg sm:text-xl md:text-2xl mb-2 md:mb-5">
              Prediksi Nilai Otomatis
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Sistem berbasis Machine Learning untuk memprediksi nilai ujian.
            </p>
          </div>
        </div>

        <div className="p-3 md:p-4 rounded-lg transition-transform hover:scale-105">
          <div className="w-full aspect-video overflow-hidden rounded-md mb-4">
            <img
              src={Study}
              alt="Study"
              className="w-full h-full object-cover bg-gray-300 rounded-md"
            />
          </div>
          <div id="#analisis">
            <h3 className="text-purple-500 font-semibold text-lg sm:text-xl md:text-2xl mb-2 md:mb-5">
              Analisis Data Interaktif
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Visualisasi grafik dan data analisis yang menunjukkan
              faktor-faktor yang mempengaruhi performa.
            </p>
          </div>
        </div>

        <div className="p-3 md:p-4 rounded-lg transition-transform hover:scale-105 sm:col-span-2 md:col-span-1 sm:mx-auto sm:max-w-sm md:max-w-none md:mx-0">
          <div className="w-full aspect-video overflow-hidden rounded-md mb-4">
            <img
              src={Study}
              alt="Study"
              className="w-full h-full object-cover bg-gray-300 rounded-md"
            />
          </div>
          <div id="rekomendasi">
            <h3 className="text-purple-500 font-semibold text-lg sm:text-xl md:text-2xl mb-2 md:mb-5">
              Rekomendasi Pembelajaran
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Saran strategis untuk meningkatkan kemampuan belajar berdasarkan
              data yang diinput.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
