const express = require("express");
const cors = require("cors");
require("express-async-errors");

const config = require("./utils/config");
const app = express();
const mongoConnection = require("./db/mongo");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const blogRouter = require("./controllers/blogController");
const usersRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");

logger.info("connecting to", config.MONGODB_URI);
mongoConnection();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
