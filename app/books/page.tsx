// app/books/page.tsx
"use client";
import { useState } from "react";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";
import { OpenLibraryResponse } from "./type";

export default function Page() {
  const [dataBooks, setDataBooks] = useState<OpenLibraryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query: string) => {
    setLoading(true);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    const json = await res.json();
    setDataBooks(json);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Book Library</h1>
      <SearchBar onSearch={fetchBooks} />

      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {!loading && dataBooks && (
          <>
            <p>Found: {dataBooks.numFound} books</p>
            <BookList books={dataBooks.docs} />
          </>
        )}
      </div>
    </div>
  );
}
