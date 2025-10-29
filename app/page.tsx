// "use client";
// import { useState } from "react";
// import Image from "next/image";

// export default function Page() {
//   const [books, setBooks] = useState("");
//   const [dataBooks, setDataBooks] = useState(null);

//   const fetchData = async () => {
//     if (!books.trim()) return;
//     console.log("Fetching data...");

//     const res = await fetch(
//       `https://openlibrary.org/search.json?q=${encodeURIComponent(books)}`
//     );
//     const json = await res.json();
//     setDataBooks(json);
//     console.log(json);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       console.log("Enter key pressed:", books);
//       fetchData();
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h1>Book Library</h1>
//         <input
//           type="text"
//           placeholder="author, book"
//           value={books}
//           onChange={(e) => setBooks(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//       </div>

//       <div>
//         <h2>Details...</h2>
//         {dataBooks && (
//           <>
//             <p>Found: {dataBooks.numFound} books</p>
//             <ul>
//               {dataBooks.docs
//                 .filter((book: any) => book.cover_i && book.title)
//                 .slice(0, 15)
//                 .map(
//                   (book: any, index: number) =>
//                     book.cover_i && (
//                       <li key={index}>
//                         {<p>{book.title}</p>}

//                         {
//                           <Image
//                             src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
//                             alt={book.title}
//                             width={100}
//                             height={150}
//                           />
//                         }
//                       </li>
//                     )
//                 )}
//             </ul>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import Page from "./books/page";
export default function Home() {
  return (
    <div>
      <Page />
    </div>
  );
}
