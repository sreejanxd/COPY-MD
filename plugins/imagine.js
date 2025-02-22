const { cmd } = require("../command");
const { fetchJson } = require("../lib/functions");

cmd({
  pattern: "fluxai",
  alias: ["flux", "imagine"],
  react: "🚀",
  desc: "Generate an image using Flux AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  if (!q) return reply("Please provide a prompt for the image.");
  
  await reply("> *KHAN-AI CREATING IMAGE...🔥*");

  try {
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/flux?prompt=${q}`);
    if (!response || !response.result) throw new Error("Failed to fetch image.");
    
    await conn.sendMessage(m.chat, { image: { url: response.result } });
  } catch (error) {
    console.error(error);
    reply("❌ Error generating image: " + error.message);
  }
});

cmd({
  pattern: "stability",
  alias: ["stabilityai", "stable"],
  react: "🎨",
  desc: "Generate an image using Stability AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  if (!q) return reply("Please provide a prompt for the image.");

  await reply("> *KHAN-AI GENERATING IMAGE...🎨*");

  try {
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/stabilityai?prompt=${q}`);
    if (!response || !response.result) throw new Error("Failed to fetch image.");

    await conn.sendMessage(m.chat, { image: { url: response.result } });
  } catch (error) {
    console.error(error);
    reply("❌ Error generating image: " + error.message);
  }
});

cmd({
  pattern: "sdiffusion",
  alias: ["sd", "stable-diffusion"],
  react: "🖌️",
  desc: "Generate an image using Stable Diffusion.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  if (!q) return reply("Please provide a prompt for the image.");

  await reply("> *KHAN-AI GENERATING IMAGE...🖌️*");

  try {
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${q}`);
    if (!response || !response.result) throw new Error("Failed to fetch image.");

    await conn.sendMessage(m.chat, { image: { url: response.result } });
  } catch (error) {
    console.error(error);
    reply("❌ Error generating image: " + error.message);
  }
});
