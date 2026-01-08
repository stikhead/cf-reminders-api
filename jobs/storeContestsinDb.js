const url = "https://codeforces.com/api/contest.list";

import cron from "node-cron";
import { sql } from "../index.js";

async function fetchContests() {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.result;
	} catch (err) {
		console.error(err);
	}
}

export async function postContestsToDb() {
	const contests = await fetchContests();

	console.log("storing contests in db");

	for (const contest of contests) {
		const {
			id,
			name,
			type,
			phase,
			startTimeSeconds,
			durationSeconds,
			preparedBy,
		} = contest;

		await sql`INSERT INTO contests (id, name, phase, start_time, duration_seconds, prepared_by, type) VALUES (${id}, ${name}, ${phase}, to_timestamp(${startTimeSeconds}), ${durationSeconds}, ${preparedBy}, ${type})
		ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        phase = EXCLUDED.phase,
        start_time = EXCLUDED.start_time,
        duration_seconds = EXCLUDED.duration_seconds,
        prepared_by = EXCLUDED.prepared_by,
        type = EXCLUDED.type,
        updated_at = NOW();`;
	}

	console.log("Contests stored in db successfully");
}

// this function runs every hour to fetch latest contests and store in db
cron.schedule("0 * * * *", async () => {
	console.log(
		"Fetching contests from CF API and storing in the contests table"
	);
	await postContestsToDb();
});
