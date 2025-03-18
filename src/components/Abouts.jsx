import React from "react";
import aboutImg from "../assets/images/student.png";

const About = () => {
  return (
    <div id="about" className="px-4 pb-20 mx-auto pt-34">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div>
          <img
            src={aboutImg}
            alt="about"
            className="lg:w-[500px] w-350 mx-auto"
          />
        </div>
        <div className="px-10">
          <h1 className="lg:text-4xl/tight text-3xl font-semibold mb-5">
            Apa itu
            <span className="font-bold text-orange-300 underline"> NilaiKu?</span>
          </h1>
          <p className="text-xl/loose  font-extralight">
            NilaiKu adalah aplikasi prediksi nilai ujian berbasis website yang
            dikembangkan untuk membantu siswa memahami faktor-faktor yang
            berpengaruh pada nilai ujian. Dengan memanfaatkan teknologi Machine
            Learning, kami menyediakan prediksi nilai yang akurat dan
            rekomendasi strategi belajar sesuai kebutuhan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
