import { BookType, updateBook } from "@/lib/features/books/booksSlice";

import BookForm from "./BookForm";
import { useAppDispatch } from "@/lib/hook";

export default function EditBookPopup() {
  const dispatch = useAppDispatch();
  const onSubmit = (book: BookType) => {
    dispatch(updateBook(book));
  };
  return (
    <dialog id="edit_book_modal" className="modal modal-bottom sm:modal-middle" >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit BookType</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          <form method="dialog">
            <BookForm onSubmit={onSubmit}/>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2 mt-4">✕</button>
          </form>
        </div>
      </dialog>
  );
}
