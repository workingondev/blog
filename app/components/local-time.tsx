"use client";

import { useEffect, useState } from "react";

const indiaTime = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

function formatIndiaTime(date: Date) {
  return indiaTime.format(date).toLowerCase();
}

export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      setTime(formatIndiaTime(new Date()));
    }

    updateTime();
    const interval = window.setInterval(updateTime, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <p
      aria-label={time ? `India, current time ${time} IST` : "India, IST"}
      className="mt-5 flex items-center gap-2 text-xs leading-none tracking-[0.01em] text-neutral-500 dark:text-neutral-500"
    >
      <span>India</span>
      <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
        ·
      </span>
      <time className="min-w-[5.5rem] tabular-nums" suppressHydrationWarning>
        {time ? `${time} IST` : "local time IST"}
      </time>
    </p>
  );
}
