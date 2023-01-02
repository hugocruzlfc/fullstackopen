import Data from "./db.js";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import mongoConnection from "./db/mongo.js";
import errorHandler from "./utils/errorHandlers.js";
import {
  createNewEntry,
  findAllEntries,
  findEntryById,
  findByName,
  deleteEntry,
  updateEntry,
} from "./controllers/entryController.js";

let persons = Data.persons;

dotenv.config();
mongoConnection();
const app = express();
app.use(cors());

morgan.token("id", (req) => req.params.id);
morgan.token("body", (req) => JSON.stringify(req.body));

//app.use(morgan("combined"));
app.use(morgan(":url :method :id :body"));

app.use(express.json());
app.use(express.static("build"));

app.get("/", (request, response) => {
  response.send("<h1>Wellcome to Telephone Directory Api</h1>");
});

app.get("/api/persons", (request, response) => {
  findAllEntries().then((entries) => response.json(entries));
});

app.get("/api/info", (request, response) => {
  const time = Date.now();
  const today = new Date(time);

  response.send(
    `<div>
       <h3>Telephone Directory has info ${persons.length} people</h3>
       <h3> ${today} </h3>
      </div>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  findEntryById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  // .catch((error) => {
  //   console.log(error);
  //   response.status(400).send({ error: "malformatted id" });
  // });
});

app.delete("/api/persons/:id", (request, response) => {
  deleteEntry(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  }

  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: `The name ${body.name} already exists!`,
  //   });
  // }
  const existName = await findByName(body.name);

  if (existName.name === body.name) {
    return response.status(400).json({
      error: `The name ${body.name} already exists!`,
    });
  }

  const newEntry = {
    name: body.name,
    number: body.number,
  };

  createNewEntry(newEntry)
    .then((entry) => response.json(entry))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const entry = {
    name: body.name,
    number: body.number,
  };

  updateEntry(request.params.id, entry)
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
