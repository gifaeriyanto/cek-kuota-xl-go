const puppeteer = require("puppeteer");
const ora = require("ora");
require("dotenv").config();

const spinner = ora("Open XLHome").start();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
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

  spinner.text = "Go to SMS";
  await page.click("#sms");

  spinner.text = "Login...";
  await page.type("#username", process.env.USERNAME);
  await page.type("#password", process.env.PASSWORD);
  await page.click("#pop_login");

  await page.waitForSelector("#message", {
    visible: true,
  });
  spinner.text = "New Message...";
  await page.click("#message");

  spinner.text = "Wait for response...";
  await page.waitForSelector("#recipients_number", {
    visible: true,
  });
  await page.type("#recipients_number", "4444");
  await page.type(
    "#message_content",
    `DAFTAR#${process.env.NIK}#${process.env.KK}`
  );
  await page.click("#pop_send");

  await page.waitForSelector("#sms_success_info", {
    visible: true,
  });
  const element = await page.$("#sms_success_info");
  const result = await element.evaluate((e) => e.textContent);

  spinner.color = "green";
  spinner.succeed(
    result.replace(/./g, ". ").replace(/,/g, ", ").replace(/:/g, ": ")
  );
})();
