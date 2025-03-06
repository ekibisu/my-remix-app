import * as path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@remix-run/express";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(process.cwd(), "build");

const app = express();

app.use(compression());
app.use(morgan("tiny"));

app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);
app.use(express.static("public", { maxAge: "1h" }));

app.all(
  "*",
  createRequestHandler({
    build: await import(`file://${BUILD_DIR}/index.js`),
    mode: process.env.NODE_ENV,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});