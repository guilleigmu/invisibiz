import { MapsScraper } from "@/lib/maps-scraper";
import { db } from "@/db";
import { businesses } from "@/db/schema";

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

  data.forEach(async (business) => {
    await db.insert(businesses).values({
      name: business.name || "",
      rating: business.rating || "",
      reviews: business.reviews || "",
      type: business.type || "",
      address: business.address || "",
      website: business.website || "",
    });
  });

  // writeFileSync(`data.json`, JSON.stringify(data, null, 2));

  return Response.json({ success: "true" }, { status: 200 });
};
