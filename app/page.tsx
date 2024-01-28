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
    <main className="min-h-screen px-12 md:px-24 py-12">
      <div className="flex w-full flex-col items-center justify-between gap-4">
        <h1>Book Store</h1>
        <h2>{"Check the list of books"}</h2>
        <AddBookButton></AddBookButton>
        {
          !error && <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">{
            books.map((book)=>(<Book key={book.id} {...book} />))
          }</div>
        }
        {
          error && <div className="w-full p-24">
            <p className="text-center">Something went wrong</p>
          </div>
        }
      </div>
      <AddBookPopup />
      <EditBookPopup />
    </main>
  );
}