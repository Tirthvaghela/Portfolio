"use client";
import { useEffect, useState } from "react";

type ContribDay = { date: string; count: number; level: number };

const LEVEL_COLORS = [
  "var(--border)",
  "rgba(37,99,235,0.3)",
  "rgba(37,99,235,0.55)",
  "rgba(37,99,235,0.8)",
  "rgba(37,99,235,1)",
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function buildWeeks(days: ContribDay[]) {
  const weeks: (ContribDay | null)[][] = [];
  let week: (ContribDay | null)[] = [];
  const firstDow = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstDow; i++) week.push(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function monthLabels(weeks: (ContribDay | null)[][]) {
  const labels: string[] = [];
  let lastMonth = -1;
  for (const week of weeks) {
    const firstDay = week.find((d) => d);
    let label = "";
    if (firstDay) {
      const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        label = MONTH_NAMES[month];
        lastMonth = month;
      }
    }
    labels.push(label);
  }
  return labels;
}

export default function GithubActivity({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<(ContribDay | null)[][] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data: { total: Record<string, number>; contributions: ContribDay[] }) => {
        if (cancelled) return;
        setWeeks(buildWeeks(data.contributions));
        const totals = Object.values(data.total || {});
        setTotal(totals.length ? totals[totals.length - 1] : null);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (failed) {
    return (
      <img
        src={`https://ghchart.rshah.org/2563eb/${username}`}
        alt="GitHub contribution chart"
        style={{ width: "100%", borderRadius: 3 }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }

  if (!weeks) {
    return <div style={{ height: 110, borderRadius: 3, background: "var(--border-light)" }} />;
  }

  const labels = monthLabels(weeks);

  return (
    <div>
      {total !== null && (
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
          {total.toLocaleString()} contributions in the last year
        </p>
      )}
      <div style={{ display: "flex", overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 6, paddingTop: 16, flexShrink: 0 }}>
          {DAY_LABELS.map((label, i) => (
            <div key={i} style={{ height: 10, fontSize: 9, lineHeight: "10px", color: "var(--text-muted)" }}>
              {label}
            </div>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
            {labels.map((label, i) => (
              <div key={i} style={{ width: 10, fontSize: 9, color: "var(--text-muted)", flexShrink: 0 }}>
                {label}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : undefined}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: day ? LEVEL_COLORS[day.level] : "transparent",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
