"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getVisitorId() {
  if (typeof window === "undefined") return null;

  let visitorId = localStorage.getItem("equatec_visitor_id");

  if (!visitorId) {
    visitorId =
      crypto.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;

    localStorage.setItem("equatec_visitor_id", visitorId);
  }

  return visitorId;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const visitorId = getVisitorId();

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName: "page_view",
        path: pathname,
        title: document.title,
        referrer: document.referrer,
        visitorId,
      }),
    }).catch((error) => {
      console.error("Erro ao registrar analytics:", error);
    });
  }, [pathname]);

  return null;
}