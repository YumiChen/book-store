'use client'

import { AppStore, makeStore } from './store'
import { BookType, setBooks, setError } from './features/books/booksSlice'

import { Provider } from 'react-redux'
import { useRef } from 'react'

export default function StoreProvider({
  books,
  error,
  children
}: {
  books: BookType[];
  error: string;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current && books) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setBooks(books));
    if(error){
      storeRef.current.dispatch(setError(error));
    }
  }

  if(!storeRef.current) return <>{children}</>;
  return <Provider store={storeRef.current}>{children}</Provider>
}