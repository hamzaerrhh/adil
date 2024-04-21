import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/card/EventCard";
import Cookies from "js-cookie";
import { FaSpinner, FaSave } from "react-icons/fa";

const AddEvent = () => {
  const [loading, setLoding] = useState(false);
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    imageEvent: null,
    startDateTime: "",
    endDateTime: "",
    price: "",
    urlRegister: "",
    category: "",
  });
  useEffect(() => {}, [formData]);

  const handleChange = (e) => {
    if (e.target.name === "imageEvent") {
      setFormData({
        ...formData,
        imageEvent: e.target.files[0], // Use e.target.files[0] to get the file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  /////
  const handleSubmit = async (e) => {
    setLoding(true);
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.startDateTime ||
      !formData.endDateTime ||
      !formData.category ||
      !formData.imageEvent ||
      !formData.price ||
      !formData.urlRegister
    ) {
      setErr("All fields are required");
      return;
    }
    e.preventDefault();

    const token = Cookies.get("token");
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("token", token);
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("imageEvent", formData.imageEvent);
    formDataToSubmit.append("startDateTime", formData.startDateTime);
    formDataToSubmit.append("endDateTime", formData.endDateTime);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("urlRegister", formData.urlRegister);

    try {
      const response = await axios.post(
        "http://localhost:5000/event",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setLoding(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  ////
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Add New Event</h2>
      <div className="flex  justify-around">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mainImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main Image
                </label>
                <input
                  type="file"
                  id="imageEvent"
                  name="imageEvent"
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="startDateTime"
                  name="startDateTime"
                  value={formData.startDateTime}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="endDateTime"
                  name="endDateTime"
                  value={formData.endDateTime}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="urlRegister"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration URL
                </label>
                <input
                  type="url"
                  id="urlRegister"
                  name="urlRegister"
                  value={formData.urlRegister}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              {err && <p className=" text-red-700 font-light ">{err}</p>}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  className={`bg-green-600 text-white   py-4 px-4 rounded-full ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-700"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaSave />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <EventCard event={formData} preview={true} />
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
