"use client";
import Image from "next/image";
import { Book } from "../type";

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  const filteredBooks = books.filter((b) => b.title && b.cover_i).slice(0, 20);

  if (!filteredBooks.length) return <p>No books found with covers.</p>;

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {filteredBooks.map((book) => (
        <li key={book.key} className="p-2 border rounded-md">
          <p className="font-semibold mb-2">{book.title}</p>
          {book.cover_i && (
            <Image
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              width={120}
              height={180}
              className="rounded-md object-cover"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
