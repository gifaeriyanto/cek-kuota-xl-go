const puppeteer = require("puppeteer");
const ora = require("ora");
require("dotenv").config();

const spinner = ora("Open XLHome").start();

(async () => {
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page
    .goto("http://192.168.8.1/html/home.html", {
      waitUntil: "networkidle2",
    })
    .then((res) => {
      if (!res.ok()) {
        browser.close();
      }
    });

  spinner.text = "Go to USSD";
  await page.click("#ussd");

  spinner.text = "Login...";
  await page.type("#username", process.env.USERNAME);
  await page.type("#password", process.env.PASSWORD);
  await page.click("#pop_login");

  spinner.text = "Input USSD code (*123*7*1*1*1#)";
  await page.waitForSelector("#general_command_select_input");
  await page.type("#general_command_select_input", "*123*7*1*1*1#");

  spinner.text = "Submitting...";
  await page.click("#general_btn");

  spinner.text = "Wait for response...";
  await page.waitForSelector(".general_content.clr_cyan", {
    visible: true,
  });
  const element = await page.$(".general_content.clr_cyan");
  const result = await element.evaluate((e) => e.textContent);

  spinner.color = "green";
  spinner.succeed(result.split(" + ")[0]);

  browser.close();
})();
