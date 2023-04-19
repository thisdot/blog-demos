import gql from 'graphql-tag';

export const getBooksQuery = gql`
    query {
        books {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    id
                    name
                }
            }
        }
    }`;

export const getAuthorsQuery = gql`
    query {
        authors {
            id
            name
            age
            books {
                id
                name
            }
        }
    }`;

export const addBookMutation = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }`;

export const updateBookMutation = gql`
    mutation updateBook($id: ID!, $name: String, $genre: String, $authorId: ID) {
        updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }`;

export const deleteBookMutation = gql`
    mutation deleteBook($id: ID!) {
        deleteBook(id: $id) {
            id
            name
        }
    }`;