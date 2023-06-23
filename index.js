const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");

const products = require("./products");

const app = express();

require("dotenv").config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};


app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const url = process.env.DB_URL;

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) => console.log(err));
