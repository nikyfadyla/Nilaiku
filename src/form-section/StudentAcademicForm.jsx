import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/nilaiku_logo.png";

const StudentAcademicForm = () => {
  // Get ID from URL parameters
  const { id: urlStudentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data from navigation state
  const { student_id: stateStudentId, prevData } = location.state || {};

  // Use ID from URL or from state to ensure we always have a valid ID
  const studentId = urlStudentId || stateStudentId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // State untuk daftar mata pelajaran
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [subjectsError, setSubjectsError] = useState(null);

  const locUrl = import.meta.env.VITE_API_LOCAL_URL;
  const pubUrl = import.meta.env.VITE_API_PUBLIC_URL;
  const subjectsApiUrl = `${locUrl}/api/v1/subjects`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    // Validasi studentId

    // Inisialisasi form dengan nilai default
    reset({
      subject_id: "",
      attendance: "",
      hours_studied: "",
      previous_scores: "",
      sleep_hours: "",
      tutoring_sessions: "",
      peer_influence: "Netral",
      motivation_level: "Medium",
      teacher_quality: "Biasa",
      acces_to_resources: "",
    });
  }, [reset, studentId]);

  // Effect untuk mengambil daftar mata pelajaran
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!studentId) return; // Hanya fetch jika ada student ID yang valid

      setSubjectsLoading(true);
      setSubjectsError(null);
      try {
        const response = await fetch(`${locUrl}/api/v1/subjects`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();

        // Memeriksa struktur data dan mengekstrak array subjects
        if (
          responseData &&
          responseData.subjects &&
          Array.isArray(responseData.subjects)
        ) {
          setSubjects(responseData.subjects);
        } else {
          console.error("Unexpected subjects data structure:", responseData);
          throw new Error("Format data mata pelajaran tidak valid");
        }
      } catch (err) {
        setSubjectsError(err.message);
        console.error("Error fetching subjects:", err);
      } finally {
        setSubjectsLoading(false);
      }
    };

    fetchSubjects();
  }, [locUrl, studentId]);

  const onSubmit = async (data) => {
    // Double-check studentId
    if (!studentId) {
      setError(
        "ID Siswa tidak tersedia. Silakan kembali ke formulir sebelumnya."
      );
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formDataToSubmit = {
      ...data,
      student_id: studentId,
    };

    console.log("Mengirim data akademik:", formDataToSubmit);

    const numericFields = [
      "attendance",
      "hours_studied",
      "previous_scores",
      "sleep_hours",
      "tutoring_sessions",
    ];

    numericFields.forEach((field) => {
      formDataToSubmit[field] = formDataToSubmit[field]
        ? Number(formDataToSubmit[field])
        : 0;
    });

    try {
      const response = await fetch(`${locUrl}/api/v1/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.message || "Gagal mengirim data");
      }

      console.log("Navigating to student detail...");
      setSuccess(true);

      // Navigasi dengan studentId yang valid
      navigate(`/student-detail/${studentId}`);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Kembali ke halaman data siswa dengan ID yang valid
    navigate(`/student-data/${studentId}`);
  };

  // Input Type Field
  const InputField = ({
    label,
    name,
    type = "number",
    defaultValue = "",
    icon,
  }) => (
    <div className="relative min-h-[70px] pb-4">
      <label htmlFor={name} className="block mb-1 font-semibold text-gray-800">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500">
            <i className={`ri-${icon}`}></i>
          </span>
        )}
        <input
          id={name}
          type="number"
          className={`w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm ${
            icon ? "pl-10" : ""
          } hover:border-blue-400`}
          inputMode="numeric"
          defaultValue={defaultValue}
          {...register(name, {
            ...(name === "previous_scores" && {
              max: {
                value: 100,
                message: "Nilai sebelumnya tidak boleh melebihi 100",
              },
              min: {
                value: 0,
                message: "Nilai sebelumnya tidak boleh kurang dari 0",
              },
            }),
            ...(name === "attendance" && {
              max: {
                value: 100,
                message: "Kehadiran tidak boleh melebihi 100%",
              },
              min: {
                value: 0,
                message: "Kehadiran tidak boleh kurang dari 0%",
              },
            }),
          })}
        />
      </div>

      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );

  // Dropdown Option Field untuk Mata Pelajaran
  const SubjectDropdownField = () => (
    <div>
      <label
        className="block text-gray-800 font-semibold mb-2"
        htmlFor="subject_id"
      >
        Pilih Mata Pelajaran:
      </label>
      <div className="relative">
        <select
          id="subject_id"
          className={`w-full px-4 py-3 appearance-none border text-gray-700 font-medium border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-blue-400`}
          {...register("subject_id", {
            required: "Mata pelajaran harus dipilih",
          })}
          defaultValue=""
        >
          <option value="">-- Pilih Mata Pelajaran --</option>
          {subjectsLoading ? (
            <option disabled>Memuat mata pelajaran...</option>
          ) : subjectsError ? (
            <option disabled>
              Error memuat mata pelajaran: {subjectsError}
            </option>
          ) : subjects && subjects.length > 0 ? (
            subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))
          ) : (
            <option disabled>Tidak ada mata pelajaran</option>
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-900">
          <i className="ri-arrow-down-s-line"></i>
        </div>
      </div>
      {errors.subject_id && (
        <span className="text-red-500 text-sm">
          {errors.subject_id.message}
        </span>
      )}
    </div>
  );

  // Dropdown Option Field (Generic)
  const DropdownField = ({ label, name, options, defaultValue = "", icon }) => (
    <div>
      <label className="block text-gray-800 font-semibold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <i className={`ri-${icon}`}></i>
          </span>
        )}
        <select
          id={name}
          className={`w-full px-4 py-3 appearance-none border text-gray-700 font-medium border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 ${
            icon ? "pl-10" : ""
          } hover:border-blue-400`}
          defaultValue={defaultValue}
          {...register(name)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-900">
          <i className="ri-arrow-down-s-line"></i>
        </div>
      </div>
    </div>
  );

  return (
    // Form Section
    <div className="min-h-screen py-25 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header section */}
        <div className="pt-10 pb-4 px-10">
          <div className="mb-5">
            <img src={Logo} alt="Logo Nilaiku" className="max-h-15 max-w-30" />
          </div>
          <h2 className="text-3xl font-bold text-purple-800 flex space-x-3 mb-4">
            <span>Data Akademik Siswa</span>
          </h2>
          <p className="text-gray-600">lengkapi data akademik anda</p>
        </div>

        <div className="p-8">
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 flex items-center">
              <i className="ri-checkbox-circle-line text-green-500 text-xl mr-2"></i>
              <span>Data berhasil dikirim!</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 flex items-center">
              <i className="ri-error-warning-line text-red-500 text-xl mr-2"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Form Input */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SubjectDropdownField />
              <InputField
                label="Persentase Kehadiran (%)"
                name="attendance"
                icon="user-follow-line"
                validation={{
                  validate: (value) => {
                    const numValue = Number(value);
                    return numValue <= 100 || "Nilai tidak boleh melebihi 100";
                  },
                }}
              />
              <InputField
                label="Jam Belajar per Minggu"
                name="hours_studied"
                icon="time-line"
                step="0.1"
              />
              <InputField
                label="Nilai Ujian Sebelumnya"
                name="previous_scores"
                icon="bar-chart-grouped-line"
                validation={{
                  validate: (value) => {
                    const numValue = Number(value);
                    return numValue <= 100 || "Nilai tidak boleh melebihi 100";
                  },
                }}
              />

              <InputField
                label="Jam Tidur per Malam"
                name="sleep_hours"
                icon="zzz-line"
              />

              <InputField
                label="Jumlah Sesi Bimbingan"
                name="tutoring_sessions"
                icon="group-line"
              />

              <DropdownField
                label="Pengaruh Teman Sekitar"
                name="peer_influence"
                options={[
                  { label: "Positif", value: "positive" },
                  { label: "Biasa", value: "medium" },
                  { label: "Negatif", value: "negative" },
                ]}
                icon="group-3-line"
              />
              <DropdownField
                label="Tingkat Motivasi"
                name="motivation_level"
                options={[
                  { label: "Rendah", value: "low" },
                  { label: "Biasa", value: "medium" },
                  { label: "Tinggi", value: "high" },
                ]}
                icon="mental-health-line"
              />

              <DropdownField
                label="Kualitas Guru"
                name="teacher_quality"
                options={[
                  { label: "Rendah", value: "low" },
                  { label: "Biasa", value: "medium" },
                  { label: "Tinggi", value: "high" },
                ]}
                icon="user-star-line"
              />
              <DropdownField
                label="Akses Terhadap Sumber Daya Pendidikan"
                name="acces_to_resources"
                options={[
                  { label: "Mudah", value: "low" },
                  { label: "Biasa", value: "medium" },
                  { label: "Sulit", value: "high" },
                ]}
                icon="book-open-line"
              />
            </div>

            {/* Button Section */}
            <div className="pt-6 border-t border-gray-200 mt-8 ">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span className="text-sm text-gray-500 font-light">
                    Step 2 of 2
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBack}
                    type="button"
                    className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 shadow-md"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line mr-2"></i>
                        Kirim Data
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAcademicForm;
