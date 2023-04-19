const graphQL = require('graphql');

// Import the models
const Book = require('../models/book');
const Author = require('../models/author');

// Import objects from graphql
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphQL;

// Define Author Type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  /**
   * The reason why fields is a function is that BookType is not
   * yet defined. If we were to use an object instead, it will fail because
   * BookType is defined later. With a function, we are postponing the execution
   * till later when all types are known.
   */
  fields: () => ({
    // Fields exposed via query
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      // How to retrieve Books on an Author object
      type: new GraphQLList(BookType),
      /**
       * parent is the author object retrieved from the query below
       */
      resolve(parent, args) {
        return Book.find({
          authorId: parent.id
        });
      }
    }
  })
});

// Define Book Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // Fields exposed via query
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      // How to retrieve Author on a Book object
      type: AuthorType,
      /**
       * parent is the book object retrieved from the query below
       */
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    }
  })
});

// Define Query endpoints available on the GraphQL Server
// The top-level query object returns a `RootQueryType` object
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      // book() {} endpoint
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      // author() {} endpoint
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      // books {} endpoint
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      // authors {} endpoint
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

// Define Mutation endpoints available on the GraphQL Server
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      // addAuthor() {} endpoint
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parent, args) {
        // add the author object to db
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save(); // save model to database
      }
    },
    addBook: {
      // addBook() {} endpoint
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save(); // save model to database
      }
    },
    updateBook: {
      // updateBook() {} endpoint
      type: BookType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        name: {
          type: GraphQLString
        },
        genre: {
          type: GraphQLString
        },
        authorId: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        if (!args.id) return;

        return Book.findOneAndUpdate(
          {
            _id: args.id
          },
          {
            $set: {
              name: args.name,
              genre: args.genre,
              authorId: args.authorId
            }
          },
          {
            new: true // return the new updated object
          },
          (err, book) => {
            // the callback function
            if (err) {
              console.log('Something wrong when updating data!');
            }

            console.log(book);
          }
        );
      }
    }, // end updateBook
    deleteBook: {
      type: BookType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        if (!args.id) return;

        return Book.findByIdAndDelete(
          args.id,
          // the callback function
          (err, book) => {
            if (err) {
              console.log('Something wrong when deleting data!');
            }
            console.log(book);
          }
        );
      }
    } // end deleteBook
  }
});

// Export a GraphQL schema with Query and Mutation endpoints
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
