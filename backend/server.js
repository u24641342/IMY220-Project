import express from "express";
import path from "path";
// CREATE APP
const app = express();

app.use(express.json());
app.use(express.static("./frontend/public"));

app.post("/api/signup", (req, res) => {
    res.json({ success: true, message: "Welcome aboard brodie.", user: { email: req.body.email } });
});

app.post("/api/signin", (req, res) => {
    res.json({ success: true, message: "Welcome back brodie.", token: "brodie-token", user: { email: req.body.email } });
});

app.use((req, res) => {
  res.sendFile("index.html", { root: "frontend/public" });
});

app.listen(3000, () => {
    console.log("Listening on localhost:3000");
});