"use server";

import { redirect } from "next/navigation";

export async function handleSearch(formData: FormData) {
  const query = formData.get("query") as string;
  const location = formData.get("location") as string;
  const userId = formData.get("userId") as string;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/scrape`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        location,
        userId,
      }),
    }
  );

  const { slug } = await response.json();
  redirect(`/search/${slug}`);
}
