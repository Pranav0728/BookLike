"use client";
import { useState } from "react";

export default function Book() {
  const [leftPageText, setLeftPageText] = useState([""]);
  const [rightPageText, setRightPageText] = useState([""]);
  const [pageIndex, setPageIndex] = useState(0);
  const maxLines = 16; // Set a maximum number of lines per page

  const addPage = () => {
    setLeftPageText([...leftPageText, ""]);
    setRightPageText([...rightPageText, ""]);
  };

  const handleNextPage = () => {
    if (pageIndex < leftPageText.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      addPage();
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleTextChange = (e, side) => {
    const text = e.target.value;
    const lines = text.split("\n");

    // Check if current text exceeds maxLines
    if (lines.length <= maxLines) {
      if (side === "left") {
        const updatedPages = [...leftPageText];
        updatedPages[pageIndex] = text;
        setLeftPageText(updatedPages);
      } else {
        const updatedPages = [...rightPageText];
        updatedPages[pageIndex] = text;
        setRightPageText(updatedPages);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center py-16 px-4 ">
      <div className="flex items-center justify-center h-screen relative w-[1000px] bg-[#F5F1E1] shadow-2xl rounded-lg overflow-hidden border border-[#D3CBB8]">
        {/* Left Page */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#FDFDFD] p-6 flex flex-col space-y-4 border-r border-[#D3CBB8]">
          {/* Page Number */}
          <div className="absolute top-4 right-4 text-gray-500 text-sm">
            Page {pageIndex * 2 + 1}
          </div>
          <textarea
            rows={maxLines}
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
            style={{
              backgroundImage: "linear-gradient(to top, #e0e0e0 1px, transparent 1px)",
              backgroundSize: "100% 28px"
            }}
            value={leftPageText[pageIndex]}
            onChange={(e) => handleTextChange(e, "left")}
          />
        </div>

        {/* Right Page */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#FFF7EA] p-6 flex flex-col space-y-4">
          {/* Page Number */}
          <div className="absolute top-4 right-4 text-gray-500 text-sm">
            Page {pageIndex * 2 + 2}
          </div>
          <textarea
            rows={maxLines}
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
            style={{
              backgroundImage: "linear-gradient(to top, #e0e0e0 1px, transparent 1px)",
              backgroundSize: "100% 28px"
            }}
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
