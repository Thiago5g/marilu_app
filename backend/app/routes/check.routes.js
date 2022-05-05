const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

router.route("/")

	.post((req, res) => res.status(200).send({ validated: true }));

module.exports = router;


