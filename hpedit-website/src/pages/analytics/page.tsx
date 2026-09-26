import Link from "next/link";
import {
  getAnalyticsDimensions,
  getDailyAnalytics,
  getPortfolioMetrics,
  getRecentPortfolioEvents,
} from "@/lib/portfolio-analytics";

export const dynamic = "force-dynamic";

function compact(value: number) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function duration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;
  return `${minutes}m ${remain}s`;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const requested = typeof params.portfolio === "string" ? params.portfolio : undefined;
  const requestedDays = typeof params.days === "string" ? Number(params.days) : 14;
  const days = [7, 14, 30, 90].includes(requestedDays) ? requestedDays : 14;
  const metrics = await getPortfolioMetrics();
  const selected = requested && metrics.some((row) => row.slug === requested) ? requested : undefined;
  const rows = selected ? metrics.filter((row) => row.slug === selected) : metrics;
  const [events, dimensions, daily] = await Promise.all([
    getRecentPortfolioEvents(selected, 80),
    getAnalyticsDimensions(selected),
    getDailyAnalytics(selected, days),
  ]);

  const totals = rows.reduce(
    (acc, row) => {
      acc.views += Number(row.views);
      acc.sessions += Number(row.sessions);
      acc.clicks += Number(row.clicks);
      acc.engaged += Number(row.engaged);
      return acc;
    },
    { views: 0, sessions: 0, clicks: 0, engaged: 0 },
  );
  const returnRate = totals.views > 0 && totals.sessions > 0 ? Math.max(0, ((totals.views - totals.sessions) / totals.views) * 100) : 0;
  const maxDaily = Math.max(1, ...daily.map((row) => Number(row.views)));
  const portfolioQuery = selected ? `&portfolio=${encodeURIComponent(selected)}` : "";
  const selectedParam = selected ? `portfolio=${encodeURIComponent(selected)}&` : "";

  return (
    <div className="workspace-page">
      <style>{`
        .analytics-filter{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.analytics-filter a{padding:8px 11px;border:1px solid var(--line);border-radius:999px;color:var(--muted);font-size:.82rem}.analytics-filter a.active{background:rgba(124,92,255,.12);color:#d9d2ff;border-color:rgba(124,92,255,.4)}
        .analytics-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;justify-content:flex-end}.analytics-actions a{padding:8px 11px;border:1px solid var(--line);border-radius:999px;color:#d9d2ff;font-size:.78rem;background:rgba(124,92,255,.06)}
        .trend-range{display:flex;gap:6px;flex-wrap:wrap}.trend-range a{padding:6px 9px;border:1px solid var(--line);border-radius:999px;color:var(--muted);font-size:.72rem}.trend-range a.active{background:rgba(124,92,255,.14);color:#d9d2ff;border-color:rgba(124,92,255,.42)}
        .analytics-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:14px;margin-top:14px}.analytics-stack{display:grid;gap:14px}.analytics-card{border:1px solid var(--line);border-radius:18px;padding:18px;background:rgba(255,255,255,.02)}
        .trend{display:flex;align-items:flex-end;gap:8px;height:150px;margin-top:18px;overflow-x:auto;padding-bottom:2px}.trend>div{flex:1;min-width:${days > 30 ? "8px" : "12px"};display:grid;gap:7px;align-items:end;height:100%}.trend i{display:block;min-height:3px;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,#8d77ff,#5f49d8)}.trend span{font-size:.64rem;color:var(--dim);text-align:center;white-space:nowrap}
        .dimension-list{display:grid;gap:11px;margin-top:14px}.dimension-row{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center}.dimension-row small{color:var(--dim)}
        .portfolio-table td,.portfolio-table th{white-space:nowrap}.portfolio-table td:first-child,.portfolio-table th:first-child{white-space:normal}.portfolio-link{color:#c8bfff}.event-label{font-size:.72rem;font-weight:800;letter-spacing:.06em}.event-label.PAGE_VIEW{color:#8ef2d0}.event-label.CLICK{color:#bcaeff}.event-label.ENGAGEMENT{color:#ffd58a}.event-target{max-width:360px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--muted)}
        .analytics-empty{padding:34px;text-align:center;color:var(--muted)}
        @media(max-width:980px){.analytics-grid{grid-template-columns:1fr}.trend{gap:4px}.event-target{max-width:180px}.analytics-actions{justify-content:flex-start}}
      `}</style>

      <header className="page-head">
        <div>
          <span className="eyebrow">PORTFOLIO ANALYTICS</span>
          <h1>{selected ? `@${selected}` : "Creator portfolio intelligence"}</h1>
          <p>First-party visit, engagement and conversion signals across HPEDIT-hosted creator portfolios. Raw IP addresses are not stored.</p>
        </div>
        <div>
          <div className="analytics-filter">
            <Link className={!selected ? "active" : ""} href={`/app/analytics?days=${days}`}>All portfolios</Link>
            {metrics.map((row) => <Link className={selected === row.slug ? "active" : ""} key={row.slug} href={`/app/analytics?portfolio=${encodeURIComponent(row.slug)}&days=${days}`}>@{row.slug}</Link>)}
          </div>
          <div className="analytics-actions">
            <a href={`/api/analytics/export?mode=summary${portfolioQuery}`}>Download summary CSV</a>
            <a href={`/api/analytics/export?mode=events${portfolioQuery}`}>Download recent events CSV</a>
          </div>
        </div>
      </header>

      <section className="metric-grid four">
        <article><span>Page views</span><strong>{compact(totals.views)}</strong><small>All-time portfolio content views</small></article>
        <article><span>Unique sessions</span><strong>{compact(totals.sessions)}</strong><small>All-time anonymous browser sessions</small></article>
        <article><span>Tracked clicks</span><strong>{compact(totals.clicks)}</strong><small>All-time outbound / action clicks</small></article>
        <article><span>Engaged time</span><strong>{duration(totals.engaged)}</strong><small>{returnRate.toFixed(0)}% repeat-view signal · all time</small></article>
      </section>

      <div className="analytics-grid">
        <section className="analytics-stack">
          <article className="analytics-card">
            <div className="panel-head"><div><span className="kicker">{days}-DAY TREND</span><h2>Views by day</h2></div><div className="trend-range">{[7, 14, 30, 90].map((range) => <Link key={range} className={days === range ? "active" : ""} href={`/app/analytics?${selectedParam}days=${range}`}>{range}d</Link>)}</div></div>
            {daily.length ? <div className="trend">{daily.map((row) => {
              const views = Number(row.views);
              return <div key={row.day.toISOString()} title={`${views} views · ${Number(row.sessions)} sessions · ${Number(row.clicks)} clicks`}><i style={{ height: `${Math.max(3, (views / maxDaily) * 100)}%` }} /><span>{row.day.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span></div>;
            })}</div> : <div className="analytics-empty">No tracked visits in this period.</div>}
          </article>

          <article className="analytics-card">
            <div className="panel-head"><div><span className="kicker">PORTFOLIOS</span><h2>Performance summary</h2></div><span>All time</span></div>
            <div className="table-wrap portfolio-table"><table><thead><tr><th>Portfolio</th><th>Mode</th><th>Views</th><th>Sessions</th><th>Clicks</th><th>Engaged</th><th>Last view</th></tr></thead><tbody>
              {rows.map((row) => <tr key={row.slug}><td><Link className="portfolio-link" href={`/app/analytics?portfolio=${encodeURIComponent(row.slug)}&days=${days}`}>{row.title || `@${row.slug}`}</Link></td><td>{row.access}</td><td>{Number(row.views)}</td><td>{Number(row.sessions)}</td><td>{Number(row.clicks)}</td><td>{duration(Number(row.engaged))}</td><td>{row.last_view ? row.last_view.toLocaleString("en-IN") : "—"}</td></tr>)}
            </tbody></table></div>
          </article>

          <article className="analytics-card">
            <div className="panel-head"><div><span className="kicker">RECENT ACTIVITY</span><h2>Event timeline</h2></div><span>Latest {events.length}</span></div>
            {events.length ? <div className="table-wrap"><table><thead><tr><th>Time</th><th>Portfolio</th><th>Event</th><th>Source / target</th><th>Device</th><th>Location</th></tr></thead><tbody>{events.map((event) => <tr key={event.id}><td>{event.created_at.toLocaleString("en-IN")}</td><td>@{event.slug}</td><td><span className={`event-label ${event.event_type}`}>{event.event_type.replace("_", " ")}</span></td><td className="event-target" title={event.target || event.invite_ref || event.referrer || ""}>{event.target || event.invite_ref || event.referrer || (event.engaged_seconds ? `${event.engaged_seconds}s engaged` : "Direct")}</td><td>{event.device || "—"} · {event.browser || "—"}</td><td>{[event.region, event.country].filter(Boolean).join(", ") || "—"}</td></tr>)}</tbody></table></div> : <div className="analytics-empty">No events recorded yet.</div>}
          </article>
        </section>

        <aside className="analytics-stack">
          {[
            ["DEVICE", "Devices", dimensions.devices],
            ["BROWSER", "Browsers", dimensions.browsers],
            ["LOCATION", "Countries", dimensions.countries],
            ["INVITATION", "Invite / ref tags", dimensions.invites],
          ].map(([kicker, title, data]) => {
            const list = data as { label: string; count: bigint }[];
            const max = Math.max(1, ...list.map((item) => Number(item.count)));
            return <article className="analytics-card" key={String(title)}><span className="kicker">{String(kicker)}</span><h2>{String(title)}</h2><div className="dimension-list">{list.length ? list.map((item) => <div className="dimension-row" key={item.label}><div><strong>{item.label}</strong><div className="progress"><i style={{ width: `${(Number(item.count) / max) * 100}%` }} /></div></div><small>{Number(item.count)}</small></div>) : <small>No data yet.</small>}</div></article>;
          })}
        </aside>
      </div>
    </div>
  );
}
