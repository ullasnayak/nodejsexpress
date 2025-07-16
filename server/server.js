const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const movieRoutes = require("./routes/movieAPI");
app.use("/api", movieRoutes);

http.listen(8080, () => console.log("Server running on port 8080"));
