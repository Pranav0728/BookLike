import dbConnect from "@/lib/dbConnect";
import Book from "@/lib/Models/Book";
import User from "@/lib/Models/User"; // Import your User model
import { NextResponse } from "next/server";

// Define the structure of the request body for POST
interface BookRequestBody {
  title: string;
  description: string;
  userId: string;
}

// Handle POST requests to create a new book
export const POST = async (req: Request) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, description, userId } = body as BookRequestBody;

    // Create and save the new book
    const newBook = new Book({ title, description, userId });
    await newBook.save();

    // Update the user's document to include the new book's ID
    await User.findByIdAndUpdate(userId, { $push: { books: newBook._id } });

    return NextResponse.json({ message: { book: newBook } }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: { error: e.message } }, { status: 500 });
  }
};

// Handle GET requests to fetch all books
export const GET = async (req: Request) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // Get userId from query params

    // Fetch books by userId
    const books = await Book.find({ userId }).exec();

    return NextResponse.json({ books }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: { error: e.message } }, { status: 500 });
  }
};
