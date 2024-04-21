import React, { useState, useEffect } from "react";
import EventCard from "../components/card/EventCard";

const Event = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the database
  useEffect(() => {
    // Fetch logic here (e.g., using fetch or axios)
    // Update the events state with fetched data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/event"); // Assuming your backend route for fetching events is /api/events
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Event;
