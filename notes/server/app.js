const express = require("express");
const cors = require("cors");
require("express-async-errors");

const notesRouter = require("./controllers/noteController");
const usersRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");
const config = require("./utils/config");
const mongoConnection = require("./db/mongo");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const app = express();

logger.info("connecting to", config.MONGODB_URI);
mongoConnection();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testController");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
