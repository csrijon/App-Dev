import { listProductionQueue } from "@/lib/production-queue";
import { listPortfolioLinkCandidates } from "@/lib/portfolio-production-link";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";

export const dynamic = "force-dynamic";

function label(value: string) {
  return value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

const lanes = [
  { key: "APPROVED", title: "Approved", note: "Ready to enter production", next: "BUILDING", action: "Start build" },
  { key: "BUILDING", title: "Building", note: "Portfolio work in progress", next: "CREATOR_REVIEW", action: "Send to creator review" },
  { key: "CREATOR_REVIEW", title: "Creator Review", note: "Waiting on creator feedback / approval", next: "PUBLISHED", action: "Mark published" },
  { key: "PUBLISHED", title: "Published", note: "Live or publication-complete", next: null, action: null },
] as const;

export default async function ProductionQueuePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const [items, portfolioCandidates] = await Promise.all([listProductionQueue(), listPortfolioLinkCandidates()]);
  const availablePortfolios = portfolioCandidates.filter((portfolio) => !portfolio.linkedApplicationId);
  const grouped = Object.fromEntries(lanes.map((lane) => [lane.key, items.filter((item) => item.status === lane.key)]));

  return (
    <div className="workspace-page production-page">
      <style>{`
        .production-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}.production-stat{padding:14px 15px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.02)}.production-stat b{font-size:1.8rem;display:block;letter-spacing:-.04em}.production-stat span{color:var(--muted);font-size:.8rem}.production-board{display:grid;grid-template-columns:repeat(4,minmax(250px,1fr));gap:12px;align-items:start;overflow-x:auto;padding-bottom:10px}.production-lane{border:1px solid var(--line);border-radius:17px;background:rgba(255,255,255,.015);min-height:220px}.lane-head{padding:14px 14px 11px;border-bottom:1px solid var(--line)}.lane-head-top{display:flex;justify-content:space-between;gap:10px;align-items:center}.lane-head h2{font-size:1rem;margin:0}.lane-count{min-width:27px;height:27px;border-radius:999px;background:var(--surface-2);display:grid;place-items:center;font-size:.75rem;font-weight:850}.lane-head p{margin:5px 0 0;color:var(--dim);font-size:.75rem}.lane-stack{display:grid;gap:9px;padding:10px}.production-card{border:1px solid var(--line);border-radius:13px;background:var(--surface);padding:12px}.production-card h3{font-size:.95rem;margin:0 0 3px}.production-card .meta{font-size:.75rem;color:var(--dim);line-height:1.5}.progress{height:6px;border-radius:999px;background:var(--surface-2);overflow:hidden;margin:11px 0}.progress span{display:block;height:100%;background:linear-gradient(90deg,#8e82ff,#b39bff)}.card-actions{display:flex;gap:6px;flex-wrap:wrap}.advance-form{margin-top:8px}.advance-form button{width:100%;justify-content:center}.portfolio-link{margin:11px 0 0;padding:10px;border:1px solid var(--line);border-radius:11px;background:rgba(255,255,255,.018)}.portfolio-link strong{display:block;font-size:.8rem}.portfolio-link small{display:block;color:var(--dim);margin:3px 0 8px}.portfolio-actions{display:flex;gap:6px;flex-wrap:wrap}.link-form{display:grid;grid-template-columns:1fr auto;gap:6px;margin-top:9px}.link-form select{min-width:0;background:var(--surface-2);border:1px solid var(--line);border-radius:9px;color:var(--text);padding:8px 9px;font:inherit;font-size:.78rem}.link-form button{padding-inline:10px}.unlink{display:inline}.empty{padding:20px 10px;color:var(--dim);font-size:.8rem;text-align:center}.notice{margin:0 0 14px;padding:12px 14px;border:1px solid var(--line);border-radius:13px;color:var(--muted);background:rgba(255,255,255,.025)}.notice.success{border-color:rgba(39,215,167,.25);background:rgba(39,215,167,.07);color:#8ef2d0}.notice.warning{border-color:rgba(231,181,77,.28);background:rgba(231,181,77,.08);color:#f0cc78}.notice.error{border-color:rgba(255,107,122,.26);background:rgba(255,107,122,.08);color:#ff9eaa}@media(max-width:1050px){.production-summary{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.production-summary{grid-template-columns:1fr}.production-board{grid-template-columns:repeat(4,275px)}}
      `}</style>

      <header className="page-head"><div><span className="eyebrow">PRODUCTION</span><h1>Portfolio production queue</h1><p>Track approved creator applications from production intake through creator review and publication.</p></div><div><a className="button secondary" href="/app/applications">Applications</a></div></header>

      {params.updated ? <div className="notice success">Production stage updated.</div> : null}
      {params.portfolioLinked ? <div className="notice success">Hosted portfolio linked to the creator application.</div> : null}
      {params.portfolioUnlinked ? <div className="notice success">Portfolio link removed.</div> : null}
      {params.portfolioLinkError === "portfolio_relationship_locked_stage" ? <div className="notice warning">Portfolio relationship changes are locked during Creator Review and Published. Move the application back to Building before unlinking or switching its hosted portfolio.</div> : params.portfolioLinkError ? <div className="notice error">The portfolio relationship could not be changed. Confirm the portfolio is still available and try again.</div> : null}
      {params.transition === "stale" ? <div className="notice warning">That creator changed stage in another tab or session. The board has been refreshed without applying the stale transition.</div> : null}
      {params.transition === "portfolio-required" ? <div className="notice warning">Link the creator to the hosted portfolio before moving into Creator Review or Published.</div> : null}
      {params.transition === "qa-failed" ? <div className="notice error">Stage change blocked because the linked portfolio has a failing QA check. Open QA, fix the failures, then retry.</div> : null}
      {params.transition === "approval-required" ? <div className="notice warning">Publication requires creator approval for the current portfolio revision. Open the Review Pack, record approval, then retry.</div> : null}

      <section className="production-summary">
        {lanes.map((lane) => <article className="production-stat" key={lane.key}><b>{grouped[lane.key]?.length || 0}</b><span>{lane.title}</span></article>)}
      </section>

      <section className="production-board">
        {lanes.map((lane) => {
          const laneItems = grouped[lane.key] || [];
          return <section className="production-lane" key={lane.key}>
            <header className="lane-head"><div className="lane-head-top"><h2>{lane.title}</h2><span className="lane-count">{laneItems.length}</span></div><p>{lane.note}</p></header>
            <div className="lane-stack">
              {laneItems.length ? laneItems.map((item) => <article className="production-card" key={item.id}>
                <h3>{item.creatorName || item.fullName}</h3>
                <div className="meta">{item.primaryCategory || "Uncategorised"}{item.city ? ` · ${item.city}` : ""}<br/>{label(item.status)} · Updated {item.updatedAt.toLocaleDateString("en-IN")}</div>
                <div className="progress" title={`${item.completion}% application readiness`}><span style={{width:`${Math.max(0, Math.min(100, item.completion))}%`}} /></div>
                <div className="card-actions"><a className="button secondary compact" href={`/app/applications/${item.id}`}>Review</a><a className="button secondary compact" href={`/app/applications/${item.id}/brief`}>Brief</a>{item.portfolioSlug ? <a className="button secondary compact" href={`/app/applications/${item.id}/review-pack`}>Review pack</a> : null}</div>

                <div className="portfolio-link">
                  {item.portfolioSlug ? <>
                    <strong>{item.portfolioTitle || `@${item.portfolioSlug}`}</strong><small>@{item.portfolioSlug} · {item.portfolioAccess}</small>
                    <div className="portfolio-actions"><a className="button secondary compact" href={`/${item.portfolioSlug}`} target="_blank">Open</a><a className="button secondary compact" href={`/app/portfolios/${encodeURIComponent(item.portfolioSlug)}/qa`}>QA</a><a className="button secondary compact" href={`/app/analytics?portfolio=${encodeURIComponent(item.portfolioSlug)}`}>Analytics</a><form className="unlink" action="/api/creator-applications/portfolio-link" method="post"><input type="hidden" name="applicationId" value={item.id}/><input type="hidden" name="intent" value="clear"/><input type="hidden" name="returnTo" value="/app/production"/><ConfirmSubmitButton className="button secondary compact" message={`Unlink @${item.portfolioSlug} from ${item.creatorName || item.fullName}? The hosted portfolio will remain intact, but this production record will lose its portfolio relationship.`}>Unlink</ConfirmSubmitButton></form></div>
                  </> : <>
                    <strong>No hosted portfolio linked</strong><small>{availablePortfolios.length ? `${availablePortfolios.length} unassigned portfolio${availablePortfolios.length === 1 ? "" : "s"} available.` : "No unassigned hosted portfolios are currently available."}</small>
                    {availablePortfolios.length ? <form className="link-form" action="/api/creator-applications/portfolio-link" method="post"><input type="hidden" name="applicationId" value={item.id}/><input type="hidden" name="returnTo" value="/app/production"/><select name="slug" required defaultValue=""><option value="" disabled>Select portfolio…</option>{availablePortfolios.map((portfolio)=><option key={portfolio.id} value={portfolio.slug}>{portfolio.title || `@${portfolio.slug}`} · {portfolio.access}</option>)}</select><button className="button secondary compact" type="submit">Link</button></form> : <div className="card-actions"><a className="button secondary compact" href="/app/portfolios">Open Portfolio Control Centre</a></div>}
                  </>}
                </div>

                {lane.next && lane.action ? <form className="advance-form" action="/api/creator-applications/manage" method="post">
                  <input type="hidden" name="id" value={item.id}/><input type="hidden" name="status" value={lane.next}/><input type="hidden" name="expectedStatus" value={lane.key}/><input type="hidden" name="returnTo" value="/app/production"/>
                  <ConfirmSubmitButton className="button primary compact" message={lane.next === "PUBLISHED" ? `Mark ${item.creatorName || item.fullName} as Published? The server will still require a linked portfolio, non-failing QA and current creator approval for this exact revision.` : lane.next === "CREATOR_REVIEW" ? `Send ${item.creatorName || item.fullName} to Creator Review? The server will require a linked portfolio and non-failing QA before allowing the transition.` : `Start the portfolio build for ${item.creatorName || item.fullName}?`}>{lane.action} →</ConfirmSubmitButton>
                </form> : null}
              </article>) : <div className="empty">Nothing in this stage.</div>}
            </div>
          </section>;
        })}
      </section>
    </div>
  );
}
