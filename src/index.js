const express = require("express");
const ExceptionHandler = require("./common/handlers/exception.handler");
const RouteNotFoundHandler = require("./common/handlers/route-not-found.handler");
const env = require("./configs");
const DatabaseService = require("./database");

// Import Routers
const TestRouter = require("./routers/test.router");
const AuthRouter = require("./routers/auth.router");
const CategoryRouter = require("./routers/category.router");
const ItemsRouter = require("./routers/items.router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init database
DatabaseService.init();

// Global middlewares - auth

// Routers
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/items", ItemsRouter);
app.use("/test", TestRouter);

// Route not found handler
app.use(RouteNotFoundHandler);

// Exception handler
app.use(ExceptionHandler);

app.listen(env.PORT, () => {
  console.log(`[Server] Listening on port ${env.PORT}`);
});
