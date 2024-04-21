import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../modules/user.js";
import extractToken from "../helper/getData.js";

const router = Router();

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if not found in the database
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            // Add other fields you want to save
          });
          await user.save();
        }

        console.log("User:", user); // Debug: Log the user object

        return done(null, user); // Pass the user object to serializeUser
      } catch (err) {
        console.error("Error in Google OAuth strategy:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize user by MongoDB ObjectId (_id)
});

// Deserialize user from the session
passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    return done(null, user); // Pass the retrieved user to the request
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    return done(err, null);
  }
});
router.get("/user", async (req, res) => {
  console.log("Start getting user");
  try {
    const tokenCookie = req.headers.cookie;
    console.log(tokenCookie);
    const token = extractToken(tokenCookie);

    // Verify the token and extract the userId
    console.log("start decoding");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodate token", decodedToken);

    const userId = decodedToken.userId;
    console.log("userid", userId);

    console.log("Decoded userId:", userId);

    // Query for the user document by userId
    const user = await User.findById({ _id: userId }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User:", user.toObject()); // Log the user object
    res.status(200).json(user); // Send the user object in the response
  } catch (error) {
    console.error("Error while fetching user:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});
// Define the Google authentication callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Passport authentication was successful, generate JWT token
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Cookie expires in 24 hours

    // Redirect the user to a specified URL
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

export default router;
