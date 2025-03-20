import React from "react";
import ilustrasi from "../assets/images/profile.png";

const Team = () => {
  return (
    <div>
      <section id="team" className="py-30 mx-auto md:mx-15">
        <h2 className="mb-15 md:mb-25 text-center text-purple-500 text-2xl">
          Team Proyek
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Fendy */}
          <div className="max-w-xs w-full rounded-lg mx-auto overflow-hidden  flex flex-col items-center">
            <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center">
              <img
                src={ilustrasi}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-4 text-center w-full min-h-[80px]">
              <h2 className="text-xl font-medium text-purple-500 mb-1">
                Fendy Rahmat
              </h2>
              <p className="text-gray-800 text-sm">Machine Learning</p>
            </div>
          </div>
          {/* Firdaus */}
          <div className="max-w-xs w-full rounded-lg mx-auto overflow-hidden flex flex-col items-center">
            <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center">
              <img
                src={ilustrasi}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-4 text-center w-full min-h-[80px]">
              <h2 className="text-xl font-medium text-purple-500 mb-1">
                Muhammad Firdaus Alfatah
              </h2>
              <p className="text-gray-800 text-sm">Machine Learning</p>
            </div>
          </div>
          {/* Rendy */}
          <div className="max-w-xs w-full rounded-lg mx-auto overflow-hidden  flex flex-col items-center">
            <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center">
              <img
                src={ilustrasi}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-4 text-center w-full min-h-[80px]">
              <h2 className="text-xl font-medium text-purple-500 mb-1">
                Rendy Pratama
              </h2>
              <p className="text-gray-800 text-sm">Back-End Developer</p>
            </div>
          </div>
          {/* Niky */}
          <div className="max-w-xs w-full rounded-lg mx-auto overflow-hidden  flex flex-col items-center">
            <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center">
              <img
                src={ilustrasi}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-4 text-center w-full min-h-[80px]">
              <h2 className="text-xl font-medium text-purple-500 mb-1">
                Niky Fadyla
              </h2>
              <p className="text-gray-800 text-sm">Front-End Developer</p>
            </div>
          </div>
          {/* Riffa */}
          <div className="max-w-xs w-full rounded-lg mx-auto overflow-hidden flex flex-col items-center">
            <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center">
              <img
                src={ilustrasi}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-4 text-center w-full min-h-[80px]">
              <h2 className="text-xl font-medium text-purple-500 mb-1">
                Muhammad Riffa Faturahman
              </h2>
              <p className="text-gray-800 text-sm">Front-End Developer</p>
            </div>
          </div>
          {/* Firza */}
          <div className="max-w-xs w-full rounded-lg mx-auto overflow-hidden  flex flex-col items-center">
            <div className="bg-gray-200 p-4 w-64 h-64 flex justify-center">
              <img
                src={ilustrasi}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-4 text-center w-full min-h-[80px]">
              <h2 className="text-xl font-medium text-purple-500 mb-1">
                Firza Aftan Hidayat
              </h2>
              <p className="text-gray-800 text-sm">Back-End Developer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
