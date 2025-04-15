import React from "react";
import FendyImage from "../assets/images/1.png";
import FirdausImage from "../assets/images/2.png";
import RendyImage from "../assets/images/5.png";
import NikyImage from "../assets/images/4.png";
import RiffaImage from "../assets/images/3.png";
import FirzaImage from "../assets/images/6.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Fendy Rahmat",
      role: "Machine Learning",
      github: "https://github.com/Fendy006",
      image: FendyImage,
    },
    {
      name: "Muhammad Firdaus Alfatah",
      role: "Machine Learning",
      github: "https://github.com/HeyFirdash",
      image: FirdausImage,
    },
    {
      name: "Rendy Pratama",
      role: "Back-End Developer",
      github: "http://github.com/RidyCh",
      image: RendyImage,
    },
    {
      name: "Niky Fadyla",
      role: "Front-End Developer",
      github: "https://github.com/nikyfadyla",
      image: NikyImage,
    },
    {
      name: "Muhammad Riffa Faturahman",
      role: "Front-End Developer",
      github: "https://github.com/faturahaman",
      image: RiffaImage,
    },
    {
      name: "Firza Aftan Hidayat",
      role: "Back-End Developer",
      github: "https://github.com/GisatAZK2",
      image: FirzaImage,
    },
  ];

  return (
    <div>
      <section id="team" className="py-30 mx-auto md:mx-15">
        <h2 className="text-3xl text-center md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Proyek Tim
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="max-w-xs w-full rounded-lg mx-auto overflow-hidden flex flex-col items-center relative group"
              data-aos="flip-down"
              data-aos-duration={1600 - index * 100}
            >
              {/* Image container */}
              <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* GitHub overlay */}
              <div className="absolute border-1 border-purple-800 inset-0 bg-purple-100/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-8xl hover:text-purple-500 transition-colors duration-300"
                >
                  <i className="ri-github-fill"></i>
                </a>
              </div>

              {/* Team info */}
              <div className="py-4 text-center w-full min-h-[80px]">
                <h2 className="text-xl font-medium text-purple-500 mb-1">
                  {member.name}
                </h2>
                <p className="text-gray-800 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
