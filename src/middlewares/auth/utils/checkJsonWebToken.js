const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkJsonWebToken = async (username, password) => {
    try {
        const user = await prisma.aPIUser.findUnique({
            where: {
                username: username,
            },
        });

        // Vérifier si l'utilisateur existe
        if (!user) {
            console.log("User not found.");
            return;
        }

        // Comparer le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log("Invalid password.");
        } else {
            console.log("Valid password!");
            console.log("User found:", user);
        }
    } catch (error) {
        console.error("Error finding user:", error);
    } finally {
        await prisma.$disconnect();
    }
};
