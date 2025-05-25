import graphql from "graphql";

// A Schema File has three responsabilities:
// -First: To define types,
// -Second: To define relationships,
// -Third: To define Route Queries

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
let books = [
  { name: "Dom Casmurro", genre: "Romance", id: "1", authorId: "1" },
  { name: "O Senhor dos Anéis", genre: "Fantasia", id: "2", authorId: "2" },
  { name: "1984", genre: "Distopia", id: "3", authorId: "3" },
  {
    name: "Memórias Póstumas de Brás Cubas",
    genre: "Realismo",
    id: "4",
    authorId: "1",
  },
  { name: "O Hobbit", genre: "Fantasia", id: "5", authorId: "2" },
  {
    name: "A Revolução dos Bichos",
    genre: "Sátira Política",
    id: "6",
    authorId: "3",
  },
];

let authors = [
  { name: "Machado de Assis", age: 69, id: "1" },
  { name: "J.R.R. Tolkien", age: 81, id: "2" },
  { name: "George Orwell", age: 46, id: "3" },
];

// To define types,

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return authors.find((author) => {
          return author.id == parent.authorId;
        });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter((book) => {
          return parent.id == book.authorId;
        });
      },
    },
  }),
});

// To define Route Queries

// We have have three routes queries: A particular book, a particular author, all books and all authors
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // A particular book
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // code to get data from db / other source
        return books.find((book) => {
          return book.id == args.id;
        });
      },
    },
    //A particular author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return authors.find((author) => {
          return author.id == args.id;
        });
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
