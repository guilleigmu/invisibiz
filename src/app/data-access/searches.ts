import { db } from "@/db";
import { searches, SearchValues } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllSearches() {
  return await db.query.searches.findMany({
    limit: 18,
  });
}

export async function getSearchBySlug(slug: string) {
  return await db.query.searches.findFirst({
    where: eq(searches.slug, slug),
  });
}

export async function createSearch(newSearch: SearchValues) {
  const [{ id: searchId }] = await db
    .insert(searches)
    .values(newSearch)
    .returning({
      id: searches.id,
    });

  return searchId;
}

export async function updateSearch(
  searchId: number,
  newSearch: Partial<SearchValues>
) {
  const [search] = await db
    .update(searches)
    .set(newSearch)
    .where(eq(searches.id, searchId))
    .returning();

  return search;
}
