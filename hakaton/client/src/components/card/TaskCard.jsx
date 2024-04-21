import { FaHeart, FaBook, FaUtensils, FaRunning } from "react-icons/fa";

const TaskCard = ({ task }) => {
  // Define an object mapping categories to their respective icons

  // Get the corresponding icon for the categor
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Mental_Health":
        return <FaRunning size={18} />;
      case "Physique":
        return <FaHeart size={18} />;
      case "Money":
        return <FaBook size={18} />;
      default:
        return <FaUtensils size={18} />;
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow-md">
      <div className="flex items-center gap-2 mb-2">
        {getCategoryIcon(task.category)}
        {/* Render the category icon */}
        <h3 className="text-lg font-semibold">{task.title}</h3>
      </div>
      <p className="text-gray-600 mb-2">Category: {task.category}</p>
      <p className="text-gray-600 mb-2">Score: {task.score}</p>
    </div>
  );
};

export default TaskCard;
