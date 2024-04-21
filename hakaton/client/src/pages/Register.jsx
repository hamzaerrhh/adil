import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted
    setError(null); // Reset error state

    if (!username || !email || !password) {
      setError("Please fill in all fields"); // Set error message if any field is empty
      setLoading(false); // Set loading state to false
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/user/register", {
        username,
        email,
        password,
      });

      console.log(res, "registration success");
    } catch (err) {
      console.log("Registration failed", err);
      setError("Registration failed. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 border-white p-4 rounded-2xl">
        <div className="text-3xl mb-4">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="mb-2">
              Username
            </label>
            <input
              id="username"
              className="border-2 border-gray-300 text-gray-900 rounded-md p-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              id="email"
              className="border-2 border-gray-300 text-gray-900 rounded-md p-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              id="password"
              className="border-2 border-gray-300 text-gray-900 rounded-md p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Render error message if error exists */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full px-4 py-2"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Signing Up..." : "Sign Up"}{" "}
            {/* Change button text based on loading state */}
          </button>
        </form>
        <p className="text-center my-4">or sign up with</p>
        <div className="flex justify-between w-full mb-4">
          <button className="bg-white text-black rounded-full px-4 py-2">
            Google
          </button>
          <button className="bg-white text-black rounded-full px-4 py-2">
            Facebook
          </button>
        </div>
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
