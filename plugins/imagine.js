const { cmd, commands } = require("../command");
const { fetchJson } = require("../lib/functions");

const generateImage = async (conn, m, q, apiUrl, reply) => {
  try {
    if (!q) {
      return reply("Please provide a prompt for the image.");
    }

    await reply("> *JAWAD-MD CREATING IMAGINE ...🔥*");
    
    const response = await fetchJson(`${apiUrl}?prompt=${encodeURIComponent(q)}`);
    console.log("Full API Response:", JSON.stringify(response, null, 2));

    if (!response || typeof response !== "object" || !response.result) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    await conn.sendMessage(m.chat, {
      image: { url: response.result },
    });
  } catch (error) {
    console.error("API Error:", error);
    reply("An error occurred while fetching the image.");
  }
};

cmd({
  pattern: "fluxai",
  alias: ["flux", "imagine"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  await generateImage(conn, m, q, "https://api.siputzx.my.id/api/ai/flux", reply);
});

cmd({
  pattern: "stablediffusion",
  alias: ["sdiffusion", "imagine2"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  await generateImage(conn, m, q, "https://api.siputzx.my.id/api/ai/stable-diffusion", reply);
});

cmd({
  pattern: "stabilityai",
  alias: ["stability", "imagine3"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  await generateImage(conn, m, q, "https://api.siputzx.my.id/api/ai/stabilityai", reply);
});
