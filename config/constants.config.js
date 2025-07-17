require('dotenv').config();

module.exports = {
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10),
    JWT_SECRET: process.env.JWT_SECRET,
    MAX_AGE: 3 * 24 * 60 * 60,
    RATE_LIMIT: {
        windowMs: 15 * 60 * 1000,
        max: 5,
    }
};