const express = require("express");
const {
    json
} = require("express");
const connect = require("./config/database");
const cors = require('cors');
const commentRoute = require("./routes/commentRoute");
const likeRoute = require("./routes/likeRoutes");


connect();

const app = express();
app.use(cors);
app.use(json());
app.use("/comment", commentRoute);
app.use('/like', likeRoute)

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Mongo server on DB");
});

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));