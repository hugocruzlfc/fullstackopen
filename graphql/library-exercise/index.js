const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Stephen King",
    id: "afa51ab0-344d-11e9-a414-719c6709ee3e",
    born: 1950,
  },

  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `#graphql
  type Book {
     title: String!,
    published: Int!,
    author: String!,
    id: String!,
    genres: [String!]!,
  }
  type Author {
    name: String!,
    born: Int,
    id: String!,
    bookCount: Int!,
  }

  type Query {
   bookCount: Int!
   authorCount: Int!
   allBooks(author: String, genre: String) : [Book!]!
   allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    # addAuthor(
    #   name: String!
    #   born: Int
    # ):Author
}

`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      }
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        );
      }
      if (args.author && !args.genre) {
        return books.filter((book) => book.author === args.author);
      }
      if (!args.author && args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) =>
      books.reduce(
        (acc, book) => (root.name === book.author ? (acc = acc + 1) : acc),
        0
      ),
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() };
      const currentAuthor = books.find((book) => book.author === args.author);
      books = books.concat(newBook);
      if (!currentAuthor) {
        const name = args.author;
        const newAuthor = { born: null, name: args.author, id: uuid() };
        authors = authors.concat(newAuthor);
      }
      return newBook;
    },
    editAuthor: (root, args) => {
      if (!args.name || !args.setBornTo) {
        throw new GraphQLError("Name and born must necessary", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const currentAuthor = authors.find((author) => author.name === args.name);
      currentAuthor.born = args.setBornTo;
      authors = authors.map((author) => {
        if (author.name === args.name) {
          const updateAutor = {
            ...author,
            born: currentAuthor.born,
          };
          return updateAutor;
        } else return author;
      });
      return currentAuthor;
    },
    // addAuthor: (root, args) => {
    //   const newAuthor = { ...args, id: uuid() };
    //   authors = authors.concat(newAuthor);
    //   return newAuthor;
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
