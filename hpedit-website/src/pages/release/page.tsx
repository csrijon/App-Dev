import { listProductionQueue } from "@/lib/production-queue";
import { getPortfolioQa } from "@/lib/portfolio-qa";
import { getSiteSettings } from "@/lib/site-settings";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type QaSummary = {
  slug: string;
  status: "PASS" | "WARNING" | "FAIL";
  failed: number;
  warnings: number;
};

async function databaseHealthy() {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export default async function ReleasePage() {
  const [queue, site, dbHealthy] = await Promise.all([listProductionQueue(), getSiteSettings(), databaseHealthy()]);
  const linked = queue.filter((item) => item.portfolioSlug);
  const qaResults = await Promise.all(
    linked.map(async (item) => {
      const qa = item.portfolioSlug ? await getPortfolioQa(item.portfolioSlug) : null;
      return qa ? ({ slug: item.portfolioSlug!, status: qa.status, failed: qa.failed, warnings: qa.warnings } satisfies QaSummary) : null;
    }),
  );
  const qaBySlug = new Map(qaResults.filter(Boolean).map((item) => [item!.slug, item!]));

  const prisma = getPrisma();
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const since1h = new Date(Date.now() - 60 * 60 * 1000);
  const [failedLogins24h, successfulLogins24h, communityRequests1h, applicationSubmitRequests1h, draftCreateRequests1h] = await Promise.all([
    prisma.auditLog.count({ where: { resource: "LoginSecurity", action: "ADMIN_LOGIN_FAILED", createdAt: { gte: since24h } } }),
    prisma.auditLog.count({ where: { resource: "LoginSecurity", action: "ADMIN_LOGIN_SUCCEEDED", createdAt: { gte: since24h } } }),
    prisma.auditLog.count({ where: { resource: "CreatorCommunityRateLimit", action: "COMMUNITY_PREFERENCE_REQUEST", createdAt: { gte: since1h } } }),
    prisma.auditLog.count({ where: { resource: "CreatorApplicationRateLimit", action: "CREATOR_APPLICATION_SUBMIT_REQUEST", createdAt: { gte: since1h } } }),
    prisma.auditLog.count({ where: { resource: "CreatorDraftRateLimit", action: "CREATOR_DRAFT_CREATE_REQUEST", createdAt: { gte: since1h } } }),
  ]);

  const reviewAwaitingApproval = queue.filter(
    (item) => item.status === "CREATOR_REVIEW" && !item.creatorApprovalCurrent,
  ).length;
  const publishedApprovalStale = queue.filter(
    (item) => item.status === "PUBLISHED" && !item.creatorApprovalCurrent,
  ).length;

  const counts = {
    approved: queue.filter((item) => item.status === "APPROVED").length,
    building: queue.filter((item) => item.status === "BUILDING").length,
    review: queue.filter((item) => item.status === "CREATOR_REVIEW").length,
    published: queue.filter((item) => item.status === "PUBLISHED").length,
    linked: linked.length,
    qaFail: qaResults.filter((item) => item?.status === "FAIL").length,
    qaWarn: qaResults.filter((item) => item?.status === "WARNING").length,
    qaPass: qaResults.filter((item) => item?.status === "PASS").length,
    approvedRevision: queue.filter((item) => item.creatorApprovalCurrent).length,
  };

  const publishReady = queue.filter((item) => {
    if (item.status !== "CREATOR_REVIEW" || !item.portfolioSlug || !item.creatorApprovalCurrent) return false;
    const qa = qaBySlug.get(item.portfolioSlug);
    return Boolean(qa && qa.status !== "FAIL");
  });

  const blockers = [
    ...(!dbHealthy ? ["Database health check is failing."] : []),
    ...(site.primaryCtaVisible && site.primaryCtaLabel.trim() ? [] : ["Public application CTA is hidden or missing a label."]),
    ...(linked.length === 0 && queue.length > 0 ? ["Production queue has no linked hosted portfolios."] : []),
    ...(counts.qaFail ? [`${counts.qaFail} linked portfolio${counts.qaFail === 1 ? " has" : "s have"} failing QA.`] : []),
    ...(reviewAwaitingApproval ? [`${reviewAwaitingApproval} creator-review item${reviewAwaitingApproval === 1 ? " is" : "s are"} still awaiting current-revision approval.`] : []),
    ...(publishedApprovalStale ? [`${publishedApprovalStale} published portfolio${publishedApprovalStale === 1 ? " has" : "s have"} changed since the creator-approved revision. Re-review or move the application back before release sign-off.`] : []),
  ];

  const releaseScoreParts = [
    dbHealthy,
    site.primaryCtaVisible && Boolean(site.primaryCtaLabel.trim()),
    counts.qaFail === 0,
    reviewAwaitingApproval === 0 && publishedApprovalStale === 0,
    queue.filter((item) => item.status === "BUILDING" || item.status === "CREATOR_REVIEW").every((item) => Boolean(item.portfolioSlug)),
  ];
  const releaseScore = Math.round((releaseScoreParts.filter(Boolean).length / releaseScoreParts.length) * 100);

  return (
    <div className="workspace-page">
      <style>{`
        .release-score{display:flex;align-items:end;justify-content:space-between;gap:20px}.release-score strong{font-size:3.6rem;line-height:1;letter-spacing:-.06em}.release-score small{display:block;color:var(--dim);margin-top:6px}.release-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}.release-stat{border:1px solid var(--line);border-radius:14px;padding:14px;background:rgba(255,255,255,.018)}.release-stat b{display:block;font-size:1.8rem;letter-spacing:-.04em}.release-stat span{font-size:.74rem;color:var(--dim)}.gate-bar{height:9px;background:var(--surface-2);border-radius:999px;overflow:hidden;margin-top:15px}.gate-bar i{display:block;height:100%;border-radius:inherit;background:#27d7a7}.blockers{display:grid;gap:8px}.blocker{padding:12px 14px;border:1px solid rgba(255,107,122,.24);border-radius:12px;background:rgba(255,107,122,.06);color:#ffb0ba}.clear{padding:12px 14px;border:1px solid rgba(39,215,167,.24);border-radius:12px;background:rgba(39,215,167,.06);color:#8ef2d0}.release-table{display:grid;gap:8px}.release-row{display:grid;grid-template-columns:1.2fr .7fr .7fr .8fr auto;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.018)}.release-row small{color:var(--dim)}.qa-pass{color:#8ef2d0}.qa-warning{color:#ffd08a}.qa-fail{color:#ff9eaa}.release-actions{display:flex;gap:6px;flex-wrap:wrap}.security-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.security-card{padding:14px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.018)}.security-card b{display:block;font-size:1.8rem;letter-spacing:-.04em}.security-card span{display:block;color:var(--dim);font-size:.75rem;margin-top:3px}.security-note{margin:12px 0 0;color:var(--dim);font-size:.78rem;line-height:1.5}@media(max-width:1100px){.security-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:1000px){.release-grid{grid-template-columns:repeat(2,1fr)}.release-row{grid-template-columns:1fr 1fr}.release-actions{grid-column:1/-1}}@media(max-width:700px){.security-grid{grid-template-columns:1fr}}@media(max-width:620px){.release-grid,.release-row{grid-template-columns:1fr}.release-score{align-items:flex-start;flex-direction:column}}
      `}</style>

      <header className="page-head"><div><span className="eyebrow">RELEASE CONTROL</span><h1>Milestone readiness</h1><p>One place to decide when development is ready for a controlled preview or production merge.</p></div><a className="button secondary" href="/app/settings">Settings</a></header>

      <section className="panel">
        <div className="release-score"><div><span className="kicker">CURRENT GATE</span><h2>Release readiness</h2><small>Based on database health, public CTA, linked production portfolios, QA failures and current creator approvals.</small></div><div><strong>{releaseScore}%</strong><small>{blockers.length ? `${blockers.length} blocker${blockers.length === 1 ? "" : "s"}` : "No blocking conditions detected"}</small></div></div>
        <div className="gate-bar" aria-hidden="true"><i style={{ width: `${releaseScore}%` }} /></div>
        <div className="release-grid">
          <div className="release-stat"><b className={dbHealthy ? "qa-pass" : "qa-fail"}>{dbHealthy ? "OK" : "FAIL"}</b><span>Database health</span></div>
          <div className="release-stat"><b>{counts.building}</b><span>Building</span></div>
          <div className="release-stat"><b>{counts.review}</b><span>Creator review</span></div>
          <div className="release-stat"><b>{publishReady.length}</b><span>Publish-ready review items</span></div>
          <div className="release-stat"><b>{counts.published}</b><span>Published</span></div>
          <div className="release-stat"><b className={publishedApprovalStale ? "qa-fail" : "qa-pass"}>{publishedApprovalStale}</b><span>Published with stale approval</span></div>
          <div className="release-stat"><b>{counts.linked}</b><span>Linked portfolios</span></div>
          <div className="release-stat"><b>{counts.qaPass}</b><span>QA pass</span></div>
          <div className="release-stat"><b>{counts.qaWarn}</b><span>QA warning</span></div>
          <div className="release-stat"><b>{counts.qaFail}</b><span>QA fail</span></div>
        </div>
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel-head"><div><span className="kicker">SECURITY SIGNALS</span><h2>Recent authentication & public-form activity</h2></div><span>Informational</span></div>
        <div className="security-grid">
          <div className="security-card"><b className={failedLogins24h ? "qa-warning" : "qa-pass"}>{failedLogins24h}</b><span>Failed admin logins · last 24h</span></div>
          <div className="security-card"><b>{successfulLogins24h}</b><span>Successful admin logins · last 24h</span></div>
          <div className="security-card"><b>{communityRequests1h}</b><span>Community preference requests · last hour</span></div>
          <div className="security-card"><b>{applicationSubmitRequests1h}</b><span>Application submit attempts · last hour</span></div>
          <div className="security-card"><b>{draftCreateRequests1h}</b><span>New draft attempts · last hour</span></div>
        </div>
        <p className="security-note">These signals do not automatically block a release. Review unexpected spikes before promotion. Login and public-form rate-limit records use hashed request fingerprints rather than raw request addresses.</p>
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel-head"><div><span className="kicker">BLOCKERS</span><h2>What must be resolved</h2></div><span>{blockers.length}</span></div>
        {blockers.length ? <div className="blockers">{blockers.map((item) => <div className="blocker" key={item}>{item}</div>)}</div> : <div className="clear">No release-blocking condition is currently detected by the automated gate.</div>}
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel-head"><div><span className="kicker">PRODUCTION ITEMS</span><h2>Portfolio-level release evidence</h2></div><span>{queue.length} tracked</span></div>
        {queue.length === 0 ? <p style={{ color: "var(--dim)" }}>No applications are currently in the production workflow.</p> : <div className="release-table">{queue.map((item) => {
          const qa = item.portfolioSlug ? qaBySlug.get(item.portfolioSlug) : undefined;
          const qaClass = qa?.status === "PASS" ? "qa-pass" : qa?.status === "WARNING" ? "qa-warning" : "qa-fail";
          return <div className="release-row" key={item.id}>
            <div><strong>{item.creatorName || item.fullName}</strong><small>{item.primaryCategory || "Creator"}{item.city ? ` · ${item.city}` : ""}</small></div>
            <div><strong>{item.status.replaceAll("_", " ")}</strong><small>{item.portfolioSlug || "No portfolio linked"}</small></div>
            <div className={qaClass}><strong>{qa?.status || "NOT CHECKED"}</strong><small>{qa ? `${qa.failed} fail · ${qa.warnings} warn` : "Link a portfolio first"}</small></div>
            <div><strong>{item.creatorApprovalCurrent ? "APPROVED" : "PENDING"}</strong><small>Current revision approval</small></div>
            <div className="release-actions"><a className="button secondary compact" href={`/app/applications/${item.id}`}>Application</a>{item.portfolioSlug ? <><a className="button secondary compact" href={`/app/portfolios/${encodeURIComponent(item.portfolioSlug)}/qa`}>QA</a><a className="button secondary compact" href={`/app/applications/${item.id}/review-pack`}>Review pack</a></> : null}</div>
          </div>;
        })}</div>}
      </section>
    </div>
  );
}
