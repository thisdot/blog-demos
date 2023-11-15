import "express-async-errors";

import express from "express";
import errorHandler from "./middleware/errorHandler";
import routes from "./routes";

const EXPRESS_PORT = 3000;

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

const server = app.listen(EXPRESS_PORT, () => {
  console.log(`Partial index demo listening on port ${EXPRESS_PORT}`);
});

if (import.meta.hot) {
  console.log("Change detected, reloading server...");

  async function killServer() {
    await server.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }

  import.meta.hot.on("vite:beforeFullReload", () => {
    killServer();
  });

  import.meta.hot.dispose(() => {
    killServer();
  });
}
