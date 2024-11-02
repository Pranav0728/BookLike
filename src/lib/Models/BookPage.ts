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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.BookPage || mongoose.model("BookPage", BookPageSchema);
