import express from "express";
import type { Request, Response } from "express";

const PORT = 8080;

const app = express();

app.get("/", (res: Response) => {
  res.send("Hello World.");
});

app.listen(PORT, () => {
  console.log(`Server started on :${PORT} 🚀`);
});
