import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    rawPassword: "",
    confirmRawPassword: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/user`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        alert("Gagal mengambil data pengguna");
      });
  }, [submitCount]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleDeletion = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/user/remove/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        return alert("Berhasil menghapus data");
      });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (
      formData.fullName === "" ||
      formData.userName === "" ||
      formData.rawPassword === "" ||
      formData.confirmRawPassword === ""
    ) {
      return alert("Harap isi seluruh form!");
    }

    if (formData.rawPassword !== formData.confirmRawPassword) {
      return alert("Password tidak sama!");
    }

    axios
      .post(`${process.env.REACT_APP_API_HOST}/user/add`, {
        fullName: formData.fullName,
        userName: formData.userName,
        rawPassword: formData.rawPassword,
      })
      .then((res) => {
        if (res.status === 201) {
          setSubmitCount(submitCount + 1);
          return alert(`Berhasil membuat data untuk ${formData.fullName}`);
        } else {
          return alert("Gagal menambahkan user, terjadi kesalahan");
        }
      })
      .catch((err) => {
        console.error(err);
        return alert("Gagal menambahkan user, terjadi kesalahan");
      });
  };

  return (
    <div className="flex flex-col">
      <NavigationBar />
      <form
        onSubmit={handleSubmission}
        className="flex flex-col px-8 py-4 gap-4"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-900"
          >
            Nama Lengkap
          </label>
          <input
            onChange={handleFormChange}
            type="text"
            id="fullName"
            name="fullName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ardon Yunors"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="userName"
            className="text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            onChange={handleFormChange}
            type="text"
            id="userName"
            name="userName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ardonyunors"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="rawPassword"
            className="text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            onChange={handleFormChange}
            type="password"
            id="rawPassword"
            name="rawPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ardonyunors"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmRawPassword"
            className="text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <input
            onChange={handleFormChange}
            type="password"
            id="confirmRawPassword"
            name="confirmRawPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ardonyunors"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col px-8 py-4 gap-2">
        <h1 className="text-2xl font-bold">Pengguna Terdaftar</h1>
        {users.map((user, index) => (
          <div
            className="p-4 flex flex-col bg-black text-white rounded-md gap-2"
            key={index}
          >
            <h2 className="uppercase font-bold text-xl">{user.fullName}</h2>
            <p>{user.userName}</p>
            <button
              className="bg-white rounded-md text-black p-2 hover:bg-gray-700 hover:text-white transition duration-300"
              type="button"
              onClick={() => handleDeletion(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
