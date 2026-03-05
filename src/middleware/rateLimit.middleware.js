import rateLimit from "express-rate-limit"

export const authRateLimit = rateLimit({
    windowMs:  15 * 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
	ipv6Subnet: 56,
})
