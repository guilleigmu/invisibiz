"use client";

import { Search } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Poller({ search }: { search: Search }) {
  const router = useRouter();
  const POLL_INTERVAL = 2000;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (search.status === "processing") {
      interval = setInterval(() => {
        router.refresh();
      }, POLL_INTERVAL);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [search, router]);

  return null;
}
