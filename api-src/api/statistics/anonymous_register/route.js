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
    if (!id) {
        return res.status(400).json({
            error: "Your request is invalid, need to pass id",
        });
    }
    const cryptedId = expModulary(
        id, // request id
        14900 + Number(new Date().getFullYear()), // random values
        Number(new Date().getFullYear()) * 7 // random values
    );

    const dayOfMonth = new Date().getDate();
    try {
        const anUser = await prisma.anonymousUser.findFirst();

        if (anUser.date !== dayOfMonth) {
            const lastVisit = await prisma.anonymousUser.findFirst({
                orderBy: {
                    id: "desc",
                },
            });

            await prisma.daylyVisits.create({
                data: {
                    count: lastVisit.id,
                },
            });
            // get Supabase table name with schlag SQL inline :)
            const result =
                await prisma.$queryRaw`SELECT pg_get_serial_sequence('"AnonymousUser"', 'id') as seqname`;
            const sequenceName = result[0].seqname;
            // when we change date, id is reset to 1
            await prisma.$executeRawUnsafe(
                `ALTER SEQUENCE ${sequenceName} RESTART WITH 1`
            );
            await prisma.anonymousUser.deleteMany();
        }
    } catch (error) {
        return res.status(500).json({
            error: `Unexpected error: ${error}`,
        });
    }
    try {
        await prisma.anonymousUser.create({
            data: {
                EcoleDirectePlusUserId: cryptedId,
                date: dayOfMonth,
            },
        });
        return res.json();
    } catch (error) {
        if (error.code === "P2002") {
            // Handle unique constraint error (duplicate entry)

            return res.status(801).json(); // already connected today
        } else {
            // Handle other errors

            return res.status(500).json({
                error: "An unexpected error occurred.",
            });
        }
    }
});

module.exports = router;
