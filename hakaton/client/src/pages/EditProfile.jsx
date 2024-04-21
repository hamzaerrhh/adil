import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProfilePreview from "../components/card/ProfilePreview";

const EditProfile = () => {
  const [file, setFile] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.post("http://localhost:5000/user/me", {
          token,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    nickname: user?.nickname || "",
    username: user?.username || "",
    phone: user?.phone || "",
    socialMedia: {
      fb: user?.socialMedia ? user.socialMedia.fb || "" : "",
      ig: user?.socialMedia ? user.socialMedia.ig || "" : "",
      snap: user?.socialMedia ? user.socialMedia.snap || "" : "",
    },
    description: user?.description || "",
    profilePhoto: user?.profilePhoto || null, // Fixed the field name
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        profilePhoto: e.target.files[0], // Use e.target.files[0] to get the file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSocialMedia = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");

      console.log("the formData", formData);
      const formDataToSubmit = new FormData();

      formDataToSubmit.append("token", token);
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("nickname", formData.nickname);
      formDataToSubmit.append("username", formData.username);

      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("fb", formData.socialMedia.fb);
      formDataToSubmit.append("ig", formData.socialMedia.ig);
      formDataToSubmit.append("snap", formData.socialMedia.snap);
      formDataToSubmit.append("profilePhoto", formData.profilePhoto);

      const res = await axios.post(
        "http://localhost:5000/user/editprofile",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Edit Profile</h2>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || user.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname || user.nickname}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username (One Word)
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || user.username}
                onChange={handleChange}
                pattern="[a-zA-Z0-9]+"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone || user.phone}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture (Image Upload)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-gray-700"
              >
                Facebook Link
              </label>
              <input
                type="text"
                id="fb"
                name="fb"
                value={formData.socialMedia.fb || ""}
                onChange={handleSocialMedia}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ig"
                className="block text-sm font-medium text-gray-700"
              >
                Instagram Link
              </label>
              <input
                type="text"
                id="ig"
                name="ig"
                value={formData.socialMedia.ig || ""}
                onChange={handleSocialMedia}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="snap"
                className="block text-sm font-medium text-gray-700"
              >
                Snapchat Link
              </label>
              <input
                type="text"
                id="snap"
                name="snap"
                value={formData.socialMedia.snap || ""}
                onChange={handleSocialMedia}
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
                value={formData.description || user.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md py-2 px-4 mr-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
          <ProfilePreview user={formData} score={user.score} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
