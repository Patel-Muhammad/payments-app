require("dotenv").config();

const JWT_SECRET = process.env.JWT;
module.exports = {JWT_SECRET}