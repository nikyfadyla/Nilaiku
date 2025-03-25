import React from "react";
import ilustrasi from "../assets/images/profile.png";

const Team = () => {
  // Data tim beserta link GitHub
  const teamMembers = [
    {
      name: "Fendy Rahmat",
      role: "Machine Learning",
      github: "https://github.com/fendyrahmat",
    },
    {
      name: "Muhammad Firdaus Alfatah",
      role: "Machine Learning",
      github: "https://github.com/HeyFirdash",
    },
    {
      name: "Rendy Pratama",
      role: "Back-End Developer",
      github: "https://github.com/rendypratama",
    },
    {
      name: "Niky Fadyla",
      role: "Front-End Developer",
      github: "https://github.com/nikyfadyla",
    },
    {
      name: "Muhammad Riffa Faturahman",
      role: "Front-End Developer",
      github: "https://github.com/faturahaman",
    },
    {
      name: "Firza Aftan Hidayat",
      role: "Back-End Developer",
      github: "https://github.com/GisatAZK2",
    },
  ];

  return (
    <div>
      <section id="team" className="py-30 mx-auto md:mx-15">
        <h2 className="mb-15 md:mb-25 text-center text-purple-500 text-2xl font-bold">
          Team Proyek
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="max-w-xs w-full rounded-lg mx-auto overflow-hidden flex flex-col items-center relative group"
              data-aos="flip-down"
              data-aos-duration={1600 - index * 100} // Animasi berbeda untuk setiap card
            >
              {/* Container gambar */}
              <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center rounded-lg">
                <img
                  src={ilustrasi}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Overlay dengan ikon GitHub */}
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

              {/* Informasi tim */}
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