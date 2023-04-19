export type Book = {
    id: string;
    name: string;
    genre: string;
    author: Author;
}

export type Author = {
    id: string;
    name: string;
    age: number;
    books: Book[];
}

export type BooksQuery = {
    books: Book[];
}

export type AuthorsQuery = {
    authors: Author[];
}