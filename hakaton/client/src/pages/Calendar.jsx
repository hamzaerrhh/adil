import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import { FaSpinner, FaSave } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
  };

  const handleSave = async () => {
    setLoading(true);
    const token = Cookies.get("token");
    await axios.post("http://localhost:5000/data/update-calendar", {
      token,
      newCalendar: events,
    });
    setLoading(false);
  };

  useEffect(async () => {
    const token = Cookies.get("token");

    const res = await axios.post("http://localhost:5000/data/calendar", {
      token,
    });
    setEvents(res.data);
    console.log(res);
  }, []);
  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, start, end } : e
    );
    setEvents(updatedEvents);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      const newEvent = {
        id: events.length + 1, // Assign a unique id to the event
        title: eventTitle,
        start: selectedDate,
        end: moment(selectedDate).add(1, "hours").toDate(),
      };
      setEvents([...events, newEvent]);
      setShowModal(false);
      setEventTitle("");
    }
  };

  return (
    <div className="bg-white rounded-sm m-4 p-8">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop} // Enable event dragging
        resizable // Enable resizing of events
        popup // Enable the default popup when clicking on events
      />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Add Event Modal"
        className="fixed top-1/4 left-1/2 transform  z-50 -translate-x-1/2 -translate-y-1/2  bg-gray-700 p-6 rounded-lg shadow-lg max-w-md w-full"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0  z-10 "
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Add Event</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter event title..."
            />
          </div>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
              onClick={saveEvent}
            >
              Save
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <button
        className={`bg-green-600 text-white   py-4 px-4 rounded-full ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
        }`}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
      </button>
    </div>
  );
};

export default MyCalendar;
