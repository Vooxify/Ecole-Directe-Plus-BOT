const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const saveToken = async (userId, token) => {
    try {
        const updatedUser = await prisma.aPIUser.update({
            // add token in db
            where: { id: userId },
            data: { activeToken: token },
        });
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { saveToken };
