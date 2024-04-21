import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { FaSpinner, FaSave } from "react-icons/fa";

const KanbanBoard = () => {
  const [demand, setDemand] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const searchChang = (items) => {
    // Filter the items based on the condition
    const filteredItems = items.filter((item) => item.etas !== "en cours");

    console.log("Filtered items:", filteredItems);

    return filteredItems;
  };

  //feetch the demand
  const fetchDemand = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/services/feetchall",
        { withCredentials: true }
      );
      setDemand(response.data);
      console.log("the demande is ", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemand();

    return () => {
      // Cleanup function
    };
  }, []);

  //save the change
  const handleSaved = async () => {
    setLoading(true);

    const res = searchChang(demand);
    try {
      const response = axios.put("http://localhost:5000/services/update", {
        res,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    console.log("the change", res);

    // Perform save logic here

    setLoading(false);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If there's no destination or if the draggable item was dropped back into its original position
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    // Find the dragged task by id
    const draggedTask = demand.find((task) => task._id === draggableId);

    if (!draggedTask) {
      return;
    }

    // Create an updated version of the dragged task with the new 'etas' property
    const updatedTask = {
      ...draggedTask,
      etas: destination.droppableId,
    };

    // Update the demand state with the updated task
    const updatedDemand = demand.map((task) =>
      task._id === draggableId ? updatedTask : task
    );

    setDemand(updatedDemand);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const PopUp = (selectedTask) => {
    return (
      <div className=" w-full  h-screen justify-center">
        {selectedTask.name}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
          <Column
            id="en cours"
            demand={demand.filter((demande) => demande.etas === "en cours")}
          />
          <Column
            id="refusée"
            demand={demand.filter((demande) => demande.etas === "refusée")}
          />
          <Column
            id="done"
            demand={demand.filter((demande) => demande.etas === "done")}
          />
        </div>
      </DragDropContext>

      <div className="flex justify-center mt-8 gap-4 py-8 px-8">
        <button
          className={`bg-green-600 text-white py-4 px-4 rounded-full ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
          onClick={handleSaved}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
        </button>
      </div>
    </div>
  );
};

const Column = ({ id, demand }) => {
  const columnStyles = {
    en_cours: "bg-white",
    refusée: "bg-orange-200",
    done: "bg-green-200",
  };

  return (
    <div className={`border p-4 rounded ${columnStyles[id]}`}>
      <h2 className="text-xl font-semibold">{id.toUpperCase()}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {demand &&
              demand.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
const Task = ({ task, index }) => {
  const [select, setSelect] = useState({});
  const [show, setShow] = useState(false);
  const taskStyles = {
    todo: "bg-white",
    inprogress: "bg-orange-100",
    done: "bg-green-100",
  };

  // Ensure we have a valid draggableId (using _id from MongoDB document)
  const draggableId = task._id ? task._id.toString() : "";

  return (
    <>
      <Draggable draggableId={draggableId} index={index}>
        {(provided) => (
          <div
            onClick={() => {
              setShow(true);
              setSelect(task);
            }}
            className={`border rounded p-4 mt-4 cursor-pointer flex justify-between ${
              taskStyles[task.etas]
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>
              <h3 className="font-semibold">{task.name}</h3>
              <p className="text-sm text-gray-600">{task.demandType}</p>
            </div>
          </div>
        )}
      </Draggable>
      {show && (
        <div className="fixed top-0 left-0 w-full h-full flex text-center items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-2xl shadow-lg w-800  ">
            <h2 className="text-2xl font-semibold mb-4">{task.name}</h2>
            <p className=" text-2xl text-gray-600 mb-2">
              Demand Type: {task.demandType}
            </p>
            <hr className="mb-8" />
            <div className="mb-8">
              <strong className="mr-4">Full Name:</strong>
              {task.details.full_name}
            </div>
            <div className="mb-8">
              <strong className="mr-4">Identifier Number:</strong>
              {task.details.identifiant_number}
            </div>
            <div className="mb-4">
              <strong className="mr-2">Phone:</strong>
              {task.details.phone}
            </div>
            <div className="mb-4">
              <strong className="mr-2">Student Number:</strong>
              {task.details.studentNumber}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanBoard;
