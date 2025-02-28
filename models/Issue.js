import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Default status is "Pending"
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
