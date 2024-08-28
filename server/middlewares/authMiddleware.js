// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET;

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Unauthorized");
    } 
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.json("Invalid token");
        next();
    });
};
