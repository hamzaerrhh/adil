import React, { useState, useEffect } from "react";
import axios from "axios";

const Health = () => {
  // State variables for BMI calculator
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [dietRecommendation, setDietRecommendation] = useState("");

  // State variables for exercise program
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [exerciseProgram, setExerciseProgram] = useState([]);
  const [exerciseType, setExerciseType] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // Function to fetch exercise data
  const fetchExerciseData = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscle}&type=${exerciseType}&difficulty=${difficulty}`,
        {
          headers: {
            "X-Api-Key": "D/0cO6ejk5UUXZ0OWnp1Ww==x4pkZ49aW5aTOROj", // Replace 'YOUR_API_KEY' with your actual API key
          },
        }
      );
      if (response.status === 200) {
        setExerciseProgram(response.data);
      } else {
        console.error("Failed to fetch exercise data");
      }
    } catch (error) {
      console.error("Error fetching exercise data:", error);
    }
  };

  // Effect to fetch exercise data when selected muscle changes
  useEffect(() => {
    if (selectedMuscle) {
      fetchExerciseData();
    }
  }, [selectedMuscle, exerciseType, muscleGroup, difficulty]);

  // BMI calculation function
  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = (weight / ((height / 100) * (height / 100))).toFixed(2);
      setBMI(bmiValue);
      setDietRecommendation(getDietRecommendation(bmiValue));
    }
  };

  // Function to calculate BMR
  const getBMR = () => {
    // BMR calculation based on weight, height, and age
    const bmr = weight * 10 + height * 6.25 - 5 * 25 + 5; // Assuming age as 25 for example
    return bmr;
  };

  // Function to calculate calories based on goal
  const calculateCalories = (goal) => {
    let calories = 0;
    // Adjust calorie needs based on goal (add, lose, maintain)
    switch (goal) {
      case "add":
        calories = 500 + getBMR();
        break;
      case "lose":
        calories = getBMR() - 500;
        break;
      case "maintain":
        calories = getBMR();
        break;
      default:
        break;
    }
    return calories;
  };

  // Function to get dietary recommendation based on BMI
  const getDietRecommendation = (bmiValue) => {
    if (bmiValue < 18.5) {
      return "Underweight: Consider adding more calories to your diet.";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      return "Normal weight: Maintain your current calorie intake.";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      return "Overweight: Consider reducing your calorie intake.";
    } else {
      return "Obese: Focus on reducing calorie intake and increasing physical activity.";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Health Tracker</h1>

      {/* BMI Calculator */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">BMI Calculator</h2>
        <div className="flex flex-col sm:flex-row items-center mb-2">
          <input
            type="number"
            placeholder="Weight (kg)"
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Height (cm)"
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4"
            onClick={calculateBMI}
          >
            Calculate BMI
          </button>
        </div>
        {bmi && (
          <p
            className={`text-gray-700 ${
              bmi < 18.5
                ? "text-red-500"
                : bmi < 25
                ? "text-green-500"
                : "text-orange-500"
            }`}
          >
            Your BMI is: {bmi}
          </p>
        )}
        {bmi && <p className="text-gray-700">{dietRecommendation}</p>}
      </div>

      {/* Calories Recommendation Cards */}
      {bmi && (
        <div className="mb-8 ">
          <h2 className="text-xl font-semibold mb-2">
            Calories Recommendation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className=" rounded-md p-4 bg-green-400">
              <h3 className="text-lg font-semibold mb-2">Add Calories</h3>
              <p className="text-gray-700">
                If you want to gain weight, you should consume around{" "}
                {calculateCalories("add")} calories per day.
              </p>
            </div>
            <div className="bg-yellow-100 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Maintain Calories</h3>
              <p className="text-gray-700">
                To maintain your current weight, aim for{" "}
                {calculateCalories("maintain")} calories per day.
              </p>
            </div>
            <div className="bg-red-100 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Lose Calories</h3>
              <p className="text-gray-700">
                If you want to lose weight, try to consume around{" "}
                {calculateCalories("lose")} calories per day.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Filters */}
      <select
        className="border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2"
        onChange={(e) => setExerciseType(e.target.value)}
      >
        <option value="">Select Exercise Type</option>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength</option>
        <option value="flexibility">Flexibility</option>
        <option value="balance">Balance</option>
        {/* Add more options as needed */}
      </select>

      <select
        className="border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2"
        onChange={(e) => setMuscleGroup(e.target.value)}
      >
        <option value="">Select Muscle Group</option>
        <option value="arms">Arms</option>
        <option value="legs">Legs</option>
        <option value="chest">Chest</option>
        <option value="back">Back</option>
        <option value="shoulders">Shoulders</option>
        <option value="abs">Abs</option>
        {/* Add more options as needed */}
      </select>

      <select
        className="border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2"
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="">Select Difficulty</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        {/* Add more options as needed */}
      </select>
      <button
        className="bg-blue-500 text-white rounded-md py-2 px-4"
        onClick={fetchExerciseData}
      >
        Search
      </button>

      {/* Exercise Program */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Exercise Program</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exerciseProgram.map((exercise) => (
            <div
              key={exercise.name}
              className="bg-white rounded-md shadow-md p-4"
            >
              <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Type: {exercise.type}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Muscle: {exercise.muscle}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Difficulty: {exercise.difficulty}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Equipment: {exercise.equipment}
              </p>
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  Description: {exercise.instructions.slice(0, 100)}{" "}
                  {exercise.instructions.length > 100 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => alert(exercise.instructions)}
                    >
                      ...
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Health;
