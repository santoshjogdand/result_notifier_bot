// scraper.js
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import { sendTelegramMessage } from "./telegram.js";

dotenv.config();

export async function scrapSite() {
  let scrap = null;
  const { data: html } = await axios.get("https://cetcell.mahacet.org/notices/");
  const $ = cheerio.load(html);
  let counter = 0;

  $('table tr').each((i, row) => {
    const thirdCol = $(row).find('td').eq(2).text().trim();
    counter++;
    if (counter >= 5) return false;

    if (thirdCol.includes('MAH-MBA') || thirdCol.includes('MBA')) {
      if (thirdCol.includes('Score Cards are Live')) {
        scrap = `MBA Result Alert 🎓:\n${thirdCol}\n::99% chances MBA result found::`;
      } else {
        scrap = `NOTICE related to MBA:\n${thirdCol}`;
      }
      return false;
    }
  });

  return scrap || "No MBA updates found.";
}

(async () => {
  const result = await scrapSite();
  await sendTelegramMessage(result);
})();
