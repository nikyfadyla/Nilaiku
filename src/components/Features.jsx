import React from "react";
import { motion } from "framer-motion";
import Interaktif from "../assets/images/interaktif.png";
import Recomendation from "../assets/images/prediksi.png";
import Prediction from "../assets/images/rekomendasi.png";

const featureItems = [
  {
    id: "prediksi",
    title: "Prediksi Nilai Otomatis",
    description: "Sistem berbasis Machine Learning untuk memprediksi nilai ujian dengan akurasi tinggi.",
    img: Prediction,
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: "analisis",
    title: "Analisis Data Interaktif",
    description: "Visualisasi grafik dan data analisis interaktif yang menunjukkan faktor-faktor kunci yang mempengaruhi performa akademik.",
    img: Interaktif,
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "rekomendasi",
    title: "Rekomendasi Pembelajaran",
    description: "Saran strategis personal untuk meningkatkan kemampuan belajar berdasarkan analisis data yang komprehensif.",
    img: Recomendation,
    color: "from-amber-500 to-yellow-400"
  }
];

const Features = () => {
  return (
    <section id="features" className="px-4 sm:px-6 py-20 mx-auto max-w-7xl">
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Fitur Utama
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
        {featureItems.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
            
            {/* Feature Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Image Container with Floating Effect */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6 overflow-hidden rounded-lg bg-white p-4 shadow-inner"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-auto object-contain mx-auto"
                  style={{ filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.1))" }}
                />
              </motion.div>

          
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
              </div>
          
            </div>

            
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm"></div>
          </motion.div>
        ))}
      </div>

      {/* Floating Animation for Background Elements */}
      <div className="absolute left-0 right-0 -z-10 overflow-hidden opacity-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-400 mix-blend-multiply filter blur-xl animate-float-slow"></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 rounded-full bg-amber-300 mix-blend-multiply filter blur-xl animate-float-medium"></div>
        <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-blue-400 mix-blend-multiply filter blur-xl animate-float-fast"></div>
      </div>
    </section>
  );
};

export default Features;