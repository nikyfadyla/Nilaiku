import React from "react";
import aboutImg from "../assets/images/student.png";

const About = () => {
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
        </div>
      </div>
    </div>
  );
};

export default About;
