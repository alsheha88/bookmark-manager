import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/lib/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { defaultSeedData } from "../../prisma/seed.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	const { email, password, fullName } = req.body;
	const [firstName, ...rest] = fullName.trim().split(' ');
	const lastName = rest.join(' ');

	const hash = Number(process.env.SALT_HASH);
	// Password Encryption
	const hashedPassword = bcrypt.hashSync(password, hash);
	try {
		const newUser = await prisma.user.create({
			data: {
				username: email,
				password: hashedPassword,
				firstName: firstName,
				lastName: lastName,
			},
		});
		const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
			expiresIn: "24h",
		});

		await defaultSeedData(newUser.id)

		res.json({ token });
	} catch (error: any) {
		if (error.code === "P2002") return res.status(409).send({message: "Email already exists"})
		res.status(500).send({ message: "Failed to create user" });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: {
				username: email,
			},
		});
		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		const passwordIsValid = bcrypt.compareSync(password, user.password);

		if (!passwordIsValid) {
			return res.status(404).send({ message: "Incorrect Password" });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
			expiresIn: "24h",
		});
        res.json({token})
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Failed to fetch user" });
    }
});

router.get("/me", authMiddleware,async (req, res) => {
	if (!req.id) return res.status(401).json({ message: "Unauthorized" })

	try {
		const user = await prisma.user.findUnique({
			where: { id: req.id },
			select: { id: true, username: true, firstName: true, lastName: true }
		})
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch user" })
	}
})

export default router;
