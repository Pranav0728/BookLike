// "use client";
// import { useState, useEffect } from "react";

// export default function Book({ bookId }) {
//   const [leftPageText, setLeftPageText] = useState([""]);
//   const [rightPageText, setRightPageText] = useState([""]);
//   const [pageIndex, setPageIndex] = useState(0);
//   const maxLines = 16;

//   useEffect(() => {
//     // Initialize pages if they are empty
//     if (leftPageText.length === 0) setLeftPageText([""]);
//     if (rightPageText.length === 0) setRightPageText([""]);

//     // Cleanup function to save content when the component unmounts
//     return () => {
//       savePageContent();
//     };
//   }, []);

//   const addPage = () => {
//     setLeftPageText((prev) => [...prev, ""]);
//     setRightPageText((prev) => [...prev, ""]);
//   };

//   const handleNextPage = () => {
//     savePageContent(); // Save current page before moving
//     if (pageIndex < leftPageText.length - 1) {
//       setPageIndex(pageIndex + 1);
//     } else {
//       addPage();
//       setPageIndex(pageIndex + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     savePageContent(); // Save current page before moving
//     if (pageIndex > 0) setPageIndex(pageIndex - 1);
//   };

//   const handleTextChange = (e, side) => {
//     const text = e.target.value;
//     const lines = text.split("\n");

//     if (lines.length <= maxLines) {
//       if (side === "left") {
//         setLeftPageText((prev) => {
//           const updatedPages = [...prev];
//           updatedPages[pageIndex] = text;
//           return updatedPages;
//         });
//       } else {
//         setRightPageText((prev) => {
//           const updatedPages = [...prev];
//           updatedPages[pageIndex] = text;
//           return updatedPages;
//         });
//       }
//     }
//   };

//   const savePageContent = async () => {
//     const content = {
//       bookId: bookId,
//       pageNumber: pageIndex * 2 + 1, // Save left page content
//       content: leftPageText[pageIndex], // Adjust as needed
//     };

//     try {
//       await fetch('/api/bookPages', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(content),
//       });
//     } catch (error) {
//       console.error("Failed to save page content:", error);
//     }

//     // You can also save the right page content if needed in a similar manner
//   };

//   return (
//     <div className="flex h-screen flex-col items-center py-16 px-4 ">
//       <div className="flex items-center justify-center h-screen relative w-[1000px] bg-[#F5F1E1] shadow-2xl rounded-lg overflow-hidden border border-[#D3CBB8]">
//         {/* Left Page */}
//         <div className="absolute inset-y-0 left-0 w-1/2 bg-[#FDFDFD] p-6 flex flex-col space-y-4 border-r border-[#D3CBB8]">
//           <div className="absolute top-4 right-4 text-gray-500 text-sm">
//             Page {pageIndex * 2 + 1}
//           </div>
//           <textarea
//             rows={maxLines}
//             className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
//             value={leftPageText[pageIndex]}
//             onChange={(e) => handleTextChange(e, "left")}
//           />
//         </div>

//         {/* Right Page */}
//         <div className="absolute inset-y-0 right-0 w-1/2 bg-[#FFF7EA] p-6 flex flex-col space-y-4">
//           <div className="absolute top-4 right-4 text-gray-500 text-sm">
//             Page {pageIndex * 2 + 2}
//           </div>
//           <textarea
//             rows={maxLines}
//             className="w-full h-full bg-transparent outline-none resize-none text-gray-800 text-lg font-serif"
//             value={rightPageText[pageIndex]}
//             onChange={(e) => handleTextChange(e, "right")}
//           />
//         </div>

//         {/* Book Spine */}
//         <div className="absolute inset-y-0 w-2 left-1/2 bg-[#D3CBB8]"></div>
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex space-x-4 mt-6">
//         <button
//           onClick={handlePrevPage}
//           disabled={pageIndex === 0}
//           className="px-4 py-2 bg-[#474a58] text-white rounded-md disabled:bg-gray-300"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNextPage}
//           className="px-4 py-2 bg-[#766336] text-white rounded-md"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
