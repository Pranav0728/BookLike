"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams(); 
  const [pageText, setPageText] = useState([""]);
  const [pageIndex, setPageIndex] = useState(0);
  const maxLines = 16;

  useEffect(() => {
    // Load pages when component mounts
    const loadPages = async () => {
      try {
        const response = await fetch(`/api/bookPages?bookId=${id}`);
        const data = await response.json();
        console.log(data);
        if (data.success) {
          const loadedPages = data.pages.map((page) => page.content);
          setPageText(loadedPages.length > 0 ? loadedPages : [""]);
        }
      } catch (error) {
        console.error("Failed to load pages:", error);
      }
    };

    loadPages();
  }, [id]); // Only load pages on mount

  const addPage = () => {
    setPageText((prev) => [...prev, ""]); // Add a new empty page
    setPageIndex((prev) => prev + 1); // Move to the new page
  };

  const handleNextPage = () => {
    if (pageIndex < pageText.length - 1) {
      savePageContent(); // Save current page before moving
      setPageIndex(pageIndex + 1);
    } else {
      addPage(); // Add a new page and move to it
    }
  };

  const handlePrevPage = () => {
    savePageContent(); // Save current page before moving
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleTextChange = async (e) => {
    const text = e.target.value;
    const lines = text.split("\n");

    if (lines.length <= maxLines) {
      setPageText((prev) => {
        const updatedPages = [...prev];
        updatedPages[pageIndex] = text; // Update the current page's content
        return updatedPages;
      });

      // Save the content every time it changes
      await savePageContent(text);
    }
  };

  const savePageContent = async (text) => {
    const content = {
      bookId: id,
      pageNumber: pageIndex + 1,
      content: text || pageText[pageIndex], // Use the new text if provided
    };

    try {
      await fetch("/api/bookPages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
    } catch (error) {
      console.error("Failed to save page content:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center py-16 px-4">
      <div className="flex items-center justify-center h-screen relative w-[600px] bg-[#F5F1E1] shadow-2xl rounded-lg overflow-hidden border border-[#D3CBB8]">
        {/* Single Page */}
        <div className="absolute inset-0 w-full p-6 flex flex-col space-y-4">
          <div className="absolute top-4 right-4 text-gray-500 text-sm">
            Page {pageIndex + 1}
          </div>
          <textarea
            rows={maxLines}
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
            value={pageText[pageIndex]}
            onChange={handleTextChange}
          />
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={pageIndex === 0}
          className="px-4 py-2 bg-[#474a58] text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-[#766336] text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
