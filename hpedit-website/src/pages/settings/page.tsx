import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema } from "@/lib/portfolio-cms";
import { DEFAULT_SITE_SETTINGS, getSiteSettings, saveSiteSettings, type SiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

async function saveHomepageSettings(formData: FormData) {
  "use server";
  const current = await getSiteSettings();
  const hpeditUrl = String(formData.get("hpeditUrl") || current.hpeditUrl).trim();
  try {
    const parsed = new URL(hpeditUrl);
    if (!/^https?:$/.test(parsed.protocol)) throw new Error("Invalid URL");
  } catch {
    redirect("/app/settings?siteError=1");
  }

  await saveSiteSettings({
    eyebrow: String(formData.get("eyebrow") || current.eyebrow).trim().slice(0, 120),
    heroTitle: String(formData.get("heroTitle") || current.heroTitle).trim().slice(0, 220),
    heroDescription: String(formData.get("heroDescription") || current.heroDescription).trim().slice(0, 700),
    heroImageUrl: current.heroImageUrl,
    heroVideoUrl: current.heroVideoUrl,
    ctaImageUrl: current.ctaImageUrl,
    primaryCtaLabel: String(formData.get("primaryCtaLabel") || current.primaryCtaLabel).trim().slice(0, 80),
    primaryCtaVisible: formData.get("primaryCtaVisible") === "on",
    hpeditCtaLabel: String(formData.get("hpeditCtaLabel") || current.hpeditCtaLabel).trim().slice(0, 80),
    hpeditCtaVisible: formData.get("hpeditCtaVisible") === "on",
    hpeditUrl,
  });
  revalidatePath("/");
  revalidatePath("/app/settings");
  redirect("/app/settings?siteSaved=1");
}

async function restoreHomepageSettings(formData: FormData) {
  "use server";
  const id = String(formData.get("revisionId") || "");
  const row = await getPrisma().auditLog.findFirst({
    where: { id, resource: "SiteSettings", action: "SITE_SETTINGS_UPDATED" },
    select: { details: true },
  });
  if (!row?.details || typeof row.details !== "object" || Array.isArray(row.details)) {
    redirect("/app/settings?restoreError=1");
  }
  const current = await getSiteSettings();
  await saveSiteSettings({ ...current, ...(row.details as Partial<SiteSettings>) });
  revalidatePath("/");
  revalidatePath("/app/settings");
  redirect("/app/settings?restored=1");
}

async function restoreHomepageDefaults() {
  "use server";
  await saveSiteSettings(DEFAULT_SITE_SETTINGS);
  revalidatePath("/");
  revalidatePath("/app/settings");
  redirect("/app/settings?defaultsRestored=1");
}

export default async function SettingsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const dbConfigured = Boolean(
    process.env.DATABASE_URL ||
    process.env.DATABASE1_PRISMA_DATABASE_URL ||
    process.env.DATABASE1_DATABASE_URL ||
    process.env.DATABASE1_POSTGRES_URL,
  );
  const authConfigured = Boolean(process.env.AUTH_SECRET && process.env.ADMIN_PASSWORD);

  await ensurePortfolioSchema();
  const [audit, site, siteHistory] = await Promise.all([
    getPrisma().auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      select: { id: true, action: true, resource: true, resourceId: true, details: true, createdAt: true },
    }),
    getSiteSettings(),
    getPrisma().auditLog.findMany({
      where: { resource: "SiteSettings", action: "SITE_SETTINGS_UPDATED" },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, details: true, createdAt: true },
    }),
  ]);

  const readinessChecks = [
    { label: "Database connection", ready: dbConfigured, detail: dbConfigured ? "Configured" : "Missing database environment variables" },
    { label: "Admin authentication", ready: authConfigured, detail: authConfigured ? "Configured" : "Missing AUTH_SECRET / ADMIN_PASSWORD" },
    { label: "Application CTA", ready: site.primaryCtaVisible && Boolean(site.primaryCtaLabel.trim()), detail: site.primaryCtaVisible ? site.primaryCtaLabel : "Hidden" },
    { label: "HPEDIT destination", ready: /^https?:\/\//.test(site.hpeditUrl), detail: site.hpeditUrl },
    { label: "Homepage revision history", ready: siteHistory.length > 0, detail: `${siteHistory.length} saved revision${siteHistory.length === 1 ? "" : "s"}` },
    { label: "Homepage media", ready: Boolean(site.heroImageUrl && site.ctaImageUrl), detail: site.heroVideoUrl ? "Hero video + still fallback + CTA image configured" : "Hero still + CTA image configured" },
  ];
  const readyCount = readinessChecks.filter((item) => item.ready).length;
  const readinessPercent = Math.round((readyCount / readinessChecks.length) * 100);

  return (
    <div className="workspace-page">
      <style>{`
        .audit-list{display:grid;gap:8px}.audit-row{display:grid;grid-template-columns:minmax(210px,.9fr) minmax(180px,.7fr) 1.4fr auto;gap:12px;align-items:start;padding:12px 14px;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.02)}
        .audit-action{font-weight:760;color:var(--text);overflow-wrap:anywhere}.audit-resource,.audit-time,.audit-details{font-size:.78rem;color:var(--dim);line-height:1.45}.audit-time{white-space:nowrap}.audit-details{overflow-wrap:anywhere}.audit-empty{color:var(--muted)}
        .site-form{display:grid;grid-template-columns:1fr 1fr;gap:12px}.site-form label{display:grid;gap:7px;color:var(--muted);font-size:.82rem}.site-form .wide{grid-column:1/-1}.site-form input,.site-form textarea{width:100%;background:var(--surface-2);border:1px solid var(--line);border-radius:13px;color:var(--text);padding:12px 13px;outline:none;font:inherit}.site-form textarea{min-height:110px;resize:vertical}.toggle-row{display:flex;gap:18px;flex-wrap:wrap;grid-column:1/-1}.toggle-row label{display:flex;align-items:center;gap:8px}.toggle-row input{width:auto}.notice{margin:0 0 14px;padding:13px 16px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.035);color:var(--muted)}.notice.success{border-color:rgba(39,215,167,.24);background:rgba(39,215,167,.07);color:#8ef2d0}.notice.error{border-color:rgba(255,107,122,.25);background:rgba(255,107,122,.07);color:#ff9eaa}
        .revision-list{display:grid;gap:8px;margin-top:12px}.revision-row{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.018)}.revision-copy{min-width:0}.revision-copy strong{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.revision-copy small{color:var(--dim)}
        .readiness-head{display:flex;align-items:center;justify-content:space-between;gap:18px}.readiness-score{font-size:2.2rem;font-weight:850;letter-spacing:-.05em}.readiness-score small{font-size:.82rem;font-weight:600;color:var(--dim);letter-spacing:0}.readiness-bar{height:8px;background:var(--surface-2);border-radius:999px;overflow:hidden;margin:14px 0 16px}.readiness-bar i{display:block;height:100%;background:#27d7a7;border-radius:inherit}.readiness-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.readiness-item{display:grid;grid-template-columns:auto 1fr;gap:10px;padding:11px 12px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.018)}.readiness-dot{width:10px;height:10px;border-radius:50%;margin-top:5px;background:#ffb24d}.readiness-item.ready .readiness-dot{background:#27d7a7}.readiness-item strong{display:block}.readiness-item small{display:block;color:var(--dim);line-height:1.4;margin-top:2px;overflow-wrap:anywhere}.settings-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
        @media(max-width:900px){.audit-row,.site-form,.revision-row,.readiness-grid{grid-template-columns:1fr}.audit-time{white-space:normal}.site-form .wide,.toggle-row{grid-column:1}.readiness-head{align-items:flex-start;flex-direction:column}}
      `}</style>
      <header className="page-head"><div><span className="eyebrow">PLATFORM SETTINGS</span><h1>System readiness & site controls</h1><p>Manage platform health and public homepage messaging from one place.</p></div><a className="button secondary" href="/app/settings/hero-media">Homepage media</a></header>
      {params.siteSaved ? <div className="notice success">Public homepage settings saved.</div> : null}
      {params.restored ? <div className="notice success">Homepage settings restored from an earlier revision.</div> : null}
      {params.defaultsRestored ? <div className="notice success">Homepage defaults restored as a new reversible revision.</div> : null}
      {params.siteError ? <div className="notice error">The HPEDIT destination URL was invalid.</div> : null}
      {params.restoreError ? <div className="notice error">That homepage revision could not be restored.</div> : null}

      <section className="panel">
        <div className="readiness-head"><div><span className="kicker">RELEASE READINESS</span><h2>Homepage milestone gate</h2><p>Use this as the quick pre-preview / pre-production sanity check.</p></div><div className="readiness-score">{readinessPercent}% <small>{readyCount}/{readinessChecks.length} ready</small></div></div>
        <div className="readiness-bar" aria-hidden="true"><i style={{ width: `${readinessPercent}%` }} /></div>
        <div className="readiness-grid">{readinessChecks.map((item) => <div className={`readiness-item ${item.ready ? "ready" : ""}`} key={item.label}><span className="readiness-dot" aria-hidden="true" /><div><strong>{item.label}</strong><small>{item.detail}</small></div></div>)}</div>
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel-head"><div><span className="kicker">PUBLIC HOMEPAGE</span><h2>Homepage content controls</h2></div><span>Database-backed</span></div>
        <form className="site-form" action={saveHomepageSettings}>
          <label className="wide"><span>Eyebrow</span><input name="eyebrow" defaultValue={site.eyebrow} maxLength={120} /></label>
          <label className="wide"><span>Hero title</span><input name="heroTitle" defaultValue={site.heroTitle} maxLength={220} /></label>
          <label className="wide"><span>Hero description</span><textarea name="heroDescription" defaultValue={site.heroDescription} maxLength={700} /></label>
          <label><span>Primary CTA label</span><input name="primaryCtaLabel" defaultValue={site.primaryCtaLabel} maxLength={80} /></label>
          <label><span>HPEDIT CTA label</span><input name="hpeditCtaLabel" defaultValue={site.hpeditCtaLabel} maxLength={80} /></label>
          <label className="wide"><span>HPEDIT destination URL</span><input name="hpeditUrl" defaultValue={site.hpeditUrl} /></label>
          <div className="toggle-row">
            <label><input name="primaryCtaVisible" type="checkbox" defaultChecked={site.primaryCtaVisible} /> Show application CTA</label>
            <label><input name="hpeditCtaVisible" type="checkbox" defaultChecked={site.hpeditCtaVisible} /> Show HPEDIT CTA</label>
          </div>
          <div className="wide settings-actions"><button className="button primary" type="submit">Save homepage settings</button><a className="button secondary compact" href="/app/settings/hero-media">Edit homepage images / video</a></div>
        </form>

        <div className="settings-actions" style={{ marginTop: 10 }}><form action={restoreHomepageDefaults}><button className="button secondary compact" type="submit">Restore homepage defaults</button></form><small style={{ color: "var(--dim)" }}>Creates a new revision; earlier settings remain restorable below.</small></div>

        {siteHistory.length ? <div style={{ marginTop: 18 }}>
          <div className="panel-head"><div><span className="kicker">REVISION HISTORY</span><h2>Recent homepage versions</h2></div><span>{siteHistory.length} saved</span></div>
          <div className="revision-list">{siteHistory.map((revision, index) => {
            const details = revision.details && typeof revision.details === "object" && !Array.isArray(revision.details) ? revision.details as Partial<SiteSettings> : {};
            return <div className="revision-row" key={revision.id}>
              <div className="revision-copy"><strong>{details.heroTitle || "Homepage settings"}</strong><small>{revision.createdAt.toLocaleString("en-IN")}{index === 0 ? " · current" : ""}</small></div>
              <small>{details.primaryCtaVisible === false ? "Application CTA hidden" : "Application CTA shown"}</small>
              {index === 0 ? <span className="status active">Current</span> : <form action={restoreHomepageSettings}><input type="hidden" name="revisionId" value={revision.id} /><button className="button secondary compact" type="submit">Restore</button></form>}
            </div>;
          })}</div>
        </div> : null}
      </section>

      <section className="settings-grid" style={{ marginTop: 14 }}>
        <article className="panel setting-card"><div><span className="kicker">AUTHENTICATION</span><h2>Private CMS access</h2></div><span className={`status ${authConfigured ? "active" : "review"}`}>{authConfigured ? "Configured" : "Needs env vars"}</span><p>Admin access uses a server-signed HTTP-only session cookie backed by <code>AUTH_SECRET</code> and <code>ADMIN_PASSWORD</code>.</p></article>
        <article className="panel setting-card"><div><span className="kicker">DATABASE</span><h2>Portfolio PostgreSQL</h2></div><span className={`status ${dbConfigured ? "active" : "planning"}`}>{dbConfigured ? "Connected" : "Not configured"}</span><p>Portfolio records, binary assets, analytics events and audit history are stored in PostgreSQL.</p></article>
        <article className="panel setting-card"><div><span className="kicker">DOMAIN</span><h2>influencers.hpedit.com</h2></div><span className="status active">Live</span><p>The creator portfolio platform is deployed on its dedicated Vercel project and HPEDIT subdomain.</p></article>
        <article className="panel setting-card"><div><span className="kicker">PORTFOLIO DELIVERY</span><h2>Database-backed publishing</h2></div><span className="status active">Live</span><p>ZIP packages and individual image assets can be replaced from the CMS without a new deployment.</p></article>
        <article className="panel setting-card"><div><span className="kicker">ANALYTICS</span><h2>First-party tracking</h2></div><span className="status active">Live</span><p>Portfolio views, anonymous sessions, clicks, engaged time, invite/ref tags, browser/device and coarse location are tracked without raw IP storage.</p></article>
        <article className="panel setting-card"><div><span className="kicker">ACTIVE SESSIONS</span><h2>Revision refresh</h2></div><span className="status active">Live</span><p>Tracked portfolio tabs check for revision changes about every 30 seconds and reload when a portfolio revision changes.</p></article>
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel-head"><div><span className="kicker">AUDIT HISTORY</span><h2>Recent CMS activity</h2></div><span>Latest {audit.length} events</span></div>
        {audit.length === 0 ? <p className="audit-empty">No audit events recorded yet.</p> : <div className="audit-list">
          {audit.map((item) => {
            let details = "";
            try { details = item.details ? JSON.stringify(item.details) : ""; } catch { details = ""; }
            return <div className="audit-row" key={item.id}>
              <div className="audit-action">{item.action}</div>
              <div className="audit-resource">{item.resource}{item.resourceId ? ` · ${item.resourceId}` : ""}</div>
              <div className="audit-details">{details || "—"}</div>
              <div className="audit-time">{item.createdAt.toLocaleString("en-IN")}</div>
            </div>;
          })}
        </div>}
      </section>
    </div>
  );
}
