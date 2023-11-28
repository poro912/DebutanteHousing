const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const routes = require("./routes");

app.use("/", routes);

const PORT = process.env.PORT || 3310;

module.exports = app.listen(PORT, () => {
    console.log(`🚀 server is working on ${PORT}`);
})