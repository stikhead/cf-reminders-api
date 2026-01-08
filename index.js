import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import subscribtionRoute from "./routes/newSubscription.js";
import contestListRoute from "./routes/contests.js";
import "./jobs/storeContestsinDb.js";

const app = express();
const port = process.env.PORT;

import { neon } from "@neondatabase/serverless";
export const sql = neon(process.env.DATABASE_URL);

app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`Server listening to ${port}.`);
});

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to CF Contest Reminder API");
});

app.use("/subscribe", subscribtionRoute);
app.use("/contests", contestListRoute);
