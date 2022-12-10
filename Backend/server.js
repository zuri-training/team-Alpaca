const express = require("express");
const { json } = require("express");
const connect = require("./config/database");
const taskRoute = require("./routes/commentRoute");

connect();

const app = express();
app.use(json());
app.use("/comment", commentRoute);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Mongo server on DB");
});

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
