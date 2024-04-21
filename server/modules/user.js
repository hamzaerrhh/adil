import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: function () {
        // Require email if the role is "user"
        return this.role === "user";
      },
      unique: function () {
        // Only enforce uniqueness if the email is provided and the role is "user"
        return this.role === "user" && !!this.email;
      },
    },
    googleId: Number,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.role === "supadmin" && !!this.password;
      }, // Corrected to 'required' instead of 'require'
    },
    role: {
      type: String,
      enum: [
        "user",
        "supadmin",
        "responsable d'attestaion",
        "clubadmin",
        "tashe1",
      ],
      default: "user",
    },
    phone: Number,
    profilePhoto: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
