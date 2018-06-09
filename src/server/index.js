const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).send("very data");
});

module.exports = router;