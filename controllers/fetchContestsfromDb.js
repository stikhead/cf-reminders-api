import { sql } from "../index.js";

export async function getAllContests(req, res) {
	try {
		const contests = await sql`
      SELECT * FROM contests ORDER BY start_time ASC
    `;
		res.status(200).json(contests);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to load contests" });
	}
}

export async function getUpcomingContests(req, res) {
	try {
		const contests = await sql`
      SELECT * FROM contests 
      WHERE phase = 'BEFORE'
      ORDER BY start_time ASC
    `;
		res.status(200).json(contests);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to load upcoming contests" });
	}
}

export async function getOngoingContests(req, res) {
	try {
		const contests = await sql`
      SELECT * FROM contests 
      WHERE phase = 'CODING'
    `;
		res.status(200).json(contests);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to load ongoing contests" });
	}
}

export async function getPastContests(req, res) {
	try {
		const contests = await sql`
      SELECT * FROM contests 
      WHERE phase = 'FINISHED'
      ORDER BY start_time DESC
      LIMIT 20
    `;
		res.status(200).json(contests);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to load past contests" });
	}
}
