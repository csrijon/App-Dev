import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0,2).map((part)=>part[0]?.toUpperCase()).join("") || "CR";
}

export default async function CreatorsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim().slice(0,100) : "";
  const status = typeof params.status === "string" ? params.status : "";
  const city = typeof params.city === "string" ? params.city.trim().slice(0,100) : "";
  const prisma = getPrisma();
  const creators = await prisma.creator.findMany({
    where: {
      ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { handle: { contains: q, mode: "insensitive" } }, { niche: { contains: q, mode: "insensitive" } }] } : {}),
      ...(status && status !== "ALL" ? { status: status as "NEW" | "SHORTLISTED" | "CONTACTED" | "NEGOTIATING" | "ACTIVE" | "PAUSED" | "ARCHIVED" } : {}),
      ...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
    },
    orderBy: { updatedAt: "desc" },
    take: 500,
  });
  const cities = Array.from(new Set(creators.map((creator)=>creator.city).filter(Boolean) as string[])).sort();

  return (
    <div className="workspace-page">
      <header className="page-head">
        <div><span className="eyebrow">CREATOR CRM</span><h1>Creator relationships</h1><p>Real creator records sourced from approved applications and authorised relationship data.</p></div>
        <a className="button primary compact" href="/app/applications">Review applications</a>
      </header>
      {params.converted ? <div style={{padding:"12px 14px",border:"1px solid rgba(39,215,167,.25)",borderRadius:12,background:"rgba(39,215,167,.07)",color:"#8ef2d0",marginBottom:14}}>Creator record created or refreshed from the approved application.</div> : null}
      <form className="panel filter-bar" method="get">
        <input name="q" defaultValue={q} placeholder="Search creators, handles or niche…" aria-label="Search creators" />
        <select name="status" defaultValue={status || "ALL"} aria-label="Status filter"><option value="ALL">All statuses</option><option value="NEW">New</option><option value="SHORTLISTED">Shortlisted</option><option value="CONTACTED">Contacted</option><option value="NEGOTIATING">Negotiating</option><option value="ACTIVE">Active</option><option value="PAUSED">Paused</option><option value="ARCHIVED">Archived</option></select>
        <select name="city" defaultValue={city} aria-label="City filter"><option value="">All cities</option>{cities.map((item)=><option key={item} value={item}>{item}</option>)}</select>
        <button className="button secondary compact" type="submit">Filter</button>
      </form>
      <section className="panel">
        <div className="panel-head"><div><span className="kicker">LIVE CREATOR CRM</span><h2>{creators.length} creator{creators.length === 1 ? "" : "s"}</h2></div><span>PostgreSQL</span></div>
        {creators.length ? <div className="table-wrap">
          <table>
            <thead><tr><th>Creator</th><th>Niche</th><th>Location</th><th>Audience</th><th>Platform</th><th>Relationship</th><th>Source</th></tr></thead>
            <tbody>{creators.map((creator) => (
              <tr key={creator.id}>
                <td><div className="creator-cell"><span className="avatar">{initials(creator.name)}</span><div><strong>{creator.name}</strong><small>{creator.handle || creator.publicEmail || "No public handle"}</small></div></div></td>
                <td>{creator.niche || "—"}</td><td>{[creator.city,creator.country].filter(Boolean).join(", ") || "—"}</td><td>{(creator.followers || 0).toLocaleString()}</td><td>{creator.profileUrl ? <a href={creator.profileUrl} target="_blank">{creator.platform || "Profile"}</a> : (creator.platform || "—")}</td><td><span className="pill">{creator.status.toLowerCase().replaceAll("_"," ")}</span></td><td>{creator.externalId?.startsWith("ca_") ? "Creator application" : (creator.sourceUrl ? "Imported" : "Manual")}</td>
              </tr>
            ))}</tbody>
          </table>
        </div> : <div style={{padding:"28px 4px"}}><h3>No live creator records yet.</h3><p className="data-note">Approve an inbound application, then convert it to a Creator record. Synthetic demo creators have been removed from this page.</p></div>}
      </section>
    </div>
  );
}
