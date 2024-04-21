import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { convertsTobase4 } from "../function/funtionpie";

const BookCard = ({ book, preview }) => {
  const [imageUri, setImageUri] = useState(null);
  if (preview) {
    useEffect(() => {
      const convertImageToBase64 = async () => {
        if (book.mainImageUrl) {
          const image = await convertsTobase4(book.mainImageUrl);
          console.log(image);
          setImageUri(image);
        }
      };

      convertImageToBase64();
    }, [book.bookImage]);
  }

  const stars = Array.from({ length: 5 }, (_, index) => index + 1); // Array for 5 stars

  const handleRatingChange = (rating) => {
    // Handle rating change logic here
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-64 object-cover object-center"
        src={preview ? imageUri : `http://localhost:5000/${book.bookImage}`}
        alt={book.title}
      />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {book.title}
        </h2>
        <p className="text-wrap max-w-56 text-sm text-gray-600 mb-4 overflow-hidden">
          {book.description.slice(0, 70)}
          {book.description.length > 70 && "..."}
        </p>

        <p className="text-xs text-gray-500">Author: {book.author}</p>

        <div className="flex items-center mt-2">
          <span className="text-gray-500">Rating: </span>
          {stars.map((star) => (
            <FaStar
              key={star}
              className={`ml-1 ${
                star <= book.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        <p className=" text-gray-500 font-medium">{book.category}</p>
      </div>
    </div>
  );
};

export default BookCard;
