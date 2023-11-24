import useResource from "./hooks/useResource";
import useField from "./hooks/useField";

const URL_BASE = "http://localhost:3005";

const App = () => {
  const [content, resetContent] = useField("text");
  const [name, resetName] = useField("text");
  const [number, resetNumber] = useField("text");

  const [notes, noteService] = useResource(`${URL_BASE}/notes`);
  const [persons, personService] = useResource(`${URL_BASE}/persons`);

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    resetContent();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
