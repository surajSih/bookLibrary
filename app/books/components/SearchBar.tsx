// // app/books/components/SearchBar.tsx
// "use client";
// import { Suspense, useEffect, useState } from "react";
// import { Book } from "../type";

// interface Props {
//   onSearch: (query: string) => void;
// }

// export default function SearchBar({ onSearch }: Props) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<Book[]>([]);
//   const [history, setHistory] = useState<{ query: string }[]>([]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && query.trim()) {
//       onSearch(query);
//       saveSearch(query);
//       fetchHistory();
//     }
//   };

//   const saveSearch = async (searchQuery: string) => {
//     try {
//       await fetch("/api/librarys", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: searchQuery }),
//       });
//     } catch (error) {
//       console.error("Error saving search history:", error);
//     }
//   };
//   const fetchHistory = async () => {
//     try {
//       const res = await fetch("/api/librarys");
//       const data = await res.json();
//       setHistory(data);
//     } catch (err) {
//       console.error("Error fetching history:", err);
//     }
//   };

//   useEffect(() => {
//     if (query.trim().length === 0) {
//       setSuggestions([]);
//       return;
//     }

//     const fetchSuggestions = async () => {
//       console.log("Fetching suggestions for:", query);
//       const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
//       const data = await res.json();
//       const validBooks: Book[] = data.docs
//         .filter((book: any) => book.cover_i && book.title)
//         .slice(0, 5);
//       setSuggestions(validBooks);
//     };

//     const timer = setTimeout(fetchSuggestions, 500);
//     // Debounce API calls by 300ms
//     return () => clearTimeout(timer);
//   }, [query]);

//   return (
//     <div className="width-full max-w-md mx-auto relative">
//       <input
//         type="text"
//         placeholder="Search by author or book title..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={handleKeyDown}
//         className="border rounded-md p-2 w-full max-w-md"
//       />

//       <div className="flex">
//         <div className="w-2/3 relative">
//           <ul className="bg-white border rounded mt-2 shadow-md ">
//             {suggestions.map((book, index) => (
//               <li
//                 key={index}
//                 onClick={() => {
//                   setQuery(book.title);
//                   setSuggestions([]);
//                   onSearch(book.title);
//                 }}
//               >
//                 <span className="text-black">{book.title}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="w-1/3 relative">
//           <Suspense>
//             <ul className="bg-white border rounded mt-2 shadow-md ">
//               {history.slice(0, 6).map((item, index) => (
//                 <li
//                   key={index}
//                   onClick={() => {
//                     setQuery(item.query);
//                     setSuggestions([]);
//                     onSearch(item.query);
//                   }}
//                 >
//                   <span className="text-black">{item.query}</span>
//                 </li>
//               ))}
//             </ul>
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/books/components/SearchBar.tsx
"use client";
import { Suspense, useEffect, useState } from "react";
import { Book } from "../type";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [history, setHistory] = useState<{ query: string }[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query);
      saveSearch(query);
      fetchHistory();
      setSuggestions([]);
    }
  };

  const saveSearch = async (searchQuery: string) => {
    try {
      await fetch("/api/librarys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/librarys");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      console.log("Fetching suggestions for:", query);
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await res.json();
      const validBooks: Book[] = data.docs
        .filter((book: any) => book.cover_i && book.title)
        .slice(0, 5);
      setSuggestions(validBooks);
    };

    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-white rounded-2xl shadow-lg">
      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search by author or book title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 w-full outline-none text-gray-800 text-base"
      />

      {/* Suggestions & History */}
      <div className="flex flex-col sm:flex-row gap-5 mt-4">
        {/* Suggestions List */}
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg shadow-inner max-h-64 overflow-y-auto">
          <h2 className="px-3 py-2 text-sm font-semibold text-gray-600 border-b">
            Book Suggestions
          </h2>
          <ul>
            {suggestions.map((book, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(book.title);
                  setSuggestions([]);
                  onSearch(book.title);
                }}
                className="px-3 py-2 cursor-pointer hover:bg-blue-50 transition-colors duration-150"
              >
                <span className="text-gray-800 font-medium">{book.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Search History */}
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg shadow-inner max-h-64 overflow-y-auto w-md">
          <h2 className="px-3 py-2 text-sm font-semibold text-gray-600 border-b">
            Search History
          </h2>
          <Suspense>
            <ul>
              {history.slice(0, 5).map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setQuery(item.query);
                    setSuggestions([]);
                    onSearch(item.query);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-green-50 transition-colors duration-150"
                >
                  <span className="text-gray-800">{item.query}</span>
                </li>
              ))}
            </ul>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
