import dotenv from "dotenv";
import { sendTelegramMessage } from "./telegram.js";
import scraper from './scraper2.js'

dotenv.config();


(async () => {
  const result2 = await scraper();
  await sendTelegramMessage(result2);
})();
