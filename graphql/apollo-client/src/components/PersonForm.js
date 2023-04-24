import React, { useState } from "react";
import { useMutation, useSubscription, useApolloClient } from "@apollo/client";
import { CREATE_PERSON, ALL_PERSONS } from "../queries";

export default function PersonForm({ setError }) {
  const client = useApolloClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    //   refetchQueries: [ { query: ALL_PERSONS }, { query: OTHER_QUERY }, { query: ... } ]   si quiero actulaziar varias queries
    onError: (error) => {
      const errors = error.graphQLErrors[0].message;
      //   const messages = Object.values(errors)
      //     .map((e) => e.message)
      //     .join("\n");
      setError(errors);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        };
      });
    },
  });

  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_PERSONS });
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) },
      });
    }
  };

  useSubscription(CREATE_PERSON, {
    onData: ({ data }) => {
      console.log(data);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        phone: phone.length > 0 ? phone : undefined,
        street,
        city,
      },
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{" "}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{" "}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
}
