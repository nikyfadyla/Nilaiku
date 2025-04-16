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

  const [predictionResult, setPredictionResult] = useState(null);
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
      acces_to_resources: "Biasa",
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
          Accept: "application/json",
        },
        body: JSON.stringify(formDataToSubmit),
      });
      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.message || "Gagal mengirim data");
      }

      setPredictionResult(data);
      console.log(data);

      console.log("Navigating to student detail...");
      setSuccess(true);

      // Navigasi dengan studentId yang valid
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
      <label htmlFor={name} className="block mb-2 font-medium text-gray-700">
        {label}
      </label>

      <div className="relative group">
        {icon && (
          <span className="absolute top-1/2 -translate-y-1/2 left-3 text-indigo-500 text-lg">
            <i className={`ri-${icon}`}></i>
          </span>
        )}
        <input
          id={name}
          type="number"
          className={`w-full px-4 py-3 border-2 border-gray-200 text-gray-800 font-medium rounded-lg focus:ring-3 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm ${
            icon ? "pl-10" : ""
          } hover:border-indigo-300 outline-none`}
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
        <span className="text-rose-500 text-sm mt-1 block">
          {errors[name].message}
        </span>
      )}
    </div>
  );

  // Dropdown Option Field untuk Mata Pelajaran
  const SubjectDropdownField = () => (
    <div>
      <label
        className="block text-gray-700 font-medium mb-2"
        htmlFor="subject_id"
      >
        Pilih Mata Pelajaran:
      </label>
      <div className="relative group">
        <select
          id="subject_id"
          className={`w-full px-4 py-3 appearance-none border-2 text-gray-800 font-medium border-gray-200 rounded-lg focus:ring-3 focus:ring-indigo-200 focus:border-indigo-500 bg-white shadow-sm transition-all duration-200 hover:border-indigo-300 outline-none`}
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-500">
          <i className="ri-arrow-down-s-line text-lg"></i>
        </div>
      </div>
      {errors.subject_id && (
        <span className="text-rose-500 text-sm mt-1 block">
          {errors.subject_id.message}
        </span>
      )}
    </div>
  );

  // Dropdown Option Field (Generic)
  const DropdownField = ({ label, name, options, defaultValue = "", icon }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-500">
            <i className={`ri-${icon} text-lg`}></i>
          </span>
        )}
        <select
          id={name}
          className={`w-full px-4 py-3 appearance-none border-2 text-gray-800 font-medium border-gray-200 rounded-lg focus:ring-3 focus:ring-indigo-200 focus:border-indigo-500 bg-white shadow-sm transition-all duration-200 ${
            icon ? "pl-10" : ""
          } hover:border-indigo-300 outline-none`}
          defaultValue={defaultValue}
          {...register(name)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-500">
          <i className="ri-arrow-down-s-line text-lg"></i>
        </div>
      </div>
    </div>
  );

  return (
    // Form Section
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
        {/* Header section */}
        <div className="pt-10 pb-6 px-10 bg-gradient-to-br from-violet-50 to-indigo-50">
          <div className="mb-5">
            <img 
              src={Logo} 
              alt="Logo Nilaiku" 
              className="max-h-16 max-w-32 drop-shadow-sm" 
            />
          </div>
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">
            Data Akademik Siswa
          </h2>
          <p className="text-gray-600 flex items-center">
            <i className="ri-information-line mr-2 text-indigo-500"></i>
            Lengkapi data akademik untuk mendapatkan prediksi nilai
          </p>
        </div>

        <div className="p-8 lg:p-10">
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 flex items-center animate-fade-in">
              <i className="ri-checkbox-circle-line text-green-500 text-xl mr-2"></i>
              <span className="font-medium">Data berhasil dikirim!</span>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-4 rounded-md mb-6 flex items-center animate-fade-in">
              <i className="ri-error-warning-line text-rose-500 text-xl mr-2"></i>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Form Input */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
                      { label: "Biasa", value: "neutral" },
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
                    name="access_to_resources"
                    options={[
                      { label: "Mudah", value: "low" },
                      { label: "Biasa", value: "medium" },
                      { label: "Sulit", value: "high" },
                    ]}
                    icon="book-open-line"
                  />
                </div>

                {/* Button Section */}
                <div className="pt-6 border-t border-gray-200 mt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 sm:mb-0">
                      <div className="w-3 h-3 bg-gray-300 rounded-full" />
                      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-500 font-medium">
                        Step 2 of 2
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <button
                        onClick={handleBack}
                        type="button"
                        className="flex items-center justify-center px-6 py-3 bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-300 shadow-sm font-medium"
                      >
                        <i className="ri-arrow-left-line mr-2"></i>
                        Kembali
                      </button>
                      <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-md font-medium"
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

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 h-fit">
              <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <i className="ri-bar-chart-box-line mr-2"></i>
                  Hasil Prediksi
                </h2>
                <p className="text-indigo-100 mt-1 text-sm">
                  Detail hasil prediksi akademik
                </p>
              </div>

              <div className="p-5">
                {predictionResult ? (
                  <div className="space-y-6">
                    {/* Predicted Score */}
                    <div className="text-center p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                      <h3 className="font-medium text-gray-700">Prediksi Nilai</h3>
                      <div className="text-4xl font-bold text-indigo-600 mt-2">
                        {parseFloat(
                          predictionResult.prediction_result.predicted_score
                        ).toFixed(2)}
                      </div>
                      <div className="text-md font-medium text-emerald-600 mt-2 bg-emerald-50 py-1 px-3 rounded-full inline-block">
                        {predictionResult.prediction_result.recommendation}
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                        <i className="ri-user-line mr-2 text-indigo-500"></i>
                        Informasi Siswa
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Nama</div>
                          <div className="font-medium text-gray-800">
                            {predictionResult.student.name}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">ID</div>
                          <div className="font-medium text-gray-800">
                            {predictionResult.student.id}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Usia</div>
                          <div className="font-medium text-gray-800">
                            {predictionResult.student.age}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Jenis Kelamin</div>
                          <div className="font-medium text-gray-800">
                            {predictionResult.student.gender}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 col-span-2">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Pendidikan</div>
                          <div className="font-medium text-gray-800">
                            {predictionResult.student.education}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input Record - Simplified to show only key data */}
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                        <i className="ri-database-2-line mr-2 text-indigo-500"></i>
                        Data Input Kunci
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 rounded-lg bg-indigo-50">
                          <span className="text-sm font-medium text-gray-600">Kehadiran:</span>
                          <span className="font-medium text-indigo-700">{predictionResult.record.attendance}%</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50">
                          <span className="text-sm font-medium text-gray-600">Jam Belajar:</span>
                          <span className="font-medium text-purple-700">{predictionResult.record.hours_studied} jam</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-indigo-50">
                          <span className="text-sm font-medium text-gray-600">Nilai Sebelumnya:</span>
                          <span className="font-medium text-indigo-700">{predictionResult.record.previous_scores}</span>
                        </div>
                      </div>
                    </div>

                    {/* Prediction Date */}
                    <div className="border-t border-gray-100 pt-4 text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Tanggal Prediksi</div>
                      <div className="text-sm font-medium text-gray-700 mt-1">
                        {new Date(
                          predictionResult.prediction_result.prediction_date
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 py-12">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-500 mb-4">
                      <i className="ri-file-chart-line text-3xl"></i>
                    </div>
                    <p className="mt-2 text-gray-600 text-center font-medium">
                      Isi form dan kirim untuk melihat hasil prediksi
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Data akademik akan diproses untuk memberikan estimasi nilai
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-600 text-sm font-medium">
        &copy; 2025 Sistem Prediksi Nilai Akademik - Dibuat dengan 
        <i className="ri-reactjs-line mx-1 text-blue-500"></i> ReactJS dan
        <i className="ri-tailwind-css-line mx-1 text-teal-500"></i> Tailwind CSS
      </div>
    </div>
  );
};

export default StudentAcademicForm;