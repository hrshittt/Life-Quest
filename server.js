const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../client")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/upload.html"));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "resume.pdf"),
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(path.join(__dirname, "uploads/resume.pdf"));
    const data = await pdfParse(pdfBuffer);
    const text = data.text.toLowerCase();

    const questions = [];

    if (text.includes("javascript")) {
      questions.push({
        question: "What is a closure in JavaScript?",
        options: ["A. A function with its lexical scope", "B. A standalone function", "C. A class", "D. A callback"],
        answer: "A"
      });
    }

    if (text.includes("node.js") || text.includes("nodejs")) {
      questions.push({
        question: "How does the event loop work in Node.js?",
        options: ["A. Multi-threaded", "B. Parallel execution", "C. Single-threaded non-blocking", "D. Blocks on I/O"],
        answer: "C"
      });
    }

    if (text.includes("mongodb")) {
      questions.push({
        question: "Which of the following is a feature of MongoDB?",
        options: ["A. Relational DB", "B. Fixed schema", "C. Document-oriented", "D. None of the above"],
        answer: "C"
      });
    }

    if (text.includes("figma")) {
      questions.push({
        question: "What is Figma used for?",
        options: ["A. Backend logic", "B. Designing UIs", "C. Data storage", "D. Browser extensions"],
        answer: "B"
      });
    }

    if (questions.length === 0) {
      questions.push({
        question: "Tell us about a project you are most proud of.",
        options: ["A. Academic", "B. Personal", "C. Group", "D. None"],
        answer: "B"
      });
    }

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
