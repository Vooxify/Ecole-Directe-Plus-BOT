const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body.hasOwnProperty("startDate") || !body.hasOwnProperty("endDate")) {
        return res.status(400).json({
            error: "Malformed request, startDate and endDate must be provided",
        });
    }

    const startDate = body.startDate;
    const endDate = body.endDate;

    return res.json({ message: "Dates received", startDate, endDate });
});

module.exports = router;
