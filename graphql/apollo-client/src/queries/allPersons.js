import { gql } from "@apollo/client";
import PERSON_DETAILS from "./fragments/personDetails";

const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export default ALL_PERSONS;
