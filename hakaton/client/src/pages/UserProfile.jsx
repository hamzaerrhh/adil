import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log("start effect");
    const fetchData = async () => {
      try {
        console.log("start getting info");
        const token = Cookies.get("token");
        const res = await axios.post("http://localhost:5000/user/me", {
          token,
        });

        console.log("the result", res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call fetchData function inside useEffect
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-semibold mb-2">
                {user ? user.username : "Loading..."}
              </h2>
              <p className="text-gray-600 pb-4">Nickname: {user?.nickname}</p>
              <p className="text-gray-600">name: {user?.name}</p>
            </div>
            {user && (
              <img
                src={
                  user.profilePhoto
                    ? `http://localhost:5000/${user.profilePhoto}`
                    : "https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain"
                }
                alt="Profile Avatar"
                className="h-20 w-20 object-cover rounded-full"
              />
            )}
          </div>
          {user && (
            <>
              <p className="text-gray-600 mb-4">Email: {user.email}</p>
              <p className="text-gray-600 mb-4">phone: {user.phone}</p>
              <p className="text-gray-600 mb-4">
                Description: {user.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">Social Media</p>
                  {user.socialMedia && user.socialMedia.fb && (
                    <a
                      href={`https://facebook.com/${user.socialMedia.fb}`}
                      className="text-gray-600 mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="mr-2 inline-block" /> Facebook
                    </a>
                  )}
                  {user.socialMedia && user.socialMedia.ig && (
                    <a
                      href={`https://instagram.com/${user.socialMedia.ig}`}
                      className="text-gray-600 mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="mr-2 inline-block" /> Instagram
                    </a>
                  )}
                  {user.socialMedia && user.socialMedia.snap && (
                    <a
                      href={`https://snapchat.com/add/${user.socialMedia.snap}`}
                      className="text-gray-600 mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="mr-2 inline-block" /> WhatsApp
                    </a>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold">Score</p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Total:</span>{" "}
                    {user?.score?.total}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Mental Health:</span>{" "}
                    {user.score.Mental_Health}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Physique:</span>{" "}
                    {user.score.Physique}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Social:</span>{" "}
                    {user.score.Social}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Money:</span>{" "}
                    {user.score.Money}
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end mt-6">
            <a href="/userprofile/edit">
              <button className="bg-blue-500 text-white rounded-md py-2 px-4 mr-4">
                Edit Profile
              </button>
            </a>
            <a href="/book/add">
              <button className="bg-yellow-500 text-white rounded-md py-2 px-4 ml-4">
                Add Book
              </button>
            </a>
            <a href="/event/add">
              <button className="bg-green-500 text-white rounded-md py-2 px-4">
                Create Event
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
