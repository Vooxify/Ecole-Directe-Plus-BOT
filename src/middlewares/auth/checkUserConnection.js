const express = require("express");
const urlencodedParser = express.urlencoded({ extended: false });
const { verifyToken } = require("../../middlewares/auth/utils/verifyToken");

const handleToken = async (authToken, req, res, next) => {
    const payload = await verifyToken(authToken);

    if (payload.message) {
        return res.status(400).json({ error: payload.message });
    }
    next();
};

const checkUserConnection = async (req, res, next) => {
    try {
        urlencodedParser(req, res, async () => {
            try {
                const authorizationHeader = req.headers.authorization;

                const tokenHeader = !authorizationHeader
                    ? undefined // if token is not provided
                    : authorizationHeader.split(" ")[1];

                !authorizationHeader
                    ? res.status(401).json({
                          error: "Please pass token and not your connection informations or log-in to get token",
                      })
                    : handleToken(tokenHeader, req, res, next);
            } catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

module.exports = { checkUserConnection };
