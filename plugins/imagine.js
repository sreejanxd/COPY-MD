const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "fluxai",
  alias: ["flux", "imagine"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *JAWAD-MD CREATING IMAGINE ...🔥*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl, { responseType: "json" });

    console.log("Full API Response:", data); // Debugging log

    if (!data || !data.result) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageUrl = data.result;

    if (!imageUrl.startsWith("http")) {
      return reply("Error: Received an invalid image URL from the API.");
    }

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `🔮 *AI Generated Image* 🔮\n✨ Prompt: ${q}`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});
