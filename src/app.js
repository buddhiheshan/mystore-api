const express = require("express");
const ExceptionHandler = require("./common/handlers/exception.handler");
const RouteNotFoundHandler = require("./common/handlers/route-not-found.handler");
const { knexConnection, initDatabase } = require("./database");
const cors = require("cors");

// Import Routers
const HelthCheckRouter = require("./routers/helthCheck.router");
const AuthRouter = require("./routers/auth.router");
const CategoryRouter = require("./routers/category.router");
const ItemsRouter = require("./routers/items.router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init database
initDatabase(knexConnection);
// Global middlewares - auth

app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to mystore-api v1.",
  });
});

// Routers
app.use("/health", HelthCheckRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/items", ItemsRouter);

// Route not found handler
app.use(RouteNotFoundHandler);

// Exception handler
app.use(ExceptionHandler);

module.exports = app;
