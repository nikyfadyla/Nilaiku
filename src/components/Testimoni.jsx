import { Quote } from "lucide-react";  
import React from "react";

const Testimoni = () => {
  const testimonials = [
    {
      name: "Pelanggan 1",
      text: "Pelayanan sangat memuaskan, kualitas luar biasa!",
    },
    {
      name: "Pelanggan 2",
      text: "Sangat senang dengan pengalaman berbelanja di sini.",
    },
    {
      name: "Pelanggan 3",
      text: "Rekomendasi terbaik untuk semua orang!",
    },
    {
      name: "Pelanggan 4",
      text: "Produk sangat berkualitas dan pengiriman cepat!",
    },
    {
      name: "Pelanggan 5",
      text: "Harga bersaing dan pelayanan ramah, sangat direkomendasikan!",
    },
    {
      name: "Pelanggan 6",
      text: "Proses belanja sangat mudah, pasti akan membeli lagi!",
    },
  ];

  return (
    <div className="py-12 mb-20 mx-auto max-w-6xl px-4">
      <h2
        className="text-3xl font-semibold mb-10 text-center text-purple-600  
"
      >
        Testimoni
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="mx-auto overflow-hidden transition-transform hover:scale-105 duration-300"
            data-aos="flip-down"
          >
            <div className="relative bg-white border border-purple-400 px-7 py-10 rounded-lg shadow-lg">
              {/* Ikon Kutipan */}
              <Quote className="absolute top-5 left-5 text-purple-400 opacity-50 w-8 h-8" />

              {/* Isi Kartu */}
              <h3 className="text-center pb-2 font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-gray-700 text-base text-center italic">
                "{item.text}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimoni;
