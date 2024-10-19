const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const expModulary = (a, b, p) => {
    let result = 1;
    a = a % p;

    while (b > 0) {
        if (b % 2 === 1) {
            result = (result * a) % p;
        }
        b = Math.floor(b / 2);
        a = (a * a) % p;
    }

    return result;
};

router.post("/", async (req, res) => {
    const id = !req.body.id ? null : Number(req.body.id);
    const cryptedId = expModulary(
        id,
        14900 + Number(new Date().getFullYear()),
        Number(new Date().getFullYear()) * 7
    );

    const currentDate = new Date();

    // Get the current day of the month
    const dayOfMonth = currentDate.getDate();

    try {
        await prisma.anonymousUserVisit.create({
            data: {
                EcoleDirectePlusUserId: cryptedId,
            },
        });
        res.json({
            result: cryptedId,
            time: dayOfMonth,
        });
    } catch (error) {
        if (error.code === "P2002") {
            // Handle unique constraint error (duplicate entry)

            res.status(409).json({
                error: "This user has already been registered.",
            });
        } else {
            // Handle other errors

            res.status(500).json({
                error: "An unexpected error occurred.",
            });
        }
    }
});

module.exports = router;
