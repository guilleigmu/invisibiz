import { db } from "@/db";
import { businesses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBusinessesBySearchId(searchId: number) {
  return await db.query.businesses.findMany({
    where: eq(businesses.searchId, searchId),
  });
}
