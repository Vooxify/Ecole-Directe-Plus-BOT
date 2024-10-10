const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try {
        const compteur = await prisma.counter.upsert({
            where: { id: 1 },
            update: { count: { increment: 1 } },
            create: { count: 1 },
        });

        res.json({ message: `Counter: ${compteur.count}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error !",
        });
    }
};
