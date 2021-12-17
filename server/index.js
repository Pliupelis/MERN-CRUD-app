import todos from "./routes/todos.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import signUp from "./routes/singUp.js";
import signIn from "./routes/signIn.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cors());
app.use("/api/todos", todos);
app.use("/api/signUp", signUp);
app.use("/api/signIn", signIn);

app.get("/", (req, res) => {
  res.status(200).send("welcome");
  //   console.log(Todo); //check if passing model
});

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`running on ${PORT}`));
  })
  .catch((err) => console.log("Connection failed", err.message));
