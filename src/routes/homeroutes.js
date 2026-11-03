const express = require("express");
const router = express.Router();
const { getHomeData } = require("../controllers/homecontroller");

router.get("/", getHomeData);

module.exports = router;