import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../rootReducer';
import { bookCategories } from '@/utils/consts';

export type BookCategoryKey = keyof typeof bookCategories;
export interface BookType {
    id: number;
    name: string;
    price: number;
    category: BookCategoryKey;
    description: string;
}

interface BooksStateType {
  books: BookType[];
  error: string;
}

const initialState: BooksStateType = {
  books: [],
  error: '',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookType[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<BookType>) => {
      state.books = [...state.books, action.payload];
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(BookType => BookType.id !== action.payload);
    },
    updateBook: (state, action: PayloadAction<BookType>) => {
      state.books = state.books.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
        return action.payload;
      })
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }, 
  },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectError = (state: RootState) => state.books.error;

export const { setBooks, addBook, removeBook, updateBook, setError } = booksSlice.actions;

export default booksSlice.reducer;
