# Reddit-Discord Bridge
A project to post reddit posts to discord, written in TypeScript using Deno.  

Despite what the name may suggest (please feel free to suggest a better name), this project just posts reddit posts to discord using webhooks. It does not have any puppeting capabilities.

## Motivation
I have been using a reddit bot for a while but it is no longer properly maintained so I decided to create this. The way the bridge works is it polls the Reddit API for new posts and then posts them to a Discord channel using Discord webhooks. I may look at converting this to a bot in the future. Since this has no interface, everything must be done through a config file.

## Hosting
The project currently can only be self-hosted due to the fact that there is no database, just a config file. This may change in the future so watch this space. I provide a docker image for the project that is available on GHCR. An example of a docker-compose file would look like:
```yaml
version: "3"

services:
  rdb:
    image: 'ghcr.io/lucxjo/reddit-discord-bridge:latest'
      volumes:
        - ./data:/app/data
```

**Please note:** The project is currently in a very early stage of development and may not be stable. Please report any issues on the [issue tracker](https://github.com/Lucxjo/reddit-discord-bridge/issues). The project currently runs using static files, on start a file will be created to store the latest post ID. This is not a permanent solution and will be changed in the future for those using databases.

## Configuration
Configuration is done through a single config file and must in the location of `${local_data_dir}/config.json` where `${local_data_dir}` is the location set in the volumes section of the docker-compose file. The following is the config structure:
```json
[
	{
		"subreddit_name": "",
		"discord_webhook_url": "",
		"embed_colour": ""
	}
]
```
Although the config is in an array of objects, only one object is currently supported. The array is in preparation for future support for multiple subreddits.

The `embed_colour` field is optional and can be any valid hex colour. If not provided, the default colour will be used. This was introduced in v1.0.3.