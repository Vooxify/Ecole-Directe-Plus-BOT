const express = require("express");
const router = express.Router();

const {
    generateAndSignToken,
} = require("../../../middlewares/generateJsonWebToken");

router.get("/", generateAndSignToken, (req, res) => {
    res.json({ yo: "man" });
});
module.exports = router;
