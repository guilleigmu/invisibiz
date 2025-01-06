"use server";

import { db } from "@/db";
import { businesses } from "@/db/schema";
import { MapsScraper } from "@/lib/maps-scraper";
import { stringToSlug } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createSearch,
  getSearchBySlug,
  updateSearch,
} from "../data-access/searches";

export async function handleSearch(formData: FormData) {
  const query = formData.get("query") as string;
  const location = formData.get("location") as string;
  const userId = formData.get("userId") as string;

  const completeQuery = `${query} en ${location}`;
  const slug = stringToSlug(completeQuery);

  const assertSearch = await getSearchBySlug(slug);

  if (!assertSearch) {
    const searchId = await createSearch({
      business: query,
      location: location,
      slug,
      userId,
    });

    scrapeAndSave(completeQuery, searchId);
  }

  redirect(`/search/${slug}`);
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
