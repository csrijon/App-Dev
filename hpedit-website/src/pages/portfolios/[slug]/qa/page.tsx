import { notFound } from "next/navigation";
import { getPortfolioQa } from "@/lib/portfolio-qa";

export const dynamic = "force-dynamic";

function statusClass(level: "PASS" | "WARNING" | "FAIL") {
  return level === "PASS" ? "active" : level === "WARNING" ? "review" : "planning";
}

export default async function PortfolioQaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getPortfolioQa(slug);
  if (!report) notFound();

  return (
    <div className="workspace-page qa-page">
      <style>{`
        .qa-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}.qa-summary article{padding:14px 15px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.02)}.qa-summary strong{display:block;font-size:1.7rem;letter-spacing:-.04em}.qa-summary span{font-size:.78rem;color:var(--muted)}.qa-list{display:grid;gap:9px}.qa-row{display:grid;grid-template-columns:auto minmax(170px,.45fr) 1fr;gap:12px;align-items:start;padding:12px 14px;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.018)}.qa-row p{margin:0;color:var(--muted);line-height:1.5;font-size:.84rem}.qa-row strong{font-size:.9rem}.qa-dot{width:10px;height:10px;border-radius:50%;margin-top:5px}.qa-dot.pass{background:#27d7a7}.qa-dot.warning{background:#e7b54d}.qa-dot.fail{background:#ff6b7a}.qa-note{margin-top:14px;padding:13px 15px;border:1px solid var(--line);border-radius:13px;color:var(--muted);font-size:.82rem;line-height:1.55}@media(max-width:800px){.qa-summary{grid-template-columns:repeat(2,1fr)}.qa-row{grid-template-columns:auto 1fr}.qa-row p{grid-column:2}}@media(max-width:520px){.qa-summary{grid-template-columns:1fr}}
      `}</style>

      <header className="page-head"><div><span className="eyebrow">PRE-PUBLISH QA</span><h1>{report.portfolio.title || `@${report.portfolio.slug}`}</h1><p>Automated package checks for missing files, metadata, accessibility basics, asset weight and obvious publishing risks.</p></div><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><a className="button secondary compact" href="/app/portfolios">← Portfolios</a><a className="button secondary compact" href={`/${report.portfolio.slug}`} target="_blank">Open live</a></div></header>

      <section className="qa-summary">
        <article><strong>{report.checks.length}</strong><span>Checks run</span></article>
        <article><strong>{report.checks.filter((check)=>check.level==='PASS').length}</strong><span>Passed</span></article>
        <article><strong>{report.warnings}</strong><span>Warnings</span></article>
        <article><strong>{report.failed}</strong><span>Failures</span></article>
      </section>

      <section className="panel">
        <div className="panel-head"><div><span className="kicker">RESULT</span><h2>Portfolio QA report</h2></div><span className={`status ${statusClass(report.status)}`}>{report.status}</span></div>
        <div className="qa-list">{report.checks.map((check)=><article className="qa-row" key={check.key}><span className={`qa-dot ${check.level.toLowerCase()}`}/><strong>{check.label}</strong><p>{check.detail}</p></article>)}</div>
        <div className="qa-note">This is an automated pre-flight review, not a substitute for visual QA. Before publication, also inspect the live portfolio manually on mobile and desktop, verify creator-approved content, test primary CTAs and confirm image/copy quality.</div>
      </section>
    </div>
  );
}
