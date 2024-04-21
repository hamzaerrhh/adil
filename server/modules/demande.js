import mongoose from "mongoose";

const demandSchema = new mongoose.Schema(
  {
    userId: { type: String },
    demandType: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: mongoose.Schema.Types.Mixed },
    etas: {
      type: "string",
      enum: ["en cours", "refusée", "done"],
      default: "en cours",
    },
  },
  { timestamps: true }
);

const Demand = mongoose.model("Demand", demandSchema);

export default Demand;
