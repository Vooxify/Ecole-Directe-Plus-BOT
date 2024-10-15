const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express;
// express.urlencoded({ extended: false }); IS REQUIRED !

const checkConnection = async (req, res, next) => {
    try {
        const expectedHeaders = ["username", "password"];
        const requestHeaders = Object.keys(req.body);
        const extraHeaders = requestHeaders.filter(
            (header) => !expectedHeaders.includes(header.toLowerCase())
        );

        if (extraHeaders.length > 0) {
            return res
                .json({
                    message: `Unexpected header: ${extraHeaders.join(", ")}`,
                })
                .status(204);
        } else if (requestHeaders.length < 2) {
            return res
                .json({
                    message: "Please forward all headers username and password",
                })
                .status(205);
        }
        const username = req.body.username;
        const password = req.body.password;

        const user = await prisma.aPIUser.findUnique({
            where: { username: username },
        });
        if (user === null) {
            return res.json({ message: "User not found" });
        }
        res.json({ prisma_user: user.email, password: user.password });
        next();

        // if ("password" in req.body && "username" in req.body) {
        //     res.json({ message: "Correct headers" });
        // } else {
        //     res.json({ message: "ERROR" });
        // }
    } catch (error) {
        return res.json({ message: error });
    }
};

module.exports = { checkConnection };
