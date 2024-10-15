const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerNewUser = async (
    password,
    email,
    discordTag,
    username,
    group
) => {
    console.log("[#] Starting creating user");
    const hashedPassword = await bcrypt.hash(password, 11 /* salt */);
    try {
        const newUser = await prisma.aPIUser.create({
            data: {
                password: hashedPassword,
                email: email,
                discordTag: discordTag,
                username: username,
                group: group,
            },
        });
        console.log("[*] User created succesfully !\n", newUser);
    } catch (error) {
        console.error("[!] Error creating user: ", error);
    } finally {
        await prisma.$disconnect;
    }
};
