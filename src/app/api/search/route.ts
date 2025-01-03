import { writeFileSync } from "fs";
import { MapsScraper } from "@/lib/maps-scraper";

export const GET = async (req: Request) => {
  const reqUrl = new URL(req.url);
  const searchParams = reqUrl.searchParams;

  const query = searchParams.get("query");
  if (!query)
    return Response.json(
      { error: "No search query provided" },
      { status: 400 }
    );

  const scraper = MapsScraper();
  await scraper.init();
  const data = await scraper.scrape(query);

  writeFileSync(`data.json`, JSON.stringify(data, null, 2));

  return Response.json({ success: "true" }, { status: 200 });
};
