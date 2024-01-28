"use client";

import { selectBooks, selectError } from "@/lib/features/books/booksSlice";

import AddBookButton from "./AddBookButton";
import AddBookPopup from "./AddBookPopup";
import Book from "./Book";
import EditBookPopup from "./EditBookPopup";
import { useAppSelector } from "@/lib/hook";

export default function Home() {
  const books = useAppSelector(selectBooks);
  const error = useAppSelector(selectError);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between px-12 md:px-24 py-12 gap-8">
      <h1>Book Store</h1>
      <h2>{"Check the list of books"}</h2>
      <AddBookButton></AddBookButton>
      {
        !error && <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">{
          books.map((book)=>(<Book key={book.id} {...book} />))
        }</div>
      }
      {
        error && <div className="w-full">
          <p>{error}</p>
        </div>
      }
      <AddBookPopup />
      <EditBookPopup />
    </main>
  );
}