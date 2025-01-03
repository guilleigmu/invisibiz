import { Browser, Page } from "puppeteer";
import { sleep } from "./utils";

export function MapsScraper() {
  let browser: Browser;
  let page: Page;

  const SCROLL_SELECTOR = ".m6QErb[aria-label]";
  const ACCEPT_COOKIES_SELECTOR =
    "button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.XWZjwc";

  async function init() {
    const puppeteer = await import("puppeteer");
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: { width: 1920, height: 1080 },
    });
  }

  async function acceptCookies() {
    await page.waitForSelector(ACCEPT_COOKIES_SELECTOR);
    await page.click(ACCEPT_COOKIES_SELECTOR);
    await page.waitForNavigation();
  }

  async function scrapeBusinesses() {
    const dataFromPage = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".bfdHYd")).map((el) => {
        const placeUrl =
          el.parentElement?.querySelector(".hfpxzc")?.getAttribute("href") ||
          "";

        const urlPattern =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          /!1s(?<id>[^!]+).+!3d(?<latitude>[^!]+)!4d(?<longitude>[^!]+)/gm;

        const dataId = [...placeUrl.matchAll(urlPattern)].map(
          ({ groups }) => groups?.id
        )[0];
        const latitude = [...placeUrl.matchAll(urlPattern)].map(
          ({ groups }) => groups?.latitude
        )[0];
        const longitude = [...placeUrl.matchAll(urlPattern)].map(
          ({ groups }) => groups?.longitude
        )[0];

        return {
          title: el.querySelector(".qBF1Pd")?.textContent?.trim(),
          rating: el.querySelector(".MW4etd")?.textContent?.trim(),
          reviews: el
            .querySelector(".UY7F9")
            ?.textContent?.replace("(", "")
            .replace(")", "")
            .trim(),
          type: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child"
            )
            ?.textContent?.replaceAll("·", "")
            .trim(),
          address: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child"
            )
            ?.textContent?.replaceAll("·", "")
            .trim(),
          openState: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:first-child"
            )
            ?.textContent?.replaceAll("·", "")
            .trim(),
          phone: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:last-child"
            )
            ?.textContent?.replaceAll("·", "")
            .trim(),
          website: el.querySelector("a[data-value]")?.getAttribute("href"),
          description: el
            .querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(2)")
            ?.textContent?.replace("·", "")
            .trim(),
          serviceOptions: el
            .querySelector(".qty3Ue")
            ?.textContent?.replaceAll("·", "")
            .replaceAll("  ", " ")
            .trim(),
          gpsCoordinates: {
            latitude,
            longitude,
          },
          placeUrl,
          dataId,
        };
      });
    });
    return dataFromPage;
  }

  async function scrollPage() {
    await page.waitForSelector(SCROLL_SELECTOR);
    let lastHeight = await page.evaluate(
      `document.querySelector("${SCROLL_SELECTOR}").scrollHeight`
    );

    while (true) {
      await page.evaluate(
        `document.querySelector("${SCROLL_SELECTOR}").scrollTo(0, document.querySelector("${SCROLL_SELECTOR}").scrollHeight)`
      );

      await sleep(2000);
      const newHeight = await page.evaluate(
        `document.querySelector("${SCROLL_SELECTOR}").scrollHeight`
      );
      if (newHeight === lastHeight) {
        break;
      }
      lastHeight = newHeight;
    }
  }

  async function scrape(query: string, lang?: string) {
    const url = `https://www.google.com/maps/search/${query}${
      lang ? `/?=hl=${lang}` : ""
    }`.trim();

    console.log("Scraping in", url);

    page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.goto(url);

    await acceptCookies();
    await scrollPage();
    const data = await scrapeBusinesses();

    await browser.close();
    return data;
  }

  return {
    init,
    scrape,
  };
}
