import { BookCategoryKey, BookType } from "@/lib/features/books/booksSlice";
import { MouseEventHandler, useCallback } from "react";
import { selectEditingBook, selectErrors, setCategory, setDescription, setErrors, setName, setPrice } from "@/lib/features/books/editingBookSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";

import { bookCategories } from "@/utils/consts";

const bookFields: Array<keyof BookType> = ['id', 'name', 'price', 'category', 'description'];
export default function BookForm({ onSubmit }: { onSubmit: (BookType: BookType) => void;}) {
  const editingBook = useAppSelector(selectEditingBook);
  const errors = useAppSelector(selectErrors);
  const dispatch = useAppDispatch();
  const validateForm = useCallback((fieldName: keyof BookType, value: BookType[keyof BookType] | undefined) => {
    let isValid = true;
    switch(fieldName){
        case 'id':
            if(!value){
                dispatch(setErrors({ name: 'id', value: 'Something went wrong. Please contact support service'}));
                isValid = false;
            }else{
                dispatch(setErrors({ name: 'id', value: ''}));
            }
            break;
        case 'name':
            if(!value){
                dispatch(setErrors({ name: 'name', value: 'Name is required'}));
                isValid = false;
            }else{
                dispatch(setErrors({ name: 'name', value: ''}));
            }
            break;
        case 'price':
            if(value && typeof value !== "number"){
                dispatch(setErrors({ name: 'price', value: 'Price should be number'}));
                isValid = false;
            }
            else if(!value && value !== 0){
                dispatch(setErrors({ name: 'price', value: 'Price is required'}));
                isValid = false;
            }else{
                dispatch(setErrors({ name: 'price', value: ''}));
            }
            break;
        case 'category':
            if(!value){
                dispatch(setErrors({ name: 'category', value: 'Category is required'}));
                isValid = false;
            }else{
                dispatch(setErrors({ name: 'category', value: ''}));
            }
            break;
        case 'description':
            if(!value){
                dispatch(setErrors({ name: 'description', value: 'Description is required'}));
                isValid = false;
            }else{
                dispatch(setErrors({ name: 'description', value: ''}));
            }
            break;
    }
    return isValid;
  }, [dispatch]);
  const onSubmitForm: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    if(!(bookFields.reduce((result, bookField) => {
        return validateForm(bookField, editingBook[bookField]) && result;
    }, true))){
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    onSubmit(editingBook as BookType);
  }, [editingBook, onSubmit, validateForm]);

  return (
    <div>
        {errors['id'] && <div className="label">
            <span className="text-xs text-red-500">{errors['id']}</span>
        </div>}
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">BookType Name</span>
            </div>
            <input type="text" value={editingBook.name} placeholder="Input name..." className="input input-bordered w-full max-w-xs" onChange={(event) => {
                dispatch(setName(event.target.value));
                validateForm('name', event.target.value);
            }}/>
            <div className="label">
                <span className="text-xs text-red-500">{errors['name']}</span>
            </div>
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">BookType Price</span>
            </div>
            <input type="number" value={editingBook.price} placeholder="Input price..." className="input input-bordered w-full max-w-xs" onChange={(event) => {
                const newPrice = parseFloat(event.target.value);
                dispatch(setPrice(newPrice));
                validateForm('price', newPrice);
            }}/>
            <div className="label">
                <span className="text-xs text-red-500">{errors['price']}</span>
            </div>
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">BookType Category</span>
            </div>
            <select className="select select-bordered" value={editingBook.category || -1} onChange={(event) => {
                const newCategory = parseInt(event.target.value);
                dispatch(setCategory(newCategory as BookCategoryKey));
                validateForm('category', newCategory);
            }}>
                <option disabled value={-1}>Pick one</option>
                {Object.entries(bookCategories).map(([id, category]) => {
                    return (<option key={id} value={id}>{category}</option>);
                })}
            </select>
            <div className="label">
                <span className="text-xs text-red-500">{errors['category']}</span>
            </div>
        </label>
        <label className="form-control">
            <div className="label">
                <span className="label-text">Description</span>
            </div>
            <textarea className="textarea textarea-bordered h-24" value={editingBook.description} placeholder="Input description..." onChange={(event) => {
                dispatch(setDescription(event.target.value));
                validateForm('description', event.target.value);
            }}></textarea>
            <div className="label">
                <span className="text-xs text-red-500">{errors['description']}</span>
            </div>
        </label>
        <button className="btn mt-8 btn-accent" onClick={onSubmitForm}>Submit</button>
    </div>
  );
}
