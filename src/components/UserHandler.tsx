"use client";

import { useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function UserHandler() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      localStorage.setItem("userId", uuid());
    }
  }, []);

  return null;
}
