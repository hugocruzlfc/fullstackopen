import { gql } from "@apollo/client";

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $genres: [String!]!
    $author: String!
  ) {
    addBook(
      title: $title
      published: $published
      genres: $genres
      author: $author
    ) {
      author
      genres
      id
      title
      published
    }
  }
`;

export default ADD_BOOK;
