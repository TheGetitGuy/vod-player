# VOD Player (vodplayer.net)

I built this VOD player because I needed a player for my twitch channel (https://twitch.tv/retrommo) which could render archived Twitch chat of JSON format alongside an MP4.

This project uses vanilla HTML/CSS/JS and is hosted on GitHub Pages.

To use this tool, you need to self-host the MP4 file of your VOD and the JSON file of your VOD's Twitch chat.
- You can use https://github.com/TwitchRecover/TwitchRecover combined with https://github.com/videolan/vlc to download an MP4 of a VOD.
- You can use https://github.com/PetterKraabol/Twitch-Chat-Downloader to download a VOD's chat JSON file.

The URL of the MP4 and JSON files are included in the query string of the URL.

Example: https://vodplayer.net/?mp4=https://retrommo-vods.s3.us-east-2.amazonaws.com/2021-06-29-3.mp4&json=https://retrommo-vods.s3.us-east-2.amazonaws.com/2021-06-29-3.json