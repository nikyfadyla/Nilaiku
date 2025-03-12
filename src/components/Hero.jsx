import Navbar from "./Navbar";
import ilustration from "../assets/images/ilustration.png";
import homepage from "../assets/images/homepage.png";

const Hero = () => {
  return (
    <div
      className="landingpage min-h-screen  flex flex-col"
      style={{
        backgroundImage: `url(${homepage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />

      <div className="flex-grow w-full">
        <div className="hero h-full grid grid-cols-1 md:grid-cols-2 items-center pt-16 md:pt-32">
          {/* Left: Text */}
          <div className="px-6 md:px-12 lg:px-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-7 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </h1>
            <p className="text-base/8 mb-7 font-extralight ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
              optio necessitatibus culpa cum unde illum eaque beatae fugiat
              totam, amet quae commodi tenetur ipsa laboriosam.
            </p>
          </div>

          {/* Right: Illustration and Button */}
          <div className="relative flex flex-col items-center justify-center py-5 md:py-0">
            <div className="relative w-full flex flex-col items-center">
              <img
                src={ilustration}
                alt="ilustration"
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] object-contain"
              />
              <a
                href="#"
                className="absolute bottom-0 bg-yellow-400 font-semibold text-white px-6 sm:px-8 py-3 rounded-full shadow-md hover:bg-yellow-500 transition-all"
              >
                Ayo mulai Prediksi, klik disini!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
