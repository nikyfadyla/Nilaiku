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
          <img
            src={aboutImg}
            alt="about"
            className="lg:w-[500px] w-350 mx-auto"
          />
        </div>
        <div className="px-10 " data-aos="fade-left" data-aos-duration="1000">
          <h1
            className="lg:text-4xl/tight text-3xl text-[#B348C7] font-semibold mb-5 inline-flex md:inline-flex relative 
             transition-all duration-300 transform hover:scale-105 hover:text-[#F3BC55] group"
          >
            Apa itu
            <span className="font-bold"> Nilai</span>
            <span className="font-bold text-[#F3BC55]">Ku?</span>
            {/* Garis bawah animasi */}
            <span
              className="absolute left-0 bottom-[-10px] h-[2px] bg-[#F3BC55] w-0 
               transition-all duration-300 group-hover:w-full"
            ></span>
          </h1>
          <p className="text-xl/loose  font-light">
            <span className="font-semibold">
              NilaiKu adalah aplikasi prediksi nilai ujian{" "}
            </span>
            berbasis website yang dikembangkan untuk membantu siswa memahami
            faktor-faktor yang berpengaruh pada nilai ujian. Dengan memanfaatkan
            teknologi Machine Learning, kami menyediakan prediksi nilai yang
            akurat dan rekomendasi strategi belajar sesuai kebutuhan.
          </p>
          <button
                onClick={openModal} // Membuka modal saat tombol diklik
                className="bg-[#B348C7] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#9A3AA8] transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
              >
                Pelajari Lebih Lanjut
              </button>
        </div>
      </div>
        {/* Modal */}
        {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay dengan efek glassmorphism */}
          <div
            className="fixed inset-0 bg-white/10 backdrop-blur-sm" // Efek glassmorphism
            onClick={closeModal} // Tutup modal saat overlay diklik
          ></div>

          {/* Konten modal */}
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative shadow-lg">
            {/* Tombol close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            {/* Judul modal */}
            <h2 className="text-2xl font-bold text-[#B348C7] mb-4">
              Cara Kerja NilaiKu
            </h2>

            {/* Isi modal */}
            <p className="text-gray-700 mb-6">
              NilaiKu menggunakan teknologi Machine Learning untuk menganalisis
              data nilai siswa dan memberikan prediksi yang akurat. Berikut adalah
              langkah-langkahnya:
              <ol className="list-decimal list-inside mt-2">
                <li>Masukkan data nilai siswa ke dalam sistem.</li>
                <li>Sistem akan menganalisis data menggunakan algoritma canggih.</li>
                <li>Hasil prediksi dan rekomendasi pembelajaran akan ditampilkan.</li>
              </ol>
            </p>

            {/* Tombol tutup modal */}
            <button
              onClick={closeModal}
              className="bg-[#B348C7] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#9A3AA8] transition-all duration-300"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
