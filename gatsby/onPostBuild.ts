import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { buildRobotsTxt } from "../src/utils/robots";

export default async function onPostBuild(): Promise<void> {
	await writeFile(join(process.cwd(), "public", "robots.txt"), buildRobotsTxt("https://nikoheikkila.fi"));
}
