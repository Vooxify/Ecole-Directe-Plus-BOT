const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config({ path: "../../.env" });

const secret = fs.readFileSync("../../.certs/private.pem", "utf-8");
const generateAndSignToken = (req, res, next) => {
    const payload = { Pay: "LOAD" };

    const signOptions = {
        expiresIn: process.env.JWT_TIMING,
        algorithm: "RS256",
    };

    const jsonWebToken = jwt.sign(payload, secret, signOptions);
    res.json({ token: jsonWebToken });
    next();
};
module.exports = { generateAndSignToken };
