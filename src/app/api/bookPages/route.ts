import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Book from "@/lib/Models/Book";
import BookPage from "@/lib/Models/BookPage";

export const POST = async (req) => {
  await dbConnect();

  const { bookId, pageNumber, content } = await req.json();

  try {
    // Check if page already exists
    let page = await BookPage.findOne({ bookId, pageNumber });

    if (page) {
      // Update content if the page exists
      page.content = content;
      page.lastModified = new Date();
    } else {
      // Create a new page if it doesn't exist
      page = new BookPage({ bookId, pageNumber, content });
      await Book.findByIdAndUpdate(bookId, {
        $push: { pages: page._id },
        lastModified: new Date(),
      });
    }

    await page.save();

    return NextResponse.json({ success: true, page }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export const GET = async (req) => {
  await dbConnect();
  const bookId = req.nextUrl.searchParams.get("bookId");

  try {
    // Retrieve pages for a given book
    const pages = await BookPage.find({ bookId }).sort("pageNumber");
    return NextResponse.json({ success: true, pages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};
