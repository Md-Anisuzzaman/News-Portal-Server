const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    // console.log("authmiddlewear",token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorised request" })
    }
    const decoded = await jwt.verify(token, "sabdhan__hack_korbina");
    req.userData = decoded;
    next();
}

module.exports = auth;