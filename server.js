const express = require("express");
const { createRequestHandler } = require("@remix-run/express");

const app = express();

app.use(express.static("public")); // Serve static assets

app.all(
  "*",
  createRequestHandler({
    getLoadContext() {
      return {}; // Optional: pass data to loaders
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Remix SSR app running on port ${PORT}`);
});
