import User from "../modules/user.js";
import jwt from "jsonwebtoken";

const admin = {
  login: async (req, res) => {
    console.log("ffffffffffffffffffffff");
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        message: "Username or password is missing",
      });
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: "User not found!" });
      }

      // Compare passwords securely

      if (user.password != password) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // Send the token back in the response
      res.status(200).json({ token });
      console.log("done");
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  register: async (req, res) => {
    console.log("start register");
    const { username, password, role, email } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        message: "Please provide all required data (username, password, role)",
      });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Create a new user (admin)
      const newUser = new User({ username, password, role });
      await newUser.save();

      res.status(201).json({ message: "Registration successful" });
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json({ message: "Registration failed", error: err });
    }
  },
};

export default admin;
