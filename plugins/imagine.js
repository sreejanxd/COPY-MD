const { cmd } = require("../command");
const { fetchJson } = require("../lib/functions");

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

    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`);

    if (!response || !response.result) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageUrl = response.result;

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `🔮 *AI Generated Image* 🔮\n✨ Prompt: ${q}`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.message || "Unknown error"}`);
  }
});
