import { useState } from "react";
import { CgNotes } from "react-icons/cg";
import { PiStudentBold } from "react-icons/pi";
import { FcOvertime } from "react-icons/fc";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";

const Paper = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "demande des papier",
    full_name: "",
    student_number: "",
    identifiant_number: "",
    phone: "",
    type: "",
  });

  const handleButtonClick = (e) => {
    console.log(e.target.id);
    setFormData({ ...formData, type: e.target.id });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("the form data:", formData); // For demonstration, log form data to console
    try {
      const response = await axios.post(
        "http://localhost:5000/services/add",
        formData,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }

    setFormData({
      full_name: "",
      student_number: "",
      identifiant_number: "",
      phone: "",
    });
    setShowPopup(false);
  };

  return (
    <div className="p-8 w-full h-screen flex justify-center items-center">
      <div className="flex justify-around space-x-4">
        <button
          id="dmeander notes"
          className="flex flex-col items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          <CgNotes />
          Demander les notes
        </button>
        <button
          id="liste des éleve"
          className="flex flex-col items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          <PiStudentBold />
          Demander la liste des élèves
        </button>
        <button
          id="professeur"
          className="flex flex-col items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          <FcOvertime />
          Demander la liste des professeurs
        </button>
        <button
          id="attestation"
          className="bg-red-500 flex flex-col items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          <FaChalkboardTeacher />
          Demander une attestation
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-lg">
            <div className="flex justify-end">
              <button
                className="text-gray-800 hover:text-gray-600"
                onClick={closePopup}
              >
                &times;
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">{formData.type}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="student_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student Number:
                </label>
                <input
                  type="text"
                  id="student_number"
                  name="student_number"
                  value={formData.student_number}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter student number"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="identifiant_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Identifiant Number:
                </label>
                <input
                  type="text"
                  id="identifiant_number"
                  name="identifiant_number"
                  value={formData.identifiant_number}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter identifiant number"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paper;
