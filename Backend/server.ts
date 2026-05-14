import 'dotenv/config'
import express from "express";
import authRouter from "./src/routes/auth.routes.js";
import bookmarksRouter from './src/routes/bookmarks.routes.js'
import authMiddleware from "./src/middleware/authMiddleware.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use("/auth" ,authRouter);
app.use("/bookmarks", authMiddleware, bookmarksRouter)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
