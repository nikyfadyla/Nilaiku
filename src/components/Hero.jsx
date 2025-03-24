import React, { useState } from "react";
import ilustration from "../assets/images/ilustration.png"; // Import gambar ilustrasi

const Hero = () => {
  // State untuk mengontrol apakah modal terbuka atau tidak
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Section Hero dengan ID `#home` untuk navigasi
    <div id="#home" className="pb-10">
      {/* Container untuk landing page dengan background gradien */}
      <div className="landingpage h-screen pt-20 flex flex-col md:m-0 px-4 bg-gradient-to-b from-[#F9F6FF] to-[#E8D7FF] px-5 md:px-0">
        {/* Flex container untuk konten hero */}
        <div className="flex-grow w-full">
          {/* Grid layout untuk konten hero (1 kolom di mobile, 2 kolom di desktop) */}
          <div className="hero h-full grid grid-cols-1 md:grid-cols-2 pt-14 md:pt-30 gap-8">
            {/* Bagian kiri: Judul dan deskripsi */}
            <div
              className="mx-auto md:mx-15 lg:mx-20 flex flex-col justify-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {/* Judul utama */}
              <h1 className="text-[#B348C7] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Selamat Datang di Nilai
                <span className="text-[#F3BC55]">Ku</span> {/* Warna teks yang berbeda untuk "Ku" */}
              </h1>
              {/* Deskripsi */}
              <p className="text-lg md:text-xl text-gray-700 mb-8 font-light">
                Prediksi nilai ujian siswa dengan analisis data berbasis Machine
                Learning. Dapatkan rekomendasi pembelajaran yang tepat untuk
                meningkatkan prestasi akademik Anda.
              </p>
              {/* Tombol CTA tambahan */}
              <button
                onClick={openModal} // Membuka modal saat tombol diklik
                className="bg-[#B348C7] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#9A3AA8] transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Bagian kanan: Gambar ilustrasi dan tombol CTA (Call to Action) */}
            <div className="relative flex flex-col justify-center py-20 md:py-0 px-10">
              {/* Container untuk gambar ilustrasi dan tombol */}
              <div
                className="relative w-full flex flex-col items-center mt-[-50px] md:mt-[-20px] lg:mt-[-80px]"
                data-aos="fade-left" // Animasi fade-left menggunakan AOS
                data-aos-duration="1000" // Durasi animasi 1000ms
              >
                {/* Gambar ilustrasi dengan animasi floating */}
                <img
                  src={ilustration} // Sumber gambar ilustrasi
                  alt="ilustration" // Teks alternatif untuk aksesibilitas
                  className="w-[350px] h-[280px] sm:w-[400px] sm:h-[300px] md:w-[450px] md:h-[350px] lg:w-[500px] lg:h-[400px] object-contain transform hover:scale-105 transition-transform duration-300 floating-image" // Tambahkan class floating-image
                />
                {/* Tombol CTA (Call to Action) */}
                <a
                  href="#"
                  className="absolute bottom-8 md:bottom-12
                bg-[#F9CB57] font-[600] md:font-[700] md:text-[16px] text-[14px] text-white md:px-8 px-6 py-3 md:py-4
                rounded-full shadow-lg hover:bg-[#E8B84C] hover:shadow-xl transition-all duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"
                >
                  Ayo mulai Prediksi, klik disini!
                </a>
              </div>
            </div>
          </div>
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
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Tambahkan keyframes untuk animasi floating */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }

          .floating-image {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Hero; 