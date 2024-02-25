"use client"

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    location.href = "/files";
  }, []);

  return (
    <div>loading...</div>
  );
}