import axios from 'axios'; 
import cheerio from 'cheerio'
import puppeteer from 'puppeteer';
import fs from 'fs'
import jsonToCSV from './utils.js';

(async() => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://www.coupang.com/np/categories/503139');

  const content = await page.content()
  const $ = cheerio.load(content)
  const lists = $(".baby-product")
  let jsonData = []
  
  lists.each((index, list) => {
    const description = $(list).find("> a > dl > dd > div.name").text().replace(/[\n\t]/g, '').trim()
    const img = `https:${$(list).find("> a > dl > dt > img").attr('src')}`
    const price = $(list).find("> a > dl > dd > div.price-area > div > div.price > em > strong").text().replace(/[,]/g, '')
    
    jsonData.push({index, description, price, img})
  })

  browser.close();

  const result = jsonToCSV(jsonData)
  fs.writeFileSync('./coupangProduct.csv', result)
  
})();
