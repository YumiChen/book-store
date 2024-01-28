import { BookType, addBook } from "@/lib/features/books/booksSlice";

import BookForm from "./BookForm";
import { useAppDispatch } from "@/lib/hook";

export default function AddBookPopup() {
  const dispatch = useAppDispatch();
  const onSubmit = (newBook: BookType) => {
    dispatch(addBook(newBook));
  };
  return (
      <dialog id="add_book_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Book</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          <form method="dialog">
            <BookForm onSubmit={onSubmit} />
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2 mt-3">✕</button>
          </form>
        </div>
      </dialog>
  );
}
