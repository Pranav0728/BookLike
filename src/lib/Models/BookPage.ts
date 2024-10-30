// models/Page.js
import mongoose from "mongoose";

const BookPageSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  styling: {
    font: { type: String, default: "serif" },
    fontSize: { type: String, default: "16px" },
    inkColor: { type: String, default: "#000000" },
    backgroundColor: { type: String, default: "#FFFFFF" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.BookPage || mongoose.model("BookPage", BookPageSchema);
