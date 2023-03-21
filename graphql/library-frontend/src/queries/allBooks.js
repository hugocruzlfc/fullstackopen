import { gql } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
    }
  }
`;

export default ALL_BOOKS;
