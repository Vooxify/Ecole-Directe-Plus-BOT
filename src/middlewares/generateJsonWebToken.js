const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config({ path: "../../.env" });

const secret = fs.readFileSync("../../.certs/private.pem", "utf-8");
const generateAndSignToken = (req1, res) => {
    const payload = {
        userId: 456,
        userName: "Roger",
        group: "authUser",
    };

    const signOptions = {
        expiresIn: process.env.JWT_TIMING,
        algorithm: "RS256",
    };

    const jsonWebToken = jwt.sign(payload, secret, signOptions);
    res.json({ token: jsonWebToken });
};
module.exports = { generateAndSignToken };
