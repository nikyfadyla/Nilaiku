import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  Edit,
  Moon,
  Smile,
  Star,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

          // Dropdown options Section
          const dropdownOptions = {
            peer_influence: [
              { label: "Positif", value: "positive" },
              { label: "Biasa", value: "neutral" },
              { label: "Negatif", value: "negative" },
            ],
            motivation_level: [
              { label: "Rendah", value: "low" },
              { label: "Biasa", value: "medium" },
              { label: "Tinggi", value: "high" },
            ],
            teacher_quality: [
              { label: "Rendah", value: "low" },
              { label: "Biasa", value: "medium" },
              { label: "Tinggi", value: "high" },
            ],
            Acces_to_Resources: [
              { label: "Mudah", value: "low" },
              { label: "Biasa", value: "medium" },
              { label: "Sulit", value: "high" },
            ],
          };

          // Change Value to Label in display
          const valueToLabel = (field, value) => {
            const options = dropdownOptions[field];
            if (!options) return value;
            const found = options.find((opt) => opt.value === value);
            return found ? found.label : value;
          };

          // Section academic data
          const formattedAcademicData = {
            ...academicResult,
            previous_scores: academicResult.previous_scores
              ? parseFloat(academicResult.previous_scores).toFixed(2)
              : "0",
            attendance: academicResult.attendance
              ? parseFloat(academicResult.attendance).toFixed(2) + "%"
              : "0%",
            hours_studied: academicResult.hours_studied
              ? (Number.isInteger(parseFloat(academicResult.hours_studied))
                  ? parseInt(academicResult.hours_studied)
                  : parseFloat(academicResult.hours_studied).toFixed(1)) +
                " jam"
              : "0 jam",
            tutoring_sessions: academicResult.tutoring_sessions || "0",

            motivation_level: valueToLabel(
              "motivation_level",
              academicResult.motivation_level
            ),
            peer_influence: valueToLabel(
              "peer_influence",
              academicResult.peer_influence
            ),
            teacher_quality: valueToLabel(
              "teacher_quality",
              academicResult.teacher_quality
            ),
            acces_to_resources: valueToLabel(
              "Acces_to_Resources",
              academicResult.acces_to_resources
            ),

            sleep_hours: academicResult.sleep_hours
              ? parseFloat(academicResult.sleep_hours).toFixed(1) + " jam"
              : "0 jam",
          };

          setAcademicData(formattedAcademicData);

          // Calculate final score (PROTOTYPE)
          const previousScore = parseFloat(academicResult.previous_scores) || 0;
          const attendance = parseFloat(academicResult.attendance) || 0;
          const finalScore = (previousScore * 0.4 + attendance * 0.6).toFixed(
            2
          );
          setScore(finalScore);

          // Set prediction date (PROTOTYPE)
          const today = new Date();
          setPredictionDate(today);

          // Generate progress data
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

          // Get learning recommendation
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

  const formatPredictionDate = (date) => {
    if (!date) return "-";
    return format(date, "dd MMMM yyyy", { locale: id });
  };

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

     

    if (strengths.length === 0) {
      strengths.push("Perlu peningkatan di semua aspek");
    }

    return strengths;
  };

  const getScoreTheme = (score) => {
    const numericScore = parseFloat(score);

    if (numericScore >= 90) {
      return {
        gradient: "from-blue-600 to-blue-800",
        bgColor: "bg-blue-100",
        textColor: "text-blue-500",
        borderColor: "border-blue-200",
        icon: <Trophy size={24} className="text-blue-600" />,
        message:
          "Luar Biasa! Siswa berada di peringkat teratas dengan prestasi istimewa",
        badgeText: "Prestasi Istimewa",
        badgeColor: "bg-blue-600 text-white",
        chartColor: "#2563eb",
        activeDotColor: "#1e40af",
      };
    } else if (numericScore > 75) {
      return {
        gradient: "from-blue-500 to-blue-700",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-100",
        icon: <Star size={24} className="text-blue-500" />,
        message:
          "Sangat Baik! Siswa menunjukkan performa akademik yang sangat memuaskan",
        badgeText: "Sangat Baik",
        badgeColor: "bg-blue-500 text-white",
        chartColor: "#3b82f6",
        activeDotColor: "#1d4ed8",
      };
    } else if (numericScore > 50) {
      return {
        gradient: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        borderColor: "border-orange-100",
        icon: <Smile size={24} className="text-orange-500" />,
        message:
          "Cukup Baik! Siswa memiliki potensi yang bisa ditingkatkan lagi",
        badgeText: "Cukup Baik",
        badgeColor: "bg-orange-500 text-white",
        chartColor: "#f97316",
        activeDotColor: "#ea580c",
      };
    } else {
      return {
        gradient: "from-red-500 to-red-600",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-100",
        icon: <AlertTriangle size={24} className="text-red-500" />,
        message:
          "Perlu Perhatian! Siswa membutuhkan bimbingan dan pendampingan lebih",
        badgeText: "Perlu Perhatian",
        badgeColor: "bg-red-500 text-white",
        chartColor: "#ef4444",
        activeDotColor: "#dc2626",
      };
    }
  };

  const scoreTheme = score ? getScoreTheme(score) : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div
              className={`bg-gradient-to-r ${scoreTheme?.gradient || "from-gray-600 to-gray-700"} p-6 md:p-8 text-white`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {studentData?.name || "Nama Siswa"}
                  </h1>
                  <div className="flex items-center mt-2">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-black font-medium">
                      ID: {studentData?.student_id}
                    </span>
                    <span className="ml-3 bg-white bg-opacity-20 px-3 py-1 text-black rounded-full text-sm font-medium">
                      Tanggal Prediksi: {formatPredictionDate(predictionDate)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Data
                  </button>
                  <button
                    onClick={() => navigate(`/student-academic/${student_id}`)}
                    className="flex items-center px-4 py-2 text-black bg-white bg-opacity-20  rounded-lg hover:bg-opacity-30 transition-colors duration-300"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali
                  </button>
                </div>
              </div>

              {score && scoreTheme && (
                <div className="mt-8 bg-white bg-opacity-10 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 text-center mb-6 md:mb-0">
                      <div
                        className={`inline-flex items-center justify-center w-32  h-32 rounded-full ${scoreTheme.bgColor} ${scoreTheme.textColor}`}
                      >
                        <div className="text-center">
                          <div className="text-4xl font-bold">{score}</div>
                          <div className="text-xs uppercase tracking-wide mt-1">
                            Nilai Prediksi
                          </div>
                          <div
                            className={`mt-2 text-xs px-2 py-1 rounded-full ${scoreTheme.badgeColor}`}
                          >
                            {scoreTheme.badgeText}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3  ">
                      <div className="flex items-center mb-2">
                        {scoreTheme.icon}
                        <h3 className="text-xl font-semibold text-black ml-2">
                          {score >= 90
                            ? "Prestasi Istimewa!"
                            : "Analisis Performa"}
                        </h3>
                      </div>
                      <p className="text-sm text-black text-opacity-90 mb-4">
                        {scoreTheme.message}
                      </p>
                      <h4 className="font-medium mb-2 text-black">
                        Kekuatan Akademik:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {calculateStrength().map((strength, idx) => (
                          <span
                            key={idx}
                            className="bg-white text-black bg-opacity-20 px-3 py-1 rounded-full text-sm"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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

            {/* TAB PERSONAL DATA */}

            <div className="p-6 md:p-8">
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

              {/* TAB ACADEMIC */}

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
                          label: "Persentase Kehadiran",
                          value: academicData.attendance,
                          icon: <User size={24} className="text-purple-600" />,
                          color: "purple",
                        },
                        {
                          label: "Jumlah Sesi Bimbingan",
                          value: academicData.tutoring_sessions,
                          icon: (
                            <BookOpen size={24} className="text-green-600" />
                          ),
                          color: "green",
                        },
                        {
                          label: "Tingkat Motivasi",
                          value: academicData.motivation_level,
                          icon: (
                            <Activity size={24} className="text-yellow-600" />
                          ),
                          color: "yellow",
                        },
                        
                        {
                          label: "Jam Tidur per Malam",
                          value: academicData.sleep_hours,
                          icon: <Moon size={24} className="text-pink-600" />,
                          color: "pink",
                        },

                        {
                          label: "Kualitas Guru",
                          value: academicData.teacher_quality,
                          icon: (
                            <UserCheck size={24} className="text-orange-600" />
                          ),
                          color: "orange",
                        },
                        {
                          label: "Acces_to_Resources",
                          value: academicData.acces_to_resources,
                          icon: (
                            <UserCheck size={24} className="text-orange-600" />
                          ),
                          color: "orange",
                        },
                        {
                          label: "Prediksi Nilai Ujian",
                          value: score ? `${score}` : "-",
                          icon: (
                            <TrendingUp size={24} className="text-blue-600" />
                          ),
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
                          <div className="flex items-start">
                            <div
                              className={`bg-${item.color}-100 p-3 rounded-full mr-4`}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <span
                                className={`block ${item.highlight ? "text-blue-100" : "text-gray-500"} text-sm mb-1`}
                              >
                                {item.label}
                              </span>
                              <span className="font-medium text-xl">
                                {item.value || "-"}
                              </span>
                            </div>
                          </div>
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

              {/* Tab Progress */}

              {/* TAB REKOMENDASI */}

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
