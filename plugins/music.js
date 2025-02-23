const axios = require("axios");
const yts = require("yt-search");
const { youtube } = require("btch-downloader");
const { cmd } = require("../command");

const searchYouTube = async (query) => {
    if (query.includes("youtube.com") || query.includes("youtu.be")) return query;
    let search = await yts(query);
    return search.all.length ? search.all[0].url : null;
};

cmd({
    pattern: "music",
    desc: "Download and send audio from YouTube",
    category: "media",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    if (!args.length) return reply("Please provide a song name or YouTube link.");
    
    let url = await searchYouTube(args.join(" "));
    if (!url) return reply("Couldn't find a song matching your query.");

    let result = await youtube(url);
    if (!result || !result.audio) return reply("Failed to download audio.");

    await conn.sendMessage(m.from, {
        image: { url: result.thumbnail },
        caption: `🎵 *Title:* ${result.title}\n\n🔗 *Downloading audio...*`
    });

    await conn.sendMessage(m.from, {
        audio: { url: result.audio },
        mimetype: "audio/mp4",
        ptt: false
    });
});
