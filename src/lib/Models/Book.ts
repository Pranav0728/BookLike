// models/Book.js
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  pages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookPage",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
