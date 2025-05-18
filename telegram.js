// telegram.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    const res = await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
    });
    console.log("✅ Telegram message sent:", res.data.ok);
  } catch (err) {
    console.error("❌ Failed to send Telegram message:", err.message);
  }
}
