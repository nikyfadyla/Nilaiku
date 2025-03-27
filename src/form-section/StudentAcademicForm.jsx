import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "remixicon/fonts/remixicon.css"; // Import Remix Icon CSS

const StudentAcademicForm = () => {
  const { student_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { prevData } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [academicData, setAcademicData] = useState(null);
  const [academicId, setAcademicId] = useState(null);

  // Ubah konfigurasi useForm
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
    const fetchAcademicData = async () => {
      try {
        setFetchLoading(true);
        const response = await fetch(
          `http://localhost:3001/student-academic?student_id=${student_id}`
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data akademik");
        }

        const data = await response.json();

        if (data && data.length > 0) {
          setAcademicData(data[0]);
          setAcademicId(data[0].id);

          reset({
            student_id: data[0].student_id,
            hours_studied: data[0].hours_studied,
            attendance: data[0].attendance,
            previous_scores: data[0].previous_scores,
            sleep_hours: data[0].sleep_hours,
            tutoring_sessions: data[0].tutoring_sessions,
            motivation_level: data[0].motivation_level,
            parental_involvement: data[0].parental_involvement,
            learning_disabilities: data[0].learning_disabilities,
            teacher_quality: data[0].teacher_quality,
            physical_activity: data[0].physical_activity,
          });
        } else {
          reset({
            student_id: student_id || "",
            hours_studied: "",
            attendance: "",
            previous_scores: "",
            sleep_hours: "",
            tutoring_sessions: "",
            motivation_level: "Medium",
            parental_involvement: "Medium",
            learning_disabilities: "No",
            teacher_quality: "Medium",
            physical_activity: "",
          });
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setTimeout(() => {
          setFetchLoading(false);
        }, 2000);
      }
    };

    fetchAcademicData();
  }, [student_id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formDataToSubmit = { ...data };
    const numericFields = [
      "hours_studied",
      "attendance",
      "previous_scores",
      "sleep_hours",
      "tutoring_sessions",
      "physical_activity",
    ];

    numericFields.forEach((field) => {
      formDataToSubmit[field] = formDataToSubmit[field]
        ? Number(formDataToSubmit[field])
        : 0;
    });

    // Tentukan method dan URL berdasarkan apakah ini update atau create
    const isUpdate = !!academicId;
    const method = isUpdate ? "PUT" : "POST";
    const url = isUpdate
      ? `http://localhost:3001/student-academic/${academicId}`
      : `http://localhost:3001/student-academic/`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.message || "Gagal mengirim data");
      }

      console.log("Navigating to student detail...");
      setSuccess(true);
      navigate(`/student-detail/${student_id}`);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/students?student_id=${student_id}`
      );
      const data = await response.json();

      if (data.length === 0) {
        throw new Error("Data not found");
      }

      navigate(`/student-data/${data[0].id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengambil data");
    }
  };

  const InputField = ({
    label,
    name,
    type = "number",
    defaultValue = "",
    icon,
  }) => (
    <div className="relative min-h-[70px] pb-4">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
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
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm ${
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

  const DropdownField = ({ label, name, options, defaultValue = "", icon }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
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
          className={`w-full px-4 py-3 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 ${
            icon ? "pl-10" : ""
          } hover:border-blue-400`}
          defaultValue={defaultValue}
          {...register(name)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <i className="ri-arrow-down-s-line"></i>
        </div>
      </div>
    </div>
  );

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-semibold flex items-center space-x-3 bg-white p-6 rounded-lg shadow-md">
          <i className="ri-loader-4-line animate-spin text-blue-500 text-2xl"></i>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-8">
          <h2 className="text-2xl font-bold text-center text-white flex items-center justify-center space-x-3">
            <i className="ri-book-line text-3xl"></i>
            <span>
              {academicId
                ? "Edit Data Akademik Siswa"
                : "Form Input Data Akademik Siswa"}
            </span>
          </h2>
        </div>

        <div className="p-8">
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 flex items-center">
              <i className="ri-checkbox-circle-line text-green-500 text-xl mr-2"></i>
              <span>
                Data berhasil {academicId ? "diperbarui" : "dikirim"}!
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 flex items-center">
              <i className="ri-error-warning-line text-red-500 text-xl mr-2"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                label="Jam Belajar per Minggu"
                name="hours_studied"
                icon="time-line"
              />
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
                label="Jumlah Sesi Bimbingan"
                name="tutoring_sessions"
                icon="group-line"
              />
              <DropdownField
                label="Tingkat Motivasi"
                name="motivation_level"
                options={["Low", "Medium", "High"]}
                icon="mental-health-line"
              />
              <DropdownField
                label="Keterlibatan Orangtua"
                name="parental_involvement"
                options={["Low", "Medium", "High"]}
                icon="parent-line"
              />
              <InputField
                label="Jam Tidur per Malam"
                name="sleep_hours"
                icon="zzz-line"
              />
              <InputField
                label="Jam Aktivitas Fisik"
                name="physical_activity"
                icon="run-line"
              />
              <DropdownField
                label="Kesulitan Belajar"
                name="learning_disabilities"
                options={["Yes", "No"]}
                icon="brain-line"
              />
              <DropdownField
                label="Kualitas Guru"
                name="teacher_quality"
                options={["Low", "Medium", "High"]}
                icon="user-star-line"
              />
            </div>

            <div className="pt-6 border-t border-gray-200 mt-8">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
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
                  ) : academicId ? (
                    <>
                      <i className="ri-refresh-line mr-2"></i>
                      Perbarui Data
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAcademicForm;
