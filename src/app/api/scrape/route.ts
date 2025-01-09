import { db } from "@/db";
import { businesses } from "@/db/schema";
import { MapsScraper } from "@/lib/maps-scraper";
import { stringToSlug } from "@/lib/utils";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  createSearch,
  getSearchBySlug,
  updateSearch,
} from "@/app/data-access/searches";

export async function POST(request: Request) {
  try {
    const { query, location, userId } = await request.json();

    const completeQuery = `${query} en ${location}`;
    const slug = stringToSlug(completeQuery);

    const assertSearch = await getSearchBySlug(slug);

    if (assertSearch) {
      return NextResponse.json({ slug });
    }

    const searchId = await createSearch({
      business: query,
      location: location,
      slug,
      userId,
    });

    // Start scraping in the background
    scrapeAndSave(completeQuery, searchId);

    return NextResponse.json({ slug });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

async function scrapeAndSave(query: string, searchId: number) {
  const scraper = MapsScraper();
  await scraper.init();
  const data = await scraper.scrape(query, false);

  data.forEach(async (business) => {
    await db.insert(businesses).values({
      searchId,
      name: business.name || "",
      rating: business.rating || "",
      reviews: business.reviews || "",
      type: business.type || "",
      address: business.address || "",
      phone: business.phone || "",
      description: business.description || "",
      serviceOptions: business.serviceOptions || "",
      placeUrl: business.placeUrl || "",
      website: business.website || null,
      dataId: business.dataId || "",
    });
  });

  await updateSearch(searchId, {
    status: "fulfilled",
    resultsCount: data.length,
  });

  revalidatePath(`/search/${stringToSlug(query)}`);
}
