var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const routes = require("./index.route");
var cors = require("cors");

require("./app/database/mySql");
require("./app/database/sqlServer");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

// Create a Server
var server = app.listen(4040, function () {
	const port = server.address().port;
	console.log(`API running at port: ${port}`);
});

module.exports = app;
