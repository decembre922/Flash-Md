const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUZqUGdLYm5TMVNrWVlFelIyTUJZQ0FCUGdybGhSNnFTaC8vWmIvQ1cwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDlsR0NJcWU4RTBvb0hmNWh6RVQ0MVNvRVBMdnBpekNmMExZMWFnT2cwRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSGFVckRBa3JmSHZYMGJhVXV1SnB0SWJiVmlHZjhIMWlWa2VOV2dOaGxJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjd2hTY1NaeTU3bmRHOEdDN240M2FCYUVPSUZqUmlWaTVtTXJmYU5WSVJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMaHA5QktVWktxTzJTR0hyandqSGhMY3NaSk1mcENuTmFBR1VZWm0yV3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc3bm5udVRHa2lCdEd0bll3ZGVSazczRFFYcGxYQ0RESWpRSlJmQ0tHV2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVFQUpsQVJLRkZxUnQvbUhrZEhQcmhvNUc5bzc3U1o3RFB1WS9xMnkzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVdxZU5wazlQZ0VQTVc0UlNWazBVYXA5d2s4QUk5eUQ4M1JMeEhid2R3bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndwMm9FdWY1ZkRnZjZjbUI3UWpQK29aM3c5Q3E5b25LSkpSUEQ0Z3QvOEJMM3NUdW1GNFpPZldEdVpwUVJoQkNkTTQ5eGlURURoZDFtWlBTUXVhWmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE4LCJhZHZTZWNyZXRLZXkiOiJyL08zZUpPZEtKOFI0STFnZmpUVitsMDNHUG9QeG5sc2prRFh4R3J3eFVzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTM1NjcwNTA5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjREODBDNDRGN0E2NzFFRjI0RjIxNTU4QjZGRTlBMjg0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzgwNzc3Mjl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTM1NjcwNTA5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkMwRTg0N0FCREJENTI1MzFEMDkxMUY0MjIxOTUzMTBDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzgwNzc3MzZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InNuVVdKT1NFUkhxN3NjOWJfQnZHV1EiLCJwaG9uZUlkIjoiNGUyOGE2OTgtNjVkNC00Yjk4LWIyZTQtOTE3NGM0NzYyYzhiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ink1R2w0eGRMaFVCdGxzc2Jwa0ZxZVhPbVl3UT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDdkxaNDJpTU96TDNPWnlZK2tNYm9xdlgvWTA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMVIzRlNEQ0IiLCJtZSI6eyJpZCI6IjUwOTM1NjcwNTA5OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4o+kzZ/Nn82ezZ7wnYSe4oiYzKXig5/wnZCT8J2Qg/CdkIAg4oOf8J2QlvCdkI7wnZCL8J2QhSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUMxL1BFQkVJL3M0N3dHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSnJYZ2ptQnNIaVJUQ0dNaUd2ZGRkR0hsSnh0Zm9IY00yNE1WR2orQW9IST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRGNCMk1reWx1OVYvZ0UrZzY4dDF4WGZhL1kveXBsYzF4SW51ZEVaNDlEcnFQR0U0dnBYalhuNnhQbXgyNTdoOFRmWjRmb2FCdHk1aW5TTUZVMnRyQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Ii9nY3d6akRzbWVNOWVoeFNWSTBWam1RV1NBcUEzT1NjdW9CTFVsL0VMZE1sWFRTMzZGN3NEQVNna2c1elRFajNZZGZoZWRqVE1TUkl1VXpQMFV4amlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzU2NzA1MDk6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTYTE0STVnYkI0a1V3aGpJaHIzWFhSaDVTY2JYNkIzRE51REZSby9nS0J5In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4MDc3NzI1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpuSCJ9',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "wolf",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "35670509",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
