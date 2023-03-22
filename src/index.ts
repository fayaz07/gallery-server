import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import pondy from "./data";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3400;

app.use(express.static("public"));

app.get("/dl/:album/:filename", (req: Request, res: Response) => {
  const fn = req.params.filename;
  const album = req.params.album;
  const parts = fn.split(".");
  const extension = parts.pop(); // removes the last element from the array and returns it
  const fileNameWithoutExt = parts.join(".");

  let size = "";
  let filePath = "";
  if (fileNameWithoutExt.endsWith("_lg")) {
    size = "large";
    filePath = path.join(__dirname, "../public", album, size, fn);
  } else if (fileNameWithoutExt.endsWith("_md")) {
    size = "medium";
    filePath = path.join(__dirname, "../public", album, size, fn);
  } else if (fileNameWithoutExt.endsWith("_sm")) {
    size = "small";
    filePath = path.join(__dirname, "../public", album, size, fn);
  } else {
    size = "original";
    filePath = path.join(__dirname, "../public", album, fn);
  }

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath, fn, (err) => {
      if (err) {
        console.log("Error downloading file:", err);
        res.status(500).send("Error downloading file");
      }
    });
  } else {
    res.status(404).send("File not found");
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/albums", (req: Request, res: Response) => {
  res.json({
    data: [
      { id: "pondy", name: "album1", date: "20-03-2023", pages: 10 },
      { id: "2", name: "album2", date: "1-2-2023", pages: 5 },
    ],
  });
});

app.get("/album/:id", (req: Request, res: Response) => {
  const page: string = req.query.page?.toString() || "1";

  // if(req.params.id == "pondy")

  res.json({
    id: req.params.id,
    page: Number(page),
    totalPages: pondy.pages,
    data: pondy.data.get(page),
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
