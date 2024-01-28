import booksReducer from '@/lib/features/books/booksSlice';
import { combineReducers } from '@reduxjs/toolkit';
import editingBookReducer from '@/lib/features/books/editingBookSlice';

const rootReducer = combineReducers({
  books: booksReducer,
  editingBook: editingBookReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;