const mineflayer = require('mineflayer');
const keep_alive = require('./keep_alive.js')

const config = {
  host: 'mc.mingxee.xyz', // Change this to your Minecraft server IP
  port: 9299,            // Change this to your server port (default: 25565)
  username: 'MineXeeBotLobby', // Set your bot's username
  version: false,         // Set to false to auto-detect the version
  reconnectDelay: 5000    // Reconnect delay in milliseconds (5s)
};

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  });

  bot.on('login', () => {
    console.log(`[BOT] Logged in as ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('[BOT] Spawned in the world.');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`[${username}]: ${message}`);

    if (message.toLowerCase() === 'hello bot') {
      bot.chat('Hello, human!');
    }
  });

  bot.on('end', () => {
    console.log('[BOT] Disconnected. Reconnecting...');
    setTimeout(createBot, config.reconnectDelay);
  });

  bot.on('error', (err) => {
    console.log(`[BOT] Error: ${err.message}`);
  });

  bot.on('kicked', (reason) => {
    console.log(`[BOT] Kicked: ${reason}`);
  });
}

createBot();
