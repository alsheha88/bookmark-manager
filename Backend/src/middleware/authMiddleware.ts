import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];
	const token = authHeader?.split(" ")[1]; // ← extracts just the token part
	if (!token) {
		return res.status(401).send({ message: "No token provided" });
	}

	jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {

		if (err) {
			return res.status(401).json({ message: "Invalid token" });
		}

		if (typeof decoded === "object" && decoded !== null) {
			req.id = decoded.id;
		}
		next();
	});
}

export default authMiddleware;
