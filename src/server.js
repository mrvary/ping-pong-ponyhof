const express = require("express");

module.exports = {
  startServer() {
    const app = express();
    const PORT = 3000;

    app.get("/", (req, res) => res.send("yo"));

    app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
  }
};
