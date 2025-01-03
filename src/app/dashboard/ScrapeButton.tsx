"use client";

import { Button } from "@/components/ui/button";

export default function ScrapeButton() {
  const handleClick = async () => {
    console.log("Hello");
    const res = await fetch("/api/search?query=veterinario+en+M%C3%A1laga");
    const data = await res.json();
    console.log(data);
  };

  return <Button onClick={handleClick}>Hello</Button>;
}
