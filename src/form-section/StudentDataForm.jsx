import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/nilaiku_logo.png";

function StudentDataForm() {
  const { id: urlStudentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: urlStudentId || null,
    student_id: urlStudentId || "",
    name: "",
    education: "",
    age: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [emailError, setEmailError] = useState(null); // State terpisah untuk error email
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
  });
  useEffect(() => {
    if (urlStudentId) {
      fetchStudentData();
    }
  }, [urlStudentId]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/students/${urlStudentId}`
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data.");
      }
      const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 500));
      setFormData(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // // Validasi Kolom Email
  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    //   if (name === "email" && touched.email) {
    //     if (value.length > 0 && !validateEmail(value)) {
    //       setEmailError("Format email tidak valid.");
    //     } else {
    //       setEmailError(null);
    //     }
    //   }
  };

  // Handle Blur
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validasi email ketika pengguna selesai mengetik (blur)
    //   if (name === "email") {
    //     if (value && !validateEmail(value)) {
    //       setEmailError("Format email tidak valid.");
    //     } else {
    //       setEmailError(null);
    //     }
    //   }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Validasi email saat submit form
    // if (formData.email && !validateEmail(formData.email)) {
    //   setEmailError("Format email tidak valid.");
    //   setTouched((prev) => ({ ...prev, email: true }));
    //   return;
    // }

    setIsSubmitting(true);

    try {
      const isUpdate = !!formData.id;
      const method = isUpdate ? "PUT" : "POST";
      const studentId = formData.student_id || nanoid(10);

      const url = isUpdate
        ? `http://localhost:3001/students/${formData.id}`
        : `http://localhost:3001/students`;

      const dataToSend = {
        id: formData.id,
        student_id: studentId,
        name: formData.name,
        education: formData.education,
        // email: formData.email,
        age: formData.age,
        gender: formData.gender,
      };

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Gagal mengirim data");

      const data = await response.json();

      navigate(`/student-academic/${data.student_id}`, {
        state: { student_id: data.student_id, prevData: data },
      });
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderGenderIcon = () => {
    if (formData.gender === "Laki-laki") {
      return <i className="ri-men-line text-blue-500 text-lg"></i>;
    } else if (formData.gender === "Perempuan") {
      return <i className="ri-women-line text-pink-500 text-lg"></i>;
    } else {
      return <i className="ri-user-line text-gray-400 text-lg"></i>;
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mx-auto h-16 w-16 rounded-full border-4 border-t-blue-600 border-r-indigo-600 border-b-purple-600 border-l-pink-600"
          ></motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-xl font-semibold text-gray-800"
          >
            Memuat data siswa...
          </motion.h1>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10"
      >
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
        >
          <div className="flex items-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.6 }}
            >
              <i className="ri-error-warning-line text-3xl text-red-500 mr-3"></i>
            </motion.div>
            <div>
              <p className="text-red-700 font-semibold">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded-md text-sm font-semibold hover:bg-red-200 transition-colors"
              >
                Coba Lagi
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const inputClass = {
    base: "pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 border-purple-400 focus:ring-purple-600 focus:border-purple-500 transition-all font-medium text-gray-700 duration-300 hover:shadow-sm",
    error:
      "border-red-300 focus:ring-1 focus:ring-red-600 focus:border-red-500",
  };

  const getInputClass = (isError = false) => {
    return clsx(inputClass.base, {
      [inputClass.error]: isError,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADING SECTION */}
        <div className="container">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-4">
              {urlStudentId ? "Edit Data Siswa" : "Formulir Siswa Baru"}
            </h1>
            <p className="text-gray-600">
              {urlStudentId
                ? "Perbarui Personal data Anda"
                : "Personal data anda"}
            </p>
          </motion.div>
        </div>

        {/* FORM SECTION */}

        <div className=" mx-auto max-w-xl bg-gray-50 py-6 md:px-6 px-5 rounded-lg">
          <div className=" mb-5">
            <img src={Logo} alt="Logo Nilaiku" className="max-h-15 max-w-30" />
          </div>
          <div className="flex mb-10">
            <motion.div
              animate={{
                y: [0, -5, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
            ></motion.div>
            <div>
              <h2 className="text-3xl font-bold text-purple-900 mb-2">
                {urlStudentId ? "Informasi Diri" : "Data Pribadi"}
              </h2>
              <p className="text-gray-600">
                {urlStudentId
                  ? "Perbarui data pribadi siswa"
                  : "Lengkapi data pribadi siswa"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-800">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-user-line  text-gray-400"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                  className={getInputClass()}
                />
              </div>
            </motion.div>

            {/* Education Field */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-800">
                Pendidikan Saat Ini
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-school-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Pendidikan saat ini"
                  required
                  className={getInputClass()}
                />
              </div>
            </motion.div>

            {/* Usia Siswa */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-800">
                Usia Siswa
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-calendar-event-line text-gray-400"></i>
                </div>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleChange}
                  placeholder="Usia anda saat ini"
                  required
                  className={`${getInputClass()}  `}
                />
                
              </div>
            </motion.div>

            {/* Gender */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-800">
                Jenis Kelamin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {renderGenderIcon()}
                </div>
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  required
                  className={`${getInputClass()} appearance-none`}
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                      <div className="flex items-center">
                        <i className="ri-close-circle-fill mr-2"></i>
                        <span>{error}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between">
                <div className=" flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  <span className="text-sm text-gray-500 font-light">
                    Step 1 of 2
                  </span>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 5px 15px rgba(79, 70, 229, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`flex justify-center  px-6 py-3 rounded-lg text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 transition-all duration-300 hover:border-purple-600 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      {urlStudentId ? "Perbarui Data" : "Lanjutkan"}
                      <i className="ri-arrow-right-line ml-2"></i>{" "}
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </form>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        <p>Formulir ini adalah bagian dari prediksi nilai siswa</p>
      </motion.div>
    </motion.div>
  );
}

export default StudentDataForm;
