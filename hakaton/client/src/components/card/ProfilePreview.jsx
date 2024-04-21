import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { convertsTobase4 } from "../../function/funtionpie";

const ProfilePreview = ({ user, score }) => {
  const [base64, setBase64] = useState(null);
  console.log(user.profilePhoto);

  useEffect(() => {
    const fetchData = async () => {
      if (user.profilePhoto) {
        const base64Data = await convertsTobase4(user.profilePhoto);
        setBase64(base64Data);
      }
    };
    fetchData();
  }, [user.ProfilePhoto]);

  console.log("the user ", user);
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
                  base64
                    ? base64
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
                  <div className="flex flex-col gap-4">
                    {user.socialMedia && user.socialMedia.fb && (
                      <a
                        href={user.socialMedia.fb}
                        className="text-gray-600 mr-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="mr-2 inline-block" /> Facebook
                      </a>
                    )}
                    {user.socialMedia && user.socialMedia.ig && (
                      <a
                        href={user.socialMedia.ig}
                        className="text-gray-600 mr-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="mr-2 inline-block" /> Instagram
                      </a>
                    )}
                    {user.socialMedia && user.socialMedia.snap && (
                      <a
                        href={user.socialMedia.snap}
                        className="text-gray-600 mr-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="mr-2 inline-block" /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">Score</p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Total:</span>{" "}
                    {score.total}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Mental Health:</span>{" "}
                    {score.Mental_Health}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Physique:</span>{" "}
                    {score.Physique}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Social:</span>{" "}
                    {score.Social}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="mr-2 inline-block">Money:</span>{" "}
                    {score.Money}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
