import express, { Request, Response } from "express";
import shortid from "shortid";

const app = express();
const PORT = 3001;

const urlDatabase: { [key: string]: string } = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/shorten", (req: Request, res: Response) => {
  const originalUrl = req.body.url;
  const shortCode = shortid.generate();

  urlDatabase[shortCode] = originalUrl;

  const shortUrl = `http://localhost:${PORT}/${shortCode}`;
  res.send(`Short URL: ${shortUrl}`);
});

app.get("/:shortCode", (req: Request, res: Response) => {
  const shortCode = req.params.shortCode;
  const originalUrl = urlDatabase[shortCode];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("Short link not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
