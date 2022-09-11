import appJson from "../app.json" assert { type: "json" };
import needToPost from "./utils/checkLastPost.ts";
import { config } from "./utils/config.ts";
import fetchSubredditData from "./utils/fetchSubredditData.ts";
import sendToWebhook from "./utils/sendToWebhook.ts";

console.info(`Version: ${appJson.version}`);

fetchSubredditData(config()[0].subreddit_name).then(async (data) => {
	if (data) {
		if (await needToPost(config()[0].subreddit_name, data.id)) {
			console.log(`New post found!`);
			await sendToWebhook(config()[0].subreddit_name);
			Deno.writeTextFileSync(
				"./data/subreddits.json",
				JSON.stringify({
					[config()[0].subreddit_name]: [data.id],
				})
			);
		}
	}
});

setInterval(() => {
	fetchSubredditData(config()[0].subreddit_name).then(async (data) => {
		if (data) {
			if (await needToPost(config()[0].subreddit_name, data.id)) {
				await sendToWebhook(config()[0].subreddit_name);
				Deno.writeTextFileSync(
					"./data/subreddits.json",
					JSON.stringify({
						[config()[0].subreddit_name]: data.id,
					})
				);
			}
		}
	});
}, 60000);
