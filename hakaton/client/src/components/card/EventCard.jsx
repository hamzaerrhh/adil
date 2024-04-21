import React, { useState, useEffect } from "react";
import { convertsTobase4 } from "../../function/funtionpie";
const EventCard = ({ event, preview }) => {
  console.log("event", event);
  const [uri, setUri] = useState(null);
  if (preview) {
    useEffect(() => {
      const convertImageToBase64 = async () => {
        if (event?.imageEvent) {
          const image = await convertsTobase4(event.imageEvent);
          console.log(image);
          setUri(image);
        }
      };

      convertImageToBase64();
    }, [event.imageEvent]);
  }
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover object-center"
        src={preview ? uri : `http://localhost:5000/${event.imageEvent}`}
        alt={event.title}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {event?.title.slice(0, 20)}
        </h2>
        <p className="text-sm max-w-56 text-gray-600 mb-4">
          {event.description &&
            (event.description.length > 75
              ? event.description.slice(0, 75) + "..."
              : event.description)}
        </p>

        <div className="flex items-center mb-2">
          <svg
            className="w-4 h-4 fill-current text-gray-500 mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
            <circle cx="12" cy="12" r="5"></circle>
          </svg>
          <p className="text-xs text-gray-500">
            {new Date(event?.startDateTime).toLocaleString()} -{" "}
            {new Date(event?.endDateTime).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <svg
            className="w-4 h-4 fill-current text-gray-500 mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
            <circle cx="12" cy="12" r="5"></circle>
          </svg>
          <p className="text-xs text-gray-500">{event?.location}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {event.isFree ? "Free" : `Price: ${event?.price}`}
          </p>
          {event?.urlRegister && (
            <a
              href={event?.urlRegister}
              className="text-blue-500 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
