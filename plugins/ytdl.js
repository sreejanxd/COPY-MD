const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

const downloadAudio = async (query) => {
    let url = query.includes("youtube.com") ? query : (await yts(query)).all[0]?.url;
    if (!url) return null;
    let { data } = await axios.get(`https://apis.davidcyriltech.my.id/youtube/mp3?url=${url}`);
    return data.success ? data.result : null;
};

const downloadVideo = async (query) => {
    let url = query.includes("youtube.com") ? query : (await yts(query)).all[0]?.url;
    if (!url) return null;
    let { data } = await axios.get(`https://apis.davidcyriltech.my.id/youtube/mp4?url=${url}`);
    return data.status ? data.result : null;
};

cmd({
    pattern: "play",
    desc: "Download and send audio from YouTube",
    category: "media",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    if (!args.length) return reply("Please provide a song name or YouTube link.");
    let result = await downloadAudio(args.join(" "));
    if (!result) return reply("Failed to fetch audio. Try another query.");
    
    await conn.sendMessage(m.from, {
        image: { url: result.image },
        caption: `🎵 *Title:* ${result.title}\n\n🔗 *Download:* ${result.downloadUrl}`
    });
    
    await conn.sendMessage(m.from, {
        audio: { url: result.downloadUrl },
        mimetype: "audio/mp4",
        ptt: false
    });
});

cmd({
    pattern: "song",
    desc: "Download and send video from YouTube",
    category: "media",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    if (!args.length) return reply("Please provide a YouTube link.");
    let result = await downloadVideo(args.join(" "));
    if (!result) return reply("Failed to fetch video. Try another query.");
    
    await conn.sendMessage(m.from, {
        image: { url: result.thumbnail },
        caption: `🎥 *Title:* ${result.title}\n\n🔗 *Download:* ${result.url}`
    });
    
    await conn.sendMessage(m.from, {
        video: { url: result.url },
        mimetype: "video/mp4"
    });
});
