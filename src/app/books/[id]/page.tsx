"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface PageContent {
  bookId: string;
  pageNumber: number;
  content: string;
}

export default function Book() {
  const { id } = useParams(); // Fetch the book ID from URL parameters
  const [leftPageText, setLeftPageText] = useState<string[]>([""]);
  const [rightPageText, setRightPageText] = useState<string[]>([""]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const maxLines = 16;

  useEffect(() => {
    // Initialize pages if they are empty
    if (leftPageText.length === 0) setLeftPageText([""]);
    if (rightPageText.length === 0) setRightPageText([""]);

    // Fetch book pages when the component mounts
    const fetchBookPages = async () => {
      try {
        const response = await fetch(`/api/bookPages?bookId=${id}`, {
          method: 'GET',
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Now parse the response as JSON

        if (data.message && data.message.pages) {
          const pages: PageContent[] = data.message.pages;
          const leftPages: string[] = [];
          const rightPages: string[] = [];

          pages.forEach((page, index) => {
            if (index % 2 === 0) {
              leftPages.push(page.content);
            } else {
              rightPages.push(page.content);
            }
          });

          setLeftPageText(leftPages);
          setRightPageText(rightPages);
        }
      } catch (error) {
        console.error("Failed to fetch book pages:", error);
      }
    };

    fetchBookPages();

    // Cleanup function to save content when the component unmounts
    return () => {
      savePageContent();
    };
  }, [id]); // Fetch pages whenever the id changes

  const addPage = () => {
    setLeftPageText((prev) => [...prev, ""]);
    setRightPageText((prev) => [...prev, ""]);
  };

  const handleNextPage = () => {
    savePageContent(); // Save current page before moving
    if (pageIndex < leftPageText.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      addPage();
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    savePageContent(); // Save current page before moving
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, side: "left" | "right") => {
    const text = e.target.value;
    const lines = text.split("\n");

    if (lines.length <= maxLines) {
      if (side === "left") {
        setLeftPageText((prev) => {
          const updatedPages = [...prev];
          updatedPages[pageIndex] = text;
          return updatedPages;
        });
      } else {
        setRightPageText((prev) => {
          const updatedPages = [...prev];
          updatedPages[pageIndex] = text;
          return updatedPages;
        });
      }
    }
  };

  const savePageContent = async () => {
    const contentLeft = {
      bookId: id,
      pageNumber: pageIndex * 2 + 1, // Save left page content
      content: leftPageText[pageIndex], // Adjust as needed
    };

    const contentRight = {
      bookId: id,
      pageNumber: pageIndex * 2 + 2, // Save right page content
      content: rightPageText[pageIndex], // Adjust as needed
    };

    try {
      // Save left page content
      await fetch('/api/bookPages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentLeft),
      });

      // Save right page content if it's not empty
      if (rightPageText[pageIndex]) {
        await fetch('/api/bookPages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contentRight),
        });
      }
    } catch (error) {
      console.error("Failed to save page content:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center py-16 px-4 ">
      <div className="flex items-center justify-center h-screen relative w-[1000px] bg-[#F5F1E1] shadow-2xl rounded-lg overflow-hidden border border-[#D3CBB8]">
        {/* Left Page */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#FDFDFD] p-6 flex flex-col space-y-4 border-r border-[#D3CBB8]">
          <div className="absolute top-4 right-4 text-gray-500 text-sm">
            Page {pageIndex * 2 + 1}
          </div>
          <textarea
            rows={maxLines}
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
            value={leftPageText[pageIndex]}
            onChange={(e) => handleTextChange(e, "left")}
          />
        </div>

        {/* Right Page */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#FFF7EA] p-6 flex flex-col space-y-4">
          <div className="absolute top-4 right-4 text-gray-500 text-sm">
            Page {pageIndex * 2 + 2}
          </div>
          <textarea
            rows={maxLines}
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
            value={rightPageText[pageIndex]}
            onChange={(e) => handleTextChange(e, "right")}
          />
        </div>

        {/* Book Spine */}
        <div className="absolute inset-y-0 w-2 left-1/2 bg-[#D3CBB8]"></div>
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
