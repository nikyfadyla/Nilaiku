import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";

function StudentDataForm() {
  const { id: urlStudentId } = useParams(); // Ubah menjadi 'id'
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: urlStudentId || null, // Gunakan urlStudentId jika ada
    student_id: urlStudentId || "", // Gunakan urlStudentId jika ada
    name: "",
    date_of_birth: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (urlStudentId) {
      fetchStudentData();
    }
  }, [urlStudentId]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/students/${urlStudentId}` // Ubah URL fetch
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data.");
      }
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isUpdate = !!formData.id;
    const method = isUpdate ? "PUT" : "POST";

    // Gunakan student_id yang sudah ada atau generate baru
    const studentId = formData.student_id || nanoid(10);

    const url = isUpdate
      ? `http://localhost:3001/students/${formData.id}`
      : `http://localhost:3001/students`;

    const dataToSend = {
      id: formData.id, // Pertahankan ID JSON Server
      student_id: studentId, // Pertahankan student_id
      name: formData.name,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
    };

    console.log("Data yang dikirim:", dataToSend);

    fetch(url, {
      method: method,
      body: JSON.stringify(dataToSend),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengirim data");
        return res.json();
      })
      .then((data) => {
        console.log("Response dari backend:", data);
        navigate(`/student-academic/${data.student_id}`, {
          state: { student_id: data.student_id, prevData: data },
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      });
  };

  const renderGenderIcon = () => {
    if (formData.gender === "Laki-laki") {
      return <i className="ri-men-line text-blue-500"></i>;
    } else if (formData.gender === "Perempuan") {
      return <i className="ri-women-line text-pink-500"></i>;
    } else {
      return <i className="ri-user-line"></i>;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <h1 className="ml-3 text-purple-700 font-medium">Loading....</h1>
      </div>
    );

  if (error)
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <i className="ri-error-warning-line text-2xl text-red-500 mr-3"></i>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen py-25 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            {urlStudentId ? "Edit Informasi Diri" : "Data Siswa Baru"}
          </h2>
          <p className="text-blue-100 text-center mt-2">
            {urlStudentId
              ? "Perbarui informasi pribadi Anda"
              : "Masukkan informasi pribadi Anda"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-user-line"></i>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-calendar-event-line"></i>
              </div>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth || ""}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
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
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none bg-none"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="ri-arrow-down-wide-fill"></i>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition hover:-translate-y-1 hover:shadow-lg"
            >
              {urlStudentId ? "Perbarui Data" : "Lanjutkan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentDataForm;
