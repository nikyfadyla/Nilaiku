import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft,
  Edit,
  User,
  Calendar,
  PieChart,
  BookOpen,
  Award,
} from "lucide-react";

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
  const [predictionDate, setPredictionDate] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [progressData, setProgressData] = useState([]);

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

          const finalScore = (previousScore * 0.4 + attendance * 0.6).toFixed(
            2
          );
          setScore(finalScore);

          // Set prediction date (today)
          const today = new Date();
          setPredictionDate(today);

          // Generate sample progress data (for illustration)
          // In real implementation, fetch this from backend
          const mockProgressData = [
            {
              month: "Jan",
              nilai: previousScore - 10 > 0 ? previousScore - 10 : 60,
            },
            {
              month: "Feb",
              nilai: previousScore - 5 > 0 ? previousScore - 5 : 65,
            },
            { month: "Mar", nilai: previousScore },
            { month: "Apr", nilai: parseFloat(finalScore) },
            {
              month: "Mei",
              nilai:
                parseFloat(finalScore) + 3 > 100
                  ? 100
                  : parseFloat(finalScore) + 3,
            },
            {
              month: "Jun",
              nilai:
                parseFloat(finalScore) + 7 > 100
                  ? 100
                  : parseFloat(finalScore) + 7,
            },
          ];
          setProgressData(mockProgressData);

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

  // Format prediction date with date-fns
  const formatPredictionDate = (date) => {
    if (!date) return "-";
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  // Calculate academic strength
  const calculateStrength = () => {
    if (!academicData) return [];

    const strengths = [];

    if (parseFloat(academicData.attendance) > 80) {
      strengths.push("Kehadiran Tinggi");
    }

    if (parseFloat(academicData.hours_studied) > 10) {
      strengths.push("Jam Belajar Optimal");
    }

    if (parseFloat(academicData.motivation_level) > 7) {
      strengths.push("Motivasi Tinggi");
    }

    if (parseFloat(academicData.parental_involvement) > 7) {
      strengths.push("Dukungan Orangtua Baik");
    }

    if (strengths.length === 0) {
      strengths.push("Perlu peningkatan di semua aspek");
    }

    return strengths;
  };

  // Loading state with animation
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="text-2xl font-semibold text-blue-600">
            Memuat data siswa...
          </div>
          <p className="text-gray-500 mt-2">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  // Error state
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

  // Success state with beautiful UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header section with student quick info */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {studentData?.name || "Nama Siswa"}
                  </h1>
                  <div className="flex items-center mt-2">
                    <span className="bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium">
                      ID: {studentData?.student_id}
                    </span>
                    <span className="ml-3 bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium">
                      Tanggal Prediksi: {formatPredictionDate(predictionDate)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Data
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali
                  </button>
                </div>
              </div>

              {score && (
                <div className="mt-8 bg-white bg-opacity-10 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 text-center mb-6 md:mb-0">
                      <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white text-blue-600">
                        <div className="text-center">
                          <div className="text-4xl font-bold">{score}</div>
                          <div className="text-xs uppercase tracking-wide mt-1">
                            Nilai Prediksi
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">
                        Kekuatan Akademik:
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {calculateStrength().map((strength, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-500 bg-opacity-25 px-3 py-1 rounded-full text-sm"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-blue-100">
                        Skor ini dihitung berdasarkan nilai sebelumnya dan
                        kehadiran siswa.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tab navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`py-4 px-6 font-medium text-sm flex items-center ${
                    activeTab === "personal"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  <User size={18} className="mr-2" />
                  Data Pribadi
                </button>
                <button
                  onClick={() => setActiveTab("academic")}
                  className={`py-4 px-6 font-medium text-sm flex items-center ${
                    activeTab === "academic"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  <BookOpen size={18} className="mr-2" />
                  Data Akademik
                </button>
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`py-4 px-6 font-medium text-sm flex items-center ${
                    activeTab === "progress"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  <PieChart size={18} className="mr-2" />
                  Grafik Perkembangan
                </button>
                <button
                  onClick={() => setActiveTab("recommendation")}
                  className={`py-4 px-6 font-medium text-sm flex items-center ${
                    activeTab === "recommendation"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  <Award size={18} className="mr-2" />
                  Rekomendasi
                </button>
              </nav>
            </div>

            {/* Tab content */}
            <div className="p-6 md:p-8">
              {/* Personal tab */}
              {activeTab === "personal" && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Informasi Pribadi
                    </h2>
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <User size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <span className="block text-gray-500 text-sm mb-1">
                          Nama Lengkap
                        </span>
                        <span className="font-medium text-gray-800 text-lg">
                          {studentData?.name || "-"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Calendar size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <span className="block text-gray-500 text-sm mb-1">
                          Tanggal Lahir
                        </span>
                        <span className="font-medium text-gray-800 text-lg">
                          {formatDate(studentData?.date_of_birth) || "-"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <span className="block text-gray-500 text-sm mb-1">
                        ID Siswa
                      </span>
                      <span className="font-medium text-gray-800 text-lg">
                        {studentData?.student_id || "-"}
                      </span>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <span className="block text-gray-500 text-sm mb-1">
                        Jenis Kelamin
                      </span>
                      <span className="font-medium text-gray-800 text-lg">
                        {studentData?.gender || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic tab */}
              {activeTab === "academic" && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Data Akademik
                    </h2>
                    <button
                      onClick={handleEditAcademic}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                    >
                      <Edit size={16} className="mr-2" />
                      {academicData ? "Edit" : "Tambah"}
                    </button>
                  </div>

                  {academicData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          label: "Nilai Ujian Sebelumnya",
                          value: academicData.previous_scores,
                          icon: <Award size={24} className="text-blue-600" />,
                          color: "blue",
                        },
                        {
                          label: "Jam Belajar per Minggu",
                          value: academicData.hours_studied,
                          icon: (
                            <BookOpen size={24} className="text-indigo-600" />
                          ),
                          color: "indigo",
                        },
                        {
                          label: "Persentase Kehadiran (%)",
                          value: academicData.attendance,
                          icon: <User size={24} className="text-purple-600" />,
                          color: "purple",
                        },
                        {
                          label: "Jumlah Sesi Bimbingan",
                          value: academicData.tutoring_sessions,
                          color: "green",
                        },
                        {
                          label: "Tingkat Motivasi",
                          value: academicData.motivation_level,
                          color: "yellow",
                        },
                        {
                          label: "Keterlibatan Orangtua",
                          value: academicData.parental_involvement,
                          color: "red",
                        },
                        {
                          label: "Jam Tidur per Malam",
                          value: academicData.sleep_hours,
                          color: "pink",
                        },
                        {
                          label: "Jam Aktivitas Fisik",
                          value: academicData.physical_activity,
                          color: "teal",
                        },
                        {
                          label: "Kesulitan Belajar",
                          value: academicData.learning_disabilities,
                          color: "gray",
                        },
                        {
                          label: "Kualitas Guru",
                          value: academicData.teacher_quality,
                          color: "orange",
                        },
                        {
                          label: "Prediksi Nilai Ujian",
                          value: score ? `${score}` : "-",
                          color: "blue",
                          highlight: true,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`${
                            item.highlight
                              ? "bg-blue-600 text-white"
                              : `bg-${item.color}-50 text-gray-800`
                          } p-6 rounded-xl border ${
                            item.highlight
                              ? "border-blue-500"
                              : `border-${item.color}-100`
                          } transition-all duration-300 hover:shadow-md`}
                        >
                          {item.icon && (
                            <div
                              className={`bg-${item.color}-100 p-3 rounded-full inline-block mb-3`}
                            >
                              {item.icon}
                            </div>
                          )}
                          <span
                            className={`block ${item.highlight ? "text-blue-100" : "text-gray-500"} text-sm mb-1`}
                          >
                            {item.label}
                          </span>
                          <span className="font-medium text-xl">
                            {item.value || "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                      <p className="text-yellow-700 font-medium text-center">
                        Data akademik belum tersedia. Silakan tambahkan dengan
                        mengklik tombol Tambah Data Akademik.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Progress chart tab */}
              {activeTab === "progress" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Grafik Perkembangan Nilai
                  </h2>

                  {progressData.length > 0 ? (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={progressData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 20,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="month" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.5rem",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="nilai"
                              stroke="#3b82f6"
                              strokeWidth={3}
                              dot={{ r: 6, strokeWidth: 2 }}
                              activeDot={{
                                r: 8,
                                stroke: "#1e40af",
                                strokeWidth: 2,
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-6 text-center text-gray-500 text-sm">
                        <p>
                          Grafik menunjukkan perkembangan nilai siswa dari waktu
                          ke waktu
                        </p>
                        <p className="mt-2 text-blue-600 font-medium">
                          *Nilai bulan April dan seterusnya adalah nilai
                          prediksi
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                      <p className="text-yellow-700 font-medium text-center">
                        Data perkembangan belum tersedia. Harap lengkapi data
                        akademik terlebih dahulu.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Recommendation tab */}
              {activeTab === "recommendation" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Rekomendasi Belajar
                  </h2>

                  {learningRecommendation ? (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <img
                              src={
                                learningRecommendation.imageUrl ||
                                "/api/placeholder/400/320"
                              }
                              alt={learningRecommendation.title}
                              className="w-full h-auto rounded-lg shadow-sm"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3">
                          <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <Award size={20} className="text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                              {learningRecommendation.title}
                            </h3>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                            <p className="text-gray-700 leading-relaxed">
                              {learningRecommendation.description}
                            </p>
                          </div>
                          <a
                            href={learningRecommendation.learningResourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
                          >
                            Mulai Belajar Sekarang
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                      <p className="text-yellow-700 font-medium text-center">
                        Rekomendasi belajar belum tersedia. Harap lengkapi data
                        akademik terlebih dahulu.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add some custom animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default StudentDetailPage;
