
export const getData = async () => {
	const data = await Deno.readTextFile("./data/subreddits.json");

	const parsed: {
		[key: string]: string[] | string;
	} = JSON.parse(data);
	return parsed;
}

export const setData = async (subreddit: string, id: string) => {
	const data = await getData();
	const subredditData = data[subreddit];
	if (subredditData && typeof subredditData !== "string") {
		if (subredditData.length > 5) {
			subredditData.shift()
		}
		subredditData.push(id);
		data[subreddit] = subredditData;
	} else if (subredditData && typeof subredditData === "string") {
		const subredditArr = [subredditData, id];
		data[subreddit] = subredditArr;
	} else return false;

	Deno.writeTextFileSync("./data/subreddits.json", JSON.stringify(data));
}