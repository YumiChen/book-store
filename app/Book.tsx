import { BookType, removeBook } from "@/lib/features/books/booksSlice";

import { MouseEventHandler } from "react";
import { bookCategories } from "@/utils/consts";
import { setEditingBook } from "@/lib/features/books/editingBookSlice";
import { useAppDispatch } from "@/lib/hook";

export default function Book({ id, name, price, category, description } : BookType) {
  const dispatch = useAppDispatch();

  const openEditBookPopup = () => {
    dispatch(setEditingBook({ id, name, price, category, description }));
    (document.querySelector("#edit_book_modal") as HTMLDialogElement)?.showModal();
  };

  const removeTheBook: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeBook(id));
  };

  return (
    <div className="w-full">
      <div className="card lg:card-side shadow-xl glass cursor-pointer hover:border hover:border-solid" onClick={openEditBookPopup} tabIndex={0}>
        <div className="card-body min-h-[212px] w-full">
          <h3 className="card-title ellipsis-2">{name}</h3>
              <p>{`$${price} CAD`}</p>
              <p className="ellipsis-1">{bookCategories[category]}</p>
        </div>
      </div>
      <button className="btn w-full mt-3" onClick={removeTheBook}>Remove</button>
    </div>
  );
}
