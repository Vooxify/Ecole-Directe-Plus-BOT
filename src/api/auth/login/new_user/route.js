const express = require("express");
const router = express.Router();
const {
    checkUserConnection,
} = require("../../../../middlewares/auth/checkUserConnection");

router.post("/", checkUserConnection, (req, res) => {
    res.json({ ta: "maman" });
});

module.exports = router;
