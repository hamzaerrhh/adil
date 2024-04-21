import React, { useState } from "react";

const TaskCard = ({ task, onComplete, onDelete }) => {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      onComplete(task.category);
    }
  };

  const handleDelete = () => {
    onDelete(task);
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p>{task.description}</p>
      {!completed ? (
        <button
          onClick={handleComplete}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Mark as Complete
        </button>
      ) : (
        <p className="mt-4 text-green-500 font-semibold">Completed!</p>
      )}
      <button
        onClick={handleDelete}
        className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Delete Task
      </button>
    </div>
  );
};

export default TaskCard;
