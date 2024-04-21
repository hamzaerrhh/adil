import React, { useState } from "react";
import axios from "axios";

const FormTashe1 = ({ user }) => {
  // Initialize state variables for form inputs
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    identityNumber: "",
    field: "",
    studentNumber: "",
    type: "",
    _id: user._id,
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can perform actions with formData, like sending it to a server
    try {
      const response = await axios.post(
        "http://localhost:5000/services/add",
        formData,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nickname"
          >
            Nickname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="identityNumber"
          >
            Identity Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            name="type"
            type="text"
            placeholder="type de demande"
            value={formData.type}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="identityNumber"
          >
            type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="identityNumber"
            name="identityNumber"
            type="text"
            placeholder="Identity Number"
            value={formData.identityNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="field"
          >
            Field
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="field"
            name="field"
            type="text"
            placeholder="Field"
            value={formData.field}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="studentNumber"
          >
            Student Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="studentNumber"
            name="studentNumber"
            type="text"
            placeholder="Student Number"
            value={formData.studentNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTashe1;
