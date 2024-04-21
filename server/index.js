import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session";
import passport from "passport";
import authRoute from "./router/auth.js";
import cookieParser from "cookie-parser";
import adminRoute from "./router/admin.js";
import bodyParser from "body-parser";
import servesesRoutes from "./router/services.js";

const app = express();
// Configure session middleware to store session data
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24, // Session expiration time (1 hour in milliseconds)
      secure: false, // Set to true in production with HTTPS
      httpOnly: true, // Prevent client-side access to cookies
    },
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
//body parser
// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (for JSON data)
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELET",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  console.log("test", process.env.GOOGLE);
  res.send(`hello from home `);
});
//define the route
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/services", servesesRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

//conection to mongoose
mongoose
  .connect(
    "mongodb+srv://hmzaeer:3CwEy7gGUlH48Nd9@cluster0.ljzkea2.mongodb.net/ump"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });
