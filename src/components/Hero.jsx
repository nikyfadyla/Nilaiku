import Navbar from "./Navbar";
import ilustration from "../assets/images/ilustration.png";
import homepage from "../assets/images/homepage.png";

const Hero = () => {
  return (
    <div id="#home" className="pb-10">
      <div
        className="landingpage h-screen pt-20 flex flex-col"
        style={{
          backgroundImage: `url(${homepage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex-grow w-full">
          <div className="hero h-full grid grid-cols-1 md:grid-cols-2 items-center pt-14 md:pt-30">
            <div className=" mx-auto md:mx-15 lg:mx-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 md:mb-7 leading-relaxed">
                Selamat Datang di NilaiKu
              </h1>
              <p className="text-base/8 mb-7 font-extralight md:font-light">
                Prediksi nilai ujian siswa dengan analisis data berbasis Machine
                Learning
              </p>
            </div>

            <div className="relative flex flex-col items-center justify-center py-20 md:py-0 px-10">
              <div className="relative w-full flex flex-col items-center mt-[-50px] md:mt-[-20px] lg:mt-[-80px]">
                <img
                  src={ilustration}
                  alt="ilustration"
                  className="w-[350px] h-[280px] sm:w-[350px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] object-contain"
                />
                <a
                  href="#"
                  className="absolute bottom-8 md:bottom-8
                bg-[#F9CB57] font-[600] md:font-[700] md:text-[15px] text-[12px] text-white md:px-7 px-4 py-2.5 md:py-3
                rounded-full shadow-md hover:bg-yellow-600  transition-all"
                >
                  Ayo mulai Prediksi, klik disini!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
