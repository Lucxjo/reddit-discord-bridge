export type Config = { subreddit_name: string; discord_webhook_url: string, embed_colour?: string, embed_color?: string };

export const config = () => {
	const path = Deno.env.get('DEVELOPMENT') === 'true'
		? './data/config.dev.json'
		: './data/config.json';
	const data: Config[] | Config = JSON.parse(Deno.readTextFileSync(path));

	return Deno.env.get('DEVELOPMENT') === 'true'
		? ([data] as Config[])
		: (data as Config[]);
};
