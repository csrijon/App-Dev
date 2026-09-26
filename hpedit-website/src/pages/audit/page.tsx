import { getPrisma } from "@/lib/prisma";
import { ensurePortfolioSchema } from "@/lib/portfolio-cms";

export const dynamic = "force-dynamic";

function detailText(details: unknown) {
  if (!details || typeof details !== "object") return "—";
  const entries = Object.entries(details as Record<string, unknown>)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .slice(0, 8)
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : String(value)}`);
  return entries.join(" · ") || "—";
}

export default async function AuditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await ensurePortfolioSchema();
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const action = typeof params.action === "string" ? params.action.trim().slice(0, 100) : "";
  const resource = typeof params.resource === "string" ? params.resource.trim().slice(0, 100) : "";

  const prisma = getPrisma();
  const [rows, actionRows, resourceRows] = await Promise.all([
    prisma.auditLog.findMany({
      where: {
        ...(action ? { action } : {}),
        ...(resource ? { resource } : {}),
        ...(q ? {
          OR: [
            { action: { contains: q, mode: "insensitive" } },
            { resource: { contains: q, mode: "insensitive" } },
            { resourceId: { contains: q, mode: "insensitive" } },
            { actor: { contains: q, mode: "insensitive" } },
          ],
        } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 300,
    }),
    prisma.auditLog.findMany({ distinct: ["action"], orderBy: { action: "asc" }, select: { action: true } }),
    prisma.auditLog.findMany({ distinct: ["resource"], orderBy: { resource: "asc" }, select: { resource: true } }),
  ]);

  return (
    <div className="workspace-page">
      <style>{`
        .audit-action{font-size:.73rem;font-weight:800;letter-spacing:.05em;color:#c9bfff}.audit-details{max-width:620px;color:var(--muted);font-size:.78rem;line-height:1.45}.audit-resource{white-space:nowrap}.audit-empty{padding:36px;text-align:center;color:var(--muted)}
        .audit-filter{display:grid;grid-template-columns:1.4fr .9fr .8fr auto;gap:9px;margin-bottom:14px}.audit-filter input,.audit-filter select{width:100%;background:var(--surface-2);border:1px solid var(--line);border-radius:12px;color:var(--text);padding:10px 12px;outline:none}.audit-filter a{display:inline-flex;align-items:center;justify-content:center}
        @media(max-width:900px){.audit-filter{grid-template-columns:1fr}.audit-resource{white-space:normal}}
      `}</style>
      <header className="page-head"><div><span className="eyebrow">AUDIT HISTORY</span><h1>Administrative activity</h1><p>Search and filter portfolio, site-settings and application operations recorded by the CMS.</p></div></header>
      <section className="panel">
        <form className="audit-filter" method="get">
          <input name="q" defaultValue={q} placeholder="Search action, resource, ID or actor" />
          <select name="action" defaultValue={action}><option value="">All actions</option>{actionRows.map((row) => <option key={row.action} value={row.action}>{row.action.replaceAll("_", " ")}</option>)}</select>
          <select name="resource" defaultValue={resource}><option value="">All resources</option>{resourceRows.map((row) => <option key={row.resource} value={row.resource}>{row.resource}</option>)}</select>
          <button className="button primary compact" type="submit">Filter</button>
        </form>
        <div className="panel-head"><div><span className="kicker">RESULTS</span><h2>{rows.length} audit entr{rows.length === 1 ? "y" : "ies"}</h2></div>{q || action || resource ? <a className="button secondary compact" href="/app/audit">Clear filters</a> : <span>Newest first</span>}</div>
        {rows.length ? <div className="table-wrap"><table><thead><tr><th>Time</th><th>Action</th><th>Resource</th><th>Actor</th><th>Details</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td>{row.createdAt.toLocaleString("en-IN")}</td><td><span className="audit-action">{row.action.replaceAll("_", " ")}</span></td><td className="audit-resource">{row.resource}{row.resourceId ? ` · ${row.resourceId.slice(0, 16)}` : ""}</td><td>{row.actor}</td><td className="audit-details">{detailText(row.details)}</td></tr>)}</tbody></table></div> : <div className="audit-empty">No audit entries matched these filters.</div>}
      </section>
    </div>
  );
}
