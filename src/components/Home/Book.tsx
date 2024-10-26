// components/Book.tsx
"use client"
import { useState } from "react";

export default function Book() {
  const [leftPageText, setLeftPageText] = useState("Write here...");
  const [rightPageText, setRightPageText] = useState("...and here!");

  return (
    <div className="flex justify-center items-center py-16 px-4 bg-gradient-to-b from-[#FAF3E0] to-[#FCECCB]">
      <div className="relative w-[600px] h-[400px] bg-[#F5F1E1] shadow-2xl rounded-lg overflow-hidden border border-[#D3CBB8]">
        {/* Left Page */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#FDFDFD] p-6 flex flex-col space-y-4 border-r border-[#D3CBB8]">
          <textarea
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
            value={leftPageText}
            onChange={(e) => setLeftPageText(e.target.value)}
          />
        </div>

        {/* Right Page */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#FFF7EA] p-6 flex flex-col space-y-4">
          <textarea
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
            value={rightPageText}
            onChange={(e) => setRightPageText(e.target.value)}
          />
        </div>

        {/* Book Spine */}
        <div className="absolute inset-y-0 w-2 left-1/2 bg-[#D3CBB8]"></div>
      </div>
    </div>
  );
}
