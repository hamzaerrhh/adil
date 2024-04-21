import React, { useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { convertsTobase4 } from "../function/funtionpie";
import Cookies from "js-cookie";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    mainImageUrl: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "mainImageUrl") {
      setFormData({
        ...formData,
        mainImageUrl: e.target.files[0], // Use e.target.files[0] to get the file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log("form data", formData.mainImageUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("token", token);
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("author", formData.author);
    formDataToSubmit.append("bookImage", formData.mainImageUrl);

    try {
      const response = await axios.post(
        "http://localhost:5000/book",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setFormData({
        title: "",
        description: "",
        category: "",
        author: "",
        mainImageUrl: null,
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="  container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Add New Book</h2>
      <div className="flex justify-around  flex-row">
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
                rows="3"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              ></textarea>
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
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mainImageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="mainImageUrl"
                name="mainImageUrl"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md py-2 px-4 mr-4"
              >
                Add Book
              </button>
            </div>
          </div>
        </form>
        <div id="preview">
          <BookCard book={formData} preview={true} />
        </div>
      </div>
    </div>
  );
};

export default AddBook;
