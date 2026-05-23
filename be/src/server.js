import express from "express";

const app = express();
const port = process.env.PORT || 3001;
const host = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const server = app.listen(port, host, () => {
  console.log(`API listening on http://${host}:${port}`);
});

server.on("error", (error) => {
  console.error("API failed to start:", error);
  process.exit(1);
});
