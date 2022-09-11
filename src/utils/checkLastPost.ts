import fetchSubredditData from "./fetchSubredditData.ts";
import sendToWebhook from "./sendToWebhook.ts";

const needToPost = async (subreddit: string, id: string) => {
	try {
		const data = await Deno.readTextFile("./data/subreddits.json");

		const parsed: {
			[key: string]: [string] | string;
		} = JSON.parse(data);

		console.log(parsed[subreddit], id);

		if (parsed[subreddit].includes(id)) return false;
		else return true;
	} catch (e: any) {
		console.error(e);
		if (e.code === "ENOENT") {
			fetchSubredditData(subreddit).then(
				(data: { id: string } | undefined) => {
					if (data) {
						sendToWebhook(subreddit);
						Deno.writeTextFile(
							"./data/subreddits.json",
							`{"${subreddit}": ["${data.id}"]}`
						);
					}
				}
			);
		}
		return false;
	}
};

export default needToPost;
