const express = require("express"); //Line 1
const path = require("path");
const app = express(); //Line 2
const port = process.env.PORT || 3001; //Line 3
const axios = require("axios");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/fundranking", (req, res) => {
  axios
    .get(
      "https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-" +
        req.query.timerange +
        ".json"
    )
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((error) => {
      res.json({ status: false });
    });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
