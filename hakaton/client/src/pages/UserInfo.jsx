import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-4">{user.name}</h2>
          <p className="text-gray-600 mb-4">Nickname: {user.nickname}</p>
          <p className="text-gray-600 mb-4">Username: {user.username}</p>
          <p className="text-gray-600 mb-4">Email: {user.email}</p>
          <p className="text-gray-600 mb-4">Description: {user.description}</p>
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold">Social Media</p>
              <p className="text-gray-600 mb-2">
                Facebook: {user.socialMedia.facebook}
              </p>
              <p className="text-gray-600 mb-2">
                WhatsApp: {user.socialMedia.whatsapp}
              </p>
              <p className="text-gray-600 mb-2">
                Instagram: {user.socialMedia.instagram}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Score</p>
              <p className="text-gray-600 mb-2">Total: {user.score.total}</p>
              <p className="text-gray-600 mb-2">
                Mental Health: {user.score.mentalHealth}
              </p>
              <p className="text-gray-600 mb-2">
                Physique: {user.score.physique}
              </p>
              <p className="text-gray-600 mb-2">Social: {user.score.social}</p>
              <p className="text-gray-600 mb-2">Money: {user.score.money}</p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-500 text-white rounded-md py-2 px-4 mr-4">
              Edit Profile
            </button>
            <button className="bg-green-500 text-white rounded-md py-2 px-4">
              Create Event
            </button>
            <button className="bg-yellow-500 text-white rounded-md py-2 px-4 ml-4">
              Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
