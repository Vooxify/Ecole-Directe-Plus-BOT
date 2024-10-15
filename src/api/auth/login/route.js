const express = require("express");
const router = express.Router();
const {
    checkConnection,
} = require("../../../middlewares/auth/checkConnection");

const urlencodedParser = express.urlencoded({ extended: false });

router.post("/", urlencodedParser, checkConnection, async (req, res) => {});

module.exports = router;
