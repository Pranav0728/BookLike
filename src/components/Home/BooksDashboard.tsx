// components/BooksDashboard.tsx
"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import Modal from '@/components/Modal';

interface Book {
  _id: string;
  title: string;
  description: string;
}

interface FormData {
  title: string;
  description: string;
}

const BooksDashboard: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ title: '', description: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/book?userId=${session?.user?.id}`);
        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
  
    if (session?.user?.id) {
      fetchBooks();
    }
  }, [session]);
  

  const openBookDetail = (bookId: string) => {
    router.push(`/books/${bookId}`);
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', description: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: session?.user?.id }),
      });

      if (response.ok) {
        const newBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, newBook.message.book]); // Append new book
        handleCloseModal();
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='w-[70%] mx-auto mt-10 px-5'>
      <div className='flex justify-between items-center my-5'>
        <h1>My Books</h1>
        <Button onClick={handleOpenModal}>
          Add New Book
          <span className='ml-2 text-sm font-semibold text-gray-600'>+</span>
        </Button>
      </div>

      <div className='flex gap-10'>
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              width: "150px",
            }}
            onClick={() => openBookDetail(book._id)}
          >
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-2 mt-1"
            />
          </div>
          <div className="my-2">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 mt-1"
            />
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Save Book
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BooksDashboard;
