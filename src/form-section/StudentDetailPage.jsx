import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentDetailPage = () => {
  const { student_id } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);
  const [academicData, setAcademicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jsonServerId, setJsonServerId] = useState(null);
  const [score, setScore] = useState(null);
  const [learningRecommendation, setLearningRecommendation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const studentResponse = await fetch(
          `http://localhost:3001/students?student_id=${student_id}`
        );

        if (!studentResponse.ok) {
          throw new Error("Gagal mengambil data siswa");
        }

        const studentDataResults = await studentResponse.json();

        if (studentDataResults.length === 0) {
          throw new Error("Data siswa tidak ditemukan");
        }

        const studentDataResult = studentDataResults[0];
        setStudentData(studentDataResult);
        setJsonServerId(studentDataResult.id);

        const academicResponse = await fetch(
          `http://localhost:3001/student-academic?student_id=${student_id}`
        );

        if (!academicResponse.ok) {
          throw new Error("Gagal mengambil data akademik");
        }

        const academicDataResult = await academicResponse.json();

        if (academicDataResult && academicDataResult.length > 0) {
          const academicResult = academicDataResult[0];
          setAcademicData(academicResult);

          // FINAL SCORE SECTION

          const previousScore = parseFloat(academicResult.previous_scores) || 0;
          const attendance = parseFloat(academicResult.attendance) || 0;

          const finalScore = (previousScore * 0.4 + attendance * 0.6).toFixed(2);
          setScore(finalScore);

          const recommendationResponse = await fetch(
            `http://localhost:3001/learning_recommendations`
          );

          if (!recommendationResponse.ok) {
            throw new Error("Gagal mengambil rekomendasi belajar");
          }

          const recommendations = await recommendationResponse.json();
          const recommendation = recommendations.find(
            (rec) => finalScore >= rec.min_score && finalScore < rec.max_score
          );

          setLearningRecommendation(recommendation);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student_id]);

  const handleEdit = () => {
    if (jsonServerId) {
      navigate(`/student-data/${jsonServerId}`);
    } else {
      console.error("JSON Server ID tidak tersedia");
      alert("Gagal mengedit: ID tidak tersedia");
    }
  };

  const handleEditAcademic = () => {
    navigate(`/student-academic/${student_id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };


  // Learning Recommendation Section
  const renderLearningRecommendation = () => {
    if (!learningRecommendation) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Rekomendasi Belajar
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
            <img
              src={learningRecommendation.imageUrl}
              alt={learningRecommendation.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {learningRecommendation.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {learningRecommendation.description}
            </p>
            <a
              href={learningRecommendation.learningResourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block"
            >
              Mulai Belajar
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-blue-600 animate-pulse">
          Memuat data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-30">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 border-b-2 border-blue-500 pb-4">
          Detail Data Siswa
        </h1>

        {/* Personal Data Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
              Informasi Pribadi
            </h2>
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Edit Data Pribadi
            </button>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "ID Siswa", value: studentData?.student_id },
                { label: "Nama", value: studentData?.name },
                {
                  label: "Tanggal Lahir",
                  value: formatDate(studentData?.date_of_birth),
                },
                { label: "Jenis Kelamin", value: studentData?.gender },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                  <span className="block text-gray-500 text-sm mb-1">
                    {item.label}
                  </span>
                  <span className="font-medium text-gray-800">
                    {item.value || "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Data Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
              Data Akademik
            </h2>
            <button
              onClick={handleEditAcademic}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              {academicData ? "Edit Data Akademik" : "Tambah Data Akademik"}
            </button>
          </div>

          {academicData ? (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    label: "Nilai Ujian Sebelumnya",
                    value: academicData.previous_scores,
                  },
                  {
                    label: "Jam Belajar per Minggu",
                    value: academicData.hours_studied,
                  },
                  {
                    label: "Persentase Kehadiran (%)",
                    value: academicData.attendance,
                  },
                  {
                    label: "Jumlah Sesi Bimbingan",
                    value: academicData.tutoring_sessions,
                  },
                  {
                    label: "Tingkat Motivasi",
                    value: academicData.motivation_level,
                  },
                  {
                    label: "Keterlibatan Orangtua",
                    value: academicData.parental_involvement,
                  },
                  {
                    label: "Jam Tidur per Malam",
                    value: academicData.sleep_hours,
                  },
                  {
                    label: "Jam Aktivitas Fisik",
                    value: academicData.physical_activity,
                  },
                  {
                    label: "Kesulitan Belajar",
                    value: academicData.learning_disabilities,
                  },
                  {
                    label: "Kualitas Guru",
                    value: academicData.teacher_quality,
                  },
                  {
                    label: "Prediksi Nilai Ujian",
                    value: score ? `${score}` : "-",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-md shadow-sm"
                  >
                    <span className="block text-gray-500 text-sm mb-1">
                      {item.label}
                    </span>
                    <span className="font-medium text-gray-800">
                      {item.value || "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
              <p className="text-yellow-700 font-medium text-center">
                Data akademik belum tersedia. Silakan tambahkan dengan mengklik
                tombol Tambah Data Akademik.
              </p>
            </div>
          )}
        </div>
        {renderLearningRecommendation()}

        <div className="mt-8 flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <span>⬅️</span>
            <span>Kembali ke Daftar Siswa</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
