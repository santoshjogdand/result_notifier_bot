import axios from 'axios';
import https from 'https'
import * as cheerio from 'cheerio'
import dotenv from 'dotenv'
dotenv.config();
const agent = new https.Agent({
  rejectUnauthorized: false
});

const scraper = async () => {
  const { data: html } = await axios.get("https://onlineresults.unipune.ac.in/Result/Dashboard/Default", {
    httpsAgent: agent
  });
  let res = null
  const $ = cheerio.load(html);
  // console.log("Page Title:", $("title").text());
  for (let i = 1; i < 30; i++) {
    res = $('table tr').eq(i).find('td').eq(1).text().trim()
    // if(res.contains(''))
    console.log(res)
    if (res.includes("BCA") || res.includes("B.C.A") || res.includes("bachelor of computer application") || res.includes("Bachelor of Computer Application") || res.includes("Bachelor of Computer Applications") || res.includes("BACHELOR OF COMPUTER APPLICATION") || res.includes("BACHELOR OF COMPUTER APPLICATIONS")) {
      return "Result found for \n<b>" + res + "</b>"
    } else {
      res =  "Not found for BCA"
    }
  }
  return res
}

export default scraper;

