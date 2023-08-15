const express = require("express");
const app = express();

app.use(express.json());

const routes = require("./routes");

app.use("/", routes);

const PORT = process.env.PORT || 8000;

module.exports = app.listen(PORT, () => {
    console.log(`🚀 server is working on ${PORT}`);
})