const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config({ path: "../../.env" });

const secret = fs.readFileSync("../../.certs/private.pem", "utf-8");

const generateJsonWebToken = (payload) => {
    const signOptions = {
        expiresIn: process.env.JWT_TIMING,
        algorithm: "RS256",
    };
    return jwt.sign(payload, secret, signOptions); // create TOKEN
};

module.exports = { generateJsonWebToken };
