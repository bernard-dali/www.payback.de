import puppeteer from "puppeteer";
const APIKEY = process.env.APIKEY || "2captcha_api_key"; // set you 2captcha apikey
import { Solver } from "2captcha-ts";
const solver = new Solver(APIKEY);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });

  const [page] = await browser.pages();
  await page.setViewport({ width: 1080, height: 1024 });

  // Open target page
  await page.goto("https://www.payback.de/login");

  // Waiting for the frame
  await page.waitForSelector("#main-iframe");

  // Getting the frame
  const iframeElementHandle = await page.$("#main-iframe");
  const iframe = await iframeElementHandle.contentFrame();

  // Let's wait a bit
  await sleep(2000);

  // Grab the captcha parameters
  const params = await iframe.evaluate(() => {
    const sitekey = document.querySelector(".g-recaptcha").dataset.sitekey;
    const pageurl = window.location.href;
    return {
      pageurl,
      sitekey,
    };
  });

  // Show the found captcha parameters to the console
  console.log(params);

  // Sending a captcha to the 2captcha service
  solver
    .recaptcha({
      pageurl: params.pageurl,
      googlekey: params.sitekey,
    })
    .then(async (res) => {
      // We output the result of the captcha solution to the console
      console.log(res);
      // We apply the received token on the page
      await iframe.evaluate((res) => {
        document.querySelector("#g-recaptcha-response").value = res.data;
        onCaptchaFinished(res.data);
      }, res);

      // Do whatever you want on this page
    });
})();
