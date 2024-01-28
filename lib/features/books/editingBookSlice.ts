import { BookCategoryKey, BookType } from './booksSlice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../rootReducer';

interface EditingBookType {
  editingBook: Partial<BookType>;
  errors: Record<keyof BookType, string>;
}

const initialState: EditingBookType = {
  editingBook: {
    id: undefined,
    name: '',
    price: 0,
    category: undefined,
    description: ''
  },
  errors: {
    id: '',
    name: '',
    price: '',
    category: '',
    description: ''
  }
};

const editingBookSlice = createSlice({
  name: 'editingBook',
  initialState,
  reducers: {
    setEditingBook: (state, action: PayloadAction<BookType | undefined>) => {
      state.editingBook = action.payload || {
        id: 123,
        name: '',
        price: 0,
        category: undefined,
        description: ''
      };
      state.errors = {
        id: '',
        name: '',
        price: '',
        category: '',
        description: ''
      };
    },
    setName: (state, action: PayloadAction<string>) => {
      state.editingBook = {...state.editingBook, name: action.payload};
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.editingBook = {...state.editingBook, price: action.payload};
    },
    setCategory: (state, action: PayloadAction<BookCategoryKey>) => {
      state.editingBook = {...state.editingBook, category: action.payload};
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.editingBook = {...state.editingBook, description: action.payload};
    },
    setErrors: (state, action: PayloadAction<{ name: keyof BookType, value: string}>) => {
      state.errors = {...state.errors, [action.payload.name]: action.payload.value};
    },
  },
});

export const selectEditingBook = (state: RootState) => state.editingBook.editingBook;
export const selectErrors = (state: RootState) => state.editingBook.errors;

export const { setEditingBook, setName, setPrice, setCategory, setDescription, setErrors } = editingBookSlice.actions;

export default editingBookSlice.reducer;
