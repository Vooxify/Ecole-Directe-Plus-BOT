const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config({ path: "../../.env" });

const public = fs.readFileSync("../../.certs/public.pem", "utf-8");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Accès refusé : token manquant" });
    }

    jwt.verify(token, public, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token Invalide !" });
        }
        req.user = decoded;
        next();
    });
};
module.exports = { authenticateToken };
