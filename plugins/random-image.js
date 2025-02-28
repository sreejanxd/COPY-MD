const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: 'duck',
  desc: 'Sends a random duck image.',
  category: 'fun',
  react: '🦆',
  filename: __filename
}, async (message) => {
  try {
    const response = await axios.get('https://delirius-apiofc.vercel.app/random/duck');
    const imageUrl = response.data.url || response.data.image || response.data; // Adjust if needed
    await message.sendMessage(imageUrl, { caption: '🦆 Quack Quack!' });
  } catch (error) {
    console.error(error);
    message.reply('Failed to fetch a duck image.');
  }
});
