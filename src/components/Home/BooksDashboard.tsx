"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// Dummy data for user's books
const booksData = [
  { id: 1, title: "Book One", author: "Author A" },
  { id: 2, title: "Book Two", author: "Author B" },
  { id: 3, title: "Book Three", author: "Author C" },
];

export default function BooksDashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  // Navigate to the book detail page
  const openBookDetail = (bookId:any) => {
    router.push(`/books/${bookId}`);
  };

  return (
    <div className='w-[70%] mx-auto mt-10 px-5'>
      <h1>My Books</h1>
      {/* Display books list with styled cards */}
      <div className='flex gap-10'>
        {booksData.map((book) => (
          <div
            key={book.id}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              width: "150px",
            }}
            onClick={() => openBookDetail(book.id)}
          >
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
