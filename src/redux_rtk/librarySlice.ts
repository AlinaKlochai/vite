import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

export type Book = {
    isbn: string // (unique)
    title: string
    year: number
    author: string
};


const initialState = {
    books: [
        { isbn: '1', title: 'Harry Potter', author: 'J.K. Rowling', year: 1997 }
    ]
};

export const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        addBook(state, action: PayloadAction<Omit<Book, 'isbn'>>) {
            state.books.push({ isbn: uid(), ...action.payload });
        },
        editBook(state, action: PayloadAction<Book>) {
            state.books = state.books.map(book =>
                book.isbn === action.payload.isbn ? { ...action.payload } : book
            );
        },
        deleteBook(state, action: PayloadAction<string>) {
            const index = state.books.findIndex((e) => e.isbn === action.payload)
            state.books.splice(index, 1)
        }
    }
});

export const { addBook, editBook, deleteBook } = librarySlice.actions;

export default librarySlice.reducer;

