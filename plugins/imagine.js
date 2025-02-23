const { cmd, commands } = require("../command");
const { fetchJson } = require("../lib/functions");

cmd({
  pattern: "fluxai",
  alias: ["flux", "imagine"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a prompt for the image.");
    }

    await reply("> *KHAN-MD CREATING IMAGINE ...🔥*");
    
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/flux?prompt=${q}`);
    const imageUrl = response.result;

    await conn.sendMessage(m.chat, {
      image: {
        url: imageUrl
      }
    });

  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});

cmd({
  pattern: "stablediffusion",
  alias: ["sdiffusion", "imagine2"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a prompt for the image.");
    }

    await reply("> *KHAN-MD CREATING IMAGINE ...🔥*");
    
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${q}`);
    const imageUrl = response.result;

    await conn.sendMessage(m.chat, {
      image: {
        url: imageUrl
      }
    });

  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});

cmd({
  pattern: "stabilityai",
  alias: ["stability", "imagine3"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a prompt for the image.");
    }

    await reply("> *KHAN-MD CREATING IMAGINE ...🔥*");
    
    const response = await fetchJson(`https://api.siputzx.my.id/api/ai/stabilityai?prompt=${q}`);
    const imageUrl = response.result;

    await conn.sendMessage(m.chat, {
      image: {
        url: imageUrl
      }
    });

  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});
