import { listCreatorCommunityStates } from "@/lib/creator-community";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const subscribers = await listCreatorCommunityStates(3000);
  const active = subscribers.filter((item) => item.active);
  const unsubscribed = subscribers.filter((item) => !item.active);

  return (
    <div className="workspace-page">
      <style>{`
        .community-list{display:grid;gap:8px}.community-row{display:grid;grid-template-columns:1.2fr .7fr .55fr auto;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.018)}.community-row small{color:var(--dim)}.community-email{overflow-wrap:anywhere}.community-id{font-family:ui-monospace,monospace;font-size:.72rem;color:var(--dim)}.community-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}.community-summary>div{border:1px solid var(--line);border-radius:14px;padding:14px;background:rgba(255,255,255,.018)}.community-summary b{display:block;font-size:1.8rem;letter-spacing:-.04em}.community-summary span{font-size:.74rem;color:var(--dim)}.state-active{color:#8ef2d0}.state-off{color:#ffb6bf}.community-actions{display:flex;gap:8px;flex-wrap:wrap}@media(max-width:760px){.community-row,.community-summary{grid-template-columns:1fr}}
      `}</style>
      <header className="page-head"><div><span className="eyebrow">CREATOR COMMUNITY</span><h1>Subscriber list</h1><p>Latest opt-in state for people who joined creator-programme updates and portfolio inspiration.</p></div><div className="community-actions"><span className="status active">{active.length} active</span><a className="button secondary compact" href="/api/community/export">Download active CSV</a></div></header>

      <section className="community-summary">
        <div><b>{active.length}</b><span>Active subscribers</span></div>
        <div><b>{unsubscribed.length}</b><span>Unsubscribed</span></div>
        <div><b>{subscribers.length}</b><span>Total unique addresses seen</span></div>
      </section>

      <section className="panel">
        <div className="panel-head"><div><span className="kicker">LATEST STATE</span><h2>Community preferences</h2></div><span>{subscribers.length} unique</span></div>
        {subscribers.length ? <div className="community-list">{subscribers.map((row) => <div className="community-row" key={row.resourceId}><div><strong className="community-email">{row.email}</strong><small>{row.createdAt.toLocaleString("en-IN")}</small></div><div><strong>{row.source}</strong><small>Latest source</small></div><div className={row.active ? "state-active" : "state-off"}><strong>{row.active ? "ACTIVE" : "UNSUBSCRIBED"}</strong><small>Current state</small></div><div className="community-id">{row.resourceId.slice(0, 12)}…</div></div>)}</div> : <p style={{ color: "var(--dim)" }}>No creator-community preferences have been recorded yet.</p>}
      </section>
    </div>
  );
}
