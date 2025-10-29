// app/books/types.ts
export interface Book {
  key: string;
  title: string;
  cover_i?: number;
  author_name?: string[];
}

export interface OpenLibraryResponse {
  numFound: number;
  docs: Book[];
}
