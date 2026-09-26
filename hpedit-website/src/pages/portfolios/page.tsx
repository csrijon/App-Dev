import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema } from "@/lib/portfolio-cms";
import { PortfolioActions } from "@/components/PortfolioActions";
import { ConfirmDeleteButton } from "@/components/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default async function PortfoliosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await ensurePortfolioSchema();
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim().toLowerCase().slice(0, 120) : "";
  const accessFilter = typeof params.access === "string" ? params.access.toUpperCase() : "ALL";
  const allPortfolios = await getPrisma().portfolio.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { assets: true } },
      assets: {
        where: { contentType: { startsWith: "image/" } },
        select: { id: true, path: true, contentType: true, size: true },
        orderBy: { path: "asc" },
      },
    },
  });
  const portfolios = allPortfolios.filter((portfolio) => {
    const matchesAccess = accessFilter === "ALL" || portfolio.access === accessFilter;
    const haystack = `${portfolio.slug} ${portfolio.title || ""} ${portfolio.sourceFileName || ""}`.toLowerCase();
    return matchesAccess && (!q || haystack.includes(q));
  });

  return (
    <div className="workspace-page">
      <style>{`
        .cms-notice{margin:0 0 14px;padding:13px 16px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.035);color:var(--muted)}
        .cms-notice.success{border-color:rgba(39,215,167,.24);background:rgba(39,215,167,.07);color:#8ef2d0}
        .cms-notice.warning{border-color:rgba(231,181,77,.28);background:rgba(231,181,77,.08);color:#f0cc78}
        .cms-upload-panel{overflow:hidden}
        .cms-upload-form{display:grid;grid-template-columns:1.15fr .65fr;gap:16px}
        .cms-upload-form>label,.cms-manage-form label,.cms-replace-form label,.asset-form label{display:grid;gap:7px;color:var(--muted);font-size:.82rem}
        .cms-upload-form>label:nth-child(3),.cms-upload-form>label:nth-child(4),.cms-upload-form>div{grid-column:1/-1}
        .cms-upload-form input,.cms-upload-form select,.cms-manage-form input,.cms-manage-form select,.cms-replace-form input,.asset-form input{width:100%;background:var(--surface-2);border:1px solid var(--line);border-radius:13px;color:var(--text);padding:12px 13px;outline:none}
        .cms-upload-form input:focus,.cms-upload-form select:focus,.cms-manage-form input:focus,.cms-manage-form select:focus,.cms-replace-form input:focus,.asset-form input:focus{border-color:rgba(124,92,255,.85)}
        .cms-upload-form small,.cms-replace-form small,.cms-manage-note,.asset-meta{color:var(--dim)}
        .slug-input{display:grid;grid-template-columns:auto 1fr;align-items:center;border:1px solid var(--line);border-radius:13px;background:var(--surface-2);overflow:hidden}
        .slug-input b{padding:0 0 0 13px;color:var(--dim);font-size:.84rem;font-weight:650}.slug-input input{border:0!important;background:transparent!important}
        .portfolio-filter{display:grid;grid-template-columns:1.5fr .65fr auto auto;gap:8px;margin:14px 0}.portfolio-filter input,.portfolio-filter select{background:var(--surface-2);border:1px solid var(--line);border-radius:11px;color:var(--text);padding:11px 12px}
        .cms-portfolio-list{display:grid;gap:12px}.cms-portfolio-card{border:1px solid var(--line);border-radius:18px;padding:18px;background:rgba(255,255,255,.02)}
        .cms-portfolio-meta{display:flex;justify-content:space-between;gap:18px;align-items:flex-start}.cms-portfolio-meta h3{margin:11px 0 3px;font-size:1.2rem}.cms-portfolio-meta p{margin:0;font-size:.86rem}.cms-portfolio-meta p a{color:#c5baff}
        .cms-quick-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.cms-quick-actions button{cursor:pointer}
        .cms-control-grid{display:grid;grid-template-columns:1.1fr .8fr;gap:12px;margin-top:18px;padding-top:16px;border-top:1px solid var(--line)}
        .cms-manage-form{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:end}.cms-manage-form .wide{grid-column:1/-1}.cms-manage-actions{display:flex;gap:8px;flex-wrap:wrap;grid-column:1/-1}.cms-manage-note{grid-column:1/-1;font-size:.78rem;line-height:1.45}
        .cms-replace-form{display:grid;gap:10px;padding:14px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.02);align-content:start}
        .cms-delete{border:1px solid rgba(255,107,122,.25);background:rgba(255,107,122,.07);color:#ff9eaa;border-radius:999px;padding:11px 15px;font-weight:750;cursor:pointer}
        .asset-manager{margin-top:18px;padding-top:16px;border-top:1px solid var(--line)}.asset-manager h4{margin:0 0 4px;font-size:1rem}.asset-manager>p{margin:0 0 12px;color:var(--muted);font-size:.84rem}.asset-list{display:grid;gap:9px}.asset-row{display:grid;grid-template-columns:minmax(180px,1fr) minmax(280px,1.4fr);gap:14px;align-items:center;padding:12px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.018)}.asset-name{min-width:0}.asset-name strong{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.asset-meta{font-size:.76rem;margin-top:4px}.asset-form{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:end}.asset-form input{padding:9px 10px}.asset-form button{white-space:nowrap}.asset-open{font-size:.76rem;color:#c5baff;margin-top:6px;display:inline-block}
        @media(max-width:900px){.cms-upload-form,.cms-control-grid,.cms-manage-form,.asset-row,.asset-form,.portfolio-filter{grid-template-columns:1fr}.cms-upload-form>label,.cms-upload-form>div,.cms-manage-form .wide,.cms-manage-actions,.cms-manage-note{grid-column:1!important}.cms-portfolio-meta{flex-direction:column}.slug-input{grid-template-columns:1fr}.slug-input b{padding:12px 13px 0}}
      `}</style>

      <header className="page-head"><div><span className="eyebrow">PORTFOLIO CONTROL CENTRE</span><h1>Creator portfolio management</h1><p>Publish, replace and manage creator portfolios without touching GitHub or Vercel. Control URLs, titles, visibility, passwords, images and live portfolio packages from one place.</p></div></header>

      {params.uploaded ? <div className="cms-notice success">Portfolio uploaded successfully.</div> : null}
      {params.replaced ? <div className="cms-notice success">Portfolio package replaced successfully. Existing access settings were preserved.</div> : null}
      {params.imageReplaced ? <div className="cms-notice success">Image replaced successfully. Active sessions will pick up the new revision automatically.</div> : null}
      {params.updated ? <div className="cms-notice success">Portfolio settings updated. Active portfolio sessions will refresh automatically within about 30 seconds.</div> : null}
      {params.refreshed ? <div className="cms-notice success">Active portfolio sessions were marked for refresh and will reload automatically on their next revision check.</div> : null}
      {params.deleted ? <div className="cms-notice">Portfolio deleted.</div> : null}
      {params.deleteError === "portfolio-relationship-locked-stage" ? <div className="cms-notice warning">Deletion blocked for @{typeof params.slug === "string" ? params.slug : "this portfolio"}. It is linked to a creator in Creator Review or Published. Move the application back to Building and unlink the portfolio before deleting it.</div> : null}

      <section className="panel cms-upload-panel">
        <div className="panel-head"><div><span className="kicker">NEW PORTFOLIO</span><h2>Upload from ZIP</h2></div><span>Hidden by default</span></div>
        <form className="cms-upload-form" action="/api/portfolios/upload" method="post" encType="multipart/form-data">
          <label><span>URL slug</span><div className="slug-input"><b>influencers.hpedit.com/</b><input name="slug" required placeholder="creatorhandle" pattern="[A-Za-z0-9-]{3,64}" /></div></label>
          <label><span>Visibility</span><select name="access" defaultValue="HIDDEN"><option value="HIDDEN">Hidden — recommended while building</option><option value="PASSWORD">Password protected</option><option value="PUBLIC">Public</option></select></label>
          <label><span>Password <small>(only needed for password-protected portfolios)</small></span><input name="password" type="password" minLength={6} autoComplete="new-password" placeholder="Optional unless protected" /></label>
          <label><span>Portfolio package</span><input name="file" type="file" accept=".zip,application/zip" required /><small>ZIP must contain an index.html. Current limit: 4 MB compressed / 20 MB unpacked / 200 files.</small></label>
          <div><button className="button primary" type="submit">Upload portfolio</button></div>
        </form>
      </section>

      <form className="panel portfolio-filter" method="get">
        <input name="q" defaultValue={typeof params.q === "string" ? params.q : ""} placeholder="Search title, slug or source ZIP…" aria-label="Search portfolios" />
        <select name="access" defaultValue={accessFilter} aria-label="Visibility filter"><option value="ALL">All visibility</option><option value="PUBLIC">Public</option><option value="PASSWORD">Password protected</option><option value="HIDDEN">Hidden</option></select>
        <button className="button primary compact" type="submit">Filter</button><Link className="button secondary compact" href="/app/portfolios">Reset</Link>
      </form>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel-head"><div><span className="kicker">HOSTED PORTFOLIOS</span><h2>{portfolios.length} of {allPortfolios.length} portfolio{allPortfolios.length === 1 ? "" : "s"}</h2></div><span>Managed from PostgreSQL</span></div>
        {portfolios.length === 0 ? <p>No portfolios match these filters.</p> : <div className="cms-portfolio-list">{portfolios.map((portfolio) => <article className="cms-portfolio-card" key={portfolio.id}>
          <div className="cms-portfolio-meta"><div><span className={`status ${portfolio.access === "PUBLIC" ? "active" : portfolio.access === "PASSWORD" ? "review" : "planning"}`}>{portfolio.access === "PUBLIC" ? "Public" : portfolio.access === "PASSWORD" ? "Password" : "Hidden"}</span><h3>{portfolio.title || `@${portfolio.slug}`}</h3><p><Link href={`/${portfolio.slug}`} target="_blank">influencers.hpedit.com/{portfolio.slug}</Link></p><PortfolioActions slug={portfolio.slug} /></div><div className="data-note">{portfolio._count.assets} files · {portfolio.assets.length} image{portfolio.assets.length === 1 ? "" : "s"} · {portfolio.sourceFileName || "ZIP package"}<br />Updated {portfolio.updatedAt.toLocaleString("en-IN")}</div></div>
          <div className="cms-control-grid"><form className="cms-manage-form" action="/api/portfolios/manage" method="post"><input type="hidden" name="slug" value={portfolio.slug} /><label><span>Display title</span><input name="title" defaultValue={portfolio.title || ""} placeholder="Creator / portfolio title" /></label><label><span>URL slug</span><input name="newSlug" defaultValue={portfolio.slug} pattern="[A-Za-z0-9-]{3,64}" required /></label><label><span>Visibility</span><select name="access" defaultValue={portfolio.access}><option value="PUBLIC">Public</option><option value="PASSWORD">Password protected</option><option value="HIDDEN">Hidden</option></select></label><label><span>New password</span><input name="password" type="password" minLength={6} autoComplete="new-password" placeholder={portfolio.access === "PASSWORD" ? "Leave blank to keep current" : "Only for protected mode"} /></label><div className="cms-manage-actions"><button className="button primary compact" type="submit" name="intent" value="update">Save settings & refresh sessions</button><ConfirmDeleteButton /></div><div className="cms-manage-note">Saving settings updates this portfolio revision. Active tabs check for changes every ~30 seconds and reload automatically.</div></form>
          <form className="cms-replace-form" action="/api/portfolios/upload" method="post" encType="multipart/form-data"><input type="hidden" name="slug" value={portfolio.slug} /><input type="hidden" name="preserveSettings" value="1" /><div><strong>Replace portfolio package</strong><br /><small>Upload a new ZIP while keeping this creator record, URL, visibility and password. Replacement also refreshes active sessions.</small></div><label><span>Replacement ZIP</span><input name="file" type="file" accept=".zip,application/zip" required /></label><button className="button secondary compact" type="submit">Replace ZIP</button></form></div>
          {portfolio.assets.length ? <div className="asset-manager"><h4>Image asset manager</h4><p>Replace an existing portfolio image without rebuilding the ZIP. The filename/path stays unchanged, and the portfolio revision is bumped automatically.</p><div className="asset-list">{portfolio.assets.map((asset) => <div className="asset-row" key={asset.id}><div className="asset-name"><strong>{asset.path}</strong><div className="asset-meta">{asset.contentType} · {formatBytes(asset.size)}</div>{portfolio.access !== "HIDDEN" ? <Link className="asset-open" href={`/${portfolio.slug}/${asset.path}`} target="_blank">Open current image ↗</Link> : null}</div><form className="asset-form" action="/api/portfolios/upload" method="post" encType="multipart/form-data"><input type="hidden" name="mode" value="image" /><input type="hidden" name="slug" value={portfolio.slug} /><input type="hidden" name="assetPath" value={asset.path} /><label><span>Replacement image</span><input name="file" type="file" accept={asset.contentType === "image/jpeg" ? "image/jpeg" : asset.contentType} required /></label><button className="button secondary compact" type="submit">Replace image</button></form></div>)}</div></div> : null}
        </article>)}</div>}
      </section>
    </div>
  );
}