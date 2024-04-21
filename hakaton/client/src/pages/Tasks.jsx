import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FaSave, FaSpinner } from "react-icons/fa"; // Import icons from react-icons library

const Tasks = () => {
  // State variables to store tasks and completed tasks
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading animation

  // Function to fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const res = await axios.post("http://localhost:5000/data/daytask", {
            token,
          });
          // Set the tasks received from the API
          setTasks(res.data);
          console.log(res.data);
        } catch (err) {
          console.log("Error fetching tasks:", err);
        }
      }
    };
    fetchTasks();
  }, []);

  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    // Find the task by id
    const taskToUpdate = tasks.find((task) => task._id === taskId);

    if (!taskToUpdate) {
      // If the task is not found, return early
      return;
    }

    if (!taskToUpdate.state) {
      // If the task state is false, update it to true
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, state: true } : task
      );

      // Update the tasks state
      setTasks(updatedTasks);

      // Add the task to completedTasks state
      setCompletedTasks([...completedTasks, taskToUpdate]);
    }
  };

  // Function to handle custom action when button is clicked
  const handleCustomAction = async () => {
    if (completedTasks.length === 0) {
      console.log("return 0");
      return;
    }
    setLoading(true);
    const token = Cookies.get("token");
    const res = await axios.post("http://localhost:5000/data/updateTasks", {
      token,
      tasks: tasks,
      completasks: completedTasks,
    });

    console.log(res.data);
    setLoading(false);
  };

  // Function to group tasks by category
  const groupTasksByCategory = () => {
    const groupedTasks = {};
    tasks.forEach((task) => {
      if (!groupedTasks[task.category]) {
        groupedTasks[task.category] = [];
      }
      groupedTasks[task.category].push(task);
    });
    return groupedTasks;
  };

  // Get the tasks grouped by category
  const groupedTasks = groupTasksByCategory();

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold mb-0">Tasks</h1>
        <div className="flex flex-row gap-2 items-center">
          <span>
            <button
              className={`bg-green-600 text-white   py-4 px-4 rounded-full ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
              }`}
              onClick={handleCustomAction}
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
            </button>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
          <div key={category} className="rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            {categoryTasks.map((task) => (
              <div
                key={task._id}
                className={`flex items-center mb-2 ${
                  task.state ? "line-through text-gray-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.state}
                  onChange={() => toggleTaskCompletion(task._id)}
                  className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <p>{task.title}</p>
                <span className="ml-auto">{task.score}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
