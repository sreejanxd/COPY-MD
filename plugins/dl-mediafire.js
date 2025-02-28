const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "mediafire2",
  alias: ["mfire2"],
  desc: "To download MediaFire files.",
  react: "📂",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid MediaFire link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://api.ryzendesu.vip/api/downloader/mediafire?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.download) {
      return reply("⚠️ Failed to fetch the MediaFire file. Ensure the link is valid and public.");
    }

    const dl_link = data.download;
    const file_name = data.filename || "mediafire_download";
    const file_size = data.size || "Unknown Size";
    const file_type = data.filetype || "application/octet-stream";

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    const caption = `╭━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━⊷\n`
      + `┃📁 *File Name:* ${file_name}\n`
      + `┃📏 *Size:* ${file_size}\n`
      + `┃📄 *Type:* ${file_type}\n`
      + `╰━━━⪼\n\n`
      + `🔹 *Powered By KHAN MD*`;

    await conn.sendMessage(from, {
      document: { url: dl_link },
      mimetype: file_type,
      fileName: file_name,
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});

// MediaFire-dl

cmd({
  pattern: "mediafire",
  alias: ["mfire"],
  desc: "To download MediaFire files.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid MediaFire link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result || !data.result.dl_link) {
      return reply("⚠️ Failed to fetch MediaFire download link. Ensure the link is valid and public.");
    }

    const { dl_link, fileName, fileType } = data.result;
    const file_name = fileName || "mediafire_download";
    const mime_type = fileType || "application/octet-stream";

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    const caption = `╭━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *File Name:* ${file_name}\n`
      + `┃▸ *File Type:* ${mime_type}\n`
      + `╰━━━⪼\n\n`
      + `📥 *Downloading your file...*`;

    await conn.sendMessage(from, {
      document: { url: dl_link },
      mimetype: mime_type,
      fileName: file_name,
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});
        
