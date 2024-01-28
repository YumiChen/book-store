import { setEditingBook } from "@/lib/features/books/editingBookSlice";
import { useAppDispatch } from "@/lib/hook";

export default function AddBookButton() {
  const dispatch = useAppDispatch();
  const openAddBookPopup = () => {
    dispatch(setEditingBook());
    (document.querySelector("#add_book_modal") as HTMLDialogElement)?.showModal();
  };
  return (
    <div>
        <button className="btn btn-accent" onClick={openAddBookPopup}>Add New book</button>
    </div>
  );
}
