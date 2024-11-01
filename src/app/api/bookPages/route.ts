// src/app/api/book-pages/[bookId]/route.ts
import dbConnect from "@/lib/dbConnect";
import BookPage from "@/lib/Models/BookPage"; // Adjust the import based on your file structure
import { NextResponse } from "next/server";

// Define the request body interface
interface BookPageRequestBody {
  bookId: string;
  pageNumber: number;
  content: string;
}

// POST handler to create a new book page
export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { bookId, pageNumber, content } = body as BookPageRequestBody;

    // Create and save a new book page
    const newPage = new BookPage({ bookId, pageNumber, content });
    await newPage.save();

    return NextResponse.json({ message: { page: newPage } }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: { error: e.message } }, { status: 500 });
  }
};

// GET handler to fetch book pages by bookId
export const GET = async (req: Request, { params }: { params: { bookId: string } }) => {
  try {
    await dbConnect();
    const { bookId } = params; // Get bookId from route parameters

    // Fetch all pages for the specified bookId
    const pages = await BookPage.find({ bookId }).sort({ pageNumber: 1 }); // Sort by page number

    return NextResponse.json({ message: { pages } }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: { error: e.message } }, { status: 500 });
  }
};
