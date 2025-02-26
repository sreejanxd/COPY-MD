const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "fb2",
  react: "🎬",
  desc: "Download video from Facebook by URL.",
  category: "media",
  use: ".fb2 <facebook video URL>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply, react }) => {
  try {
    const url = args[0];
    if (!url) return reply("*Please provide a Facebook video URL.*");

    await react("⏳"); // Show processing reaction
    reply("*🎬 Downloading video from Facebook...*");

    // Fetch video details from the new API
    const apiUrl = `https://delirius-apiofc.vercel.app/download/facebook?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);

    if (!response.data.urls || response.data.urls.length === 0) {
      await react("❌");
      return reply("❌ Failed to fetch video from Facebook.");
    }

    // Select HD if available, otherwise use SD
    const hdVideo = response.data.urls.find(v => v.hd)?.hd;
    const sdVideo = response.data.urls.find(v => v.sd)?.sd;
    const videoUrl = hdVideo || sdVideo;

    if (!videoUrl) {
      await react("❌");
      return reply("❌ No downloadable video found.");
    }

    await react("📥"); // Show downloading reaction

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      mimetype: "video/mp4",
      caption: "Powered By JawadTechX"
    }, { quoted: mek });

    await react("✅"); // Success reaction

  } catch (error) {
    console.error(error);
    await react("❌");
    reply("❌ An error occurred while processing your request.");
  }
});
