import { notFound } from "next/navigation";
import { getApplicationForAdmin, listApplicationAssetsForOne } from "@/lib/creator-application-admin";
import { PrintBriefButton } from "@/components/PrintBriefButton";

export const dynamic = "force-dynamic";

function value(input: unknown, fallback = "—") {
  if (typeof input === "string" && input.trim()) return input.trim();
  if (typeof input === "number") return input.toLocaleString("en-IN");
  return fallback;
}

function list(input: unknown) {
  return Array.isArray(input) && input.length ? input.join(", ") : "—";
}

function yesNo(input: unknown) {
  return input ? "Yes" : "No";
}

function assetSummary(kind: string, fileName: string, size: number) {
  const sizeText = size < 1_000_000 ? `${Math.max(1, Math.round(size / 1000))} KB` : `${(size / 1_000_000).toFixed(1)} MB`;
  return `${kind.toLowerCase().replaceAll("_", " ")} · ${fileName} · ${sizeText}`;
}

export default async function ProductionBriefPage({ params }: { params: Promise<{ applicationId: string }> }) {
  const { applicationId } = await params;
  const [application, assets] = await Promise.all([
    getApplicationForAdmin(applicationId),
    listApplicationAssetsForOne(applicationId),
  ]);

  if (!application) notFound();
  const data = application.data || {};
  const displayName = application.creatorName || application.fullName;
  const location = [data.city, data.state, data.country].filter(Boolean).join(", ") || "—";

  const priorities = [
    data.headline ? `Lead with: ${data.headline}` : null,
    data.bio ? "Build a strong creator story / about section from the submitted bio." : null,
    Array.isArray(data.services) && data.services.length ? `Make these creator services easy to discover: ${data.services.join(", ")}.` : null,
    data.notableCollaborations ? "Give notable collaborations a prominent proof section." : null,
    data.achievements ? "Surface achievements / press as credibility proof." : null,
    data.showAudienceMetrics ? "Include audience / performance metrics where visually useful." : "Do not surface audience metrics unless separately approved.",
    data.publicEmail ? "Public email CTA is approved." : "Keep email private by default.",
    data.publicWhatsapp ? "Public WhatsApp CTA is approved." : "Keep WhatsApp private by default.",
  ].filter(Boolean) as string[];

  return (
    <div className="workspace-page brief-page">
      <style>{`
        .brief-page{max-width:1180px}.brief-top{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:18px}.brief-top h1{margin:5px 0 8px;font-size:2.25rem}.brief-top p{margin:0;color:var(--muted);line-height:1.55}.brief-actions{display:flex;gap:8px;flex-wrap:wrap}.brief-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.brief-card{border:1px solid var(--line);background:rgba(255,255,255,.02);border-radius:17px;padding:17px}.brief-card.wide{grid-column:1/-1}.brief-card h2{font-size:1rem;margin:0 0 13px}.brief-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.brief-field{padding:10px 11px;border:1px solid var(--line);border-radius:11px}.brief-field small{display:block;color:var(--dim);margin-bottom:4px}.brief-field p{margin:0;color:var(--muted);line-height:1.5;white-space:pre-wrap}.brief-field.wide{grid-column:1/-1}.brief-list{display:grid;gap:8px;margin:0;padding:0;list-style:none}.brief-list li{padding:10px 12px;border:1px solid var(--line);border-radius:11px;color:var(--muted);line-height:1.5}.checklist{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.check{padding:11px 12px;border:1px solid var(--line);border-radius:11px;color:var(--muted)}.check:before{content:'□';margin-right:8px;color:#9c91ff;font-weight:900}.asset-list{display:grid;gap:8px}.asset-row{display:flex;justify-content:space-between;gap:12px;align-items:center;border:1px solid var(--line);border-radius:11px;padding:10px 12px}.asset-row span{color:var(--muted);font-size:.82rem}.print-note{color:var(--dim);font-size:.78rem;margin-top:10px}
        @media print{
          @page{size:A4;margin:12mm}
          html,body{background:#fff!important;color:#111!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
          .app-frame{display:block!important;min-height:0!important;background:#fff!important}
          .sidebar,.brief-actions,.print-note{display:none!important}
          .app-main{display:block!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;background:#fff!important}
          .workspace-page,.brief-page{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;color:#111!important}
          .brief-top{margin:0 0 12mm!important;padding:0 0 5mm!important;border-bottom:1px solid #d7d7d7;break-after:avoid-page}
          .brief-top .eyebrow{color:#5b50cb!important}
          .brief-top h1{font-size:26pt!important;color:#111!important;margin:2mm 0 2mm!important}
          .brief-top p{font-size:9pt!important;color:#444!important;line-height:1.45!important}
          .brief-grid{display:block!important}
          .brief-card{display:block!important;margin:0 0 5mm!important;padding:5mm!important;border:1px solid #dcdcdc!important;border-radius:4mm!important;background:#fff!important;color:#111!important;break-inside:avoid-page;page-break-inside:avoid}
          .brief-card h2{font-size:11pt!important;color:#111!important;margin:0 0 3mm!important;break-after:avoid-page}
          .brief-fields{gap:2.5mm!important}
          .brief-field{padding:3mm!important;border:1px solid #e1e1e1!important;border-radius:2.5mm!important;break-inside:avoid-page}
          .brief-field small{font-size:7.5pt!important;color:#666!important;margin-bottom:1mm!important}
          .brief-field p,.brief-list li,.check,.asset-row span{font-size:8.5pt!important;line-height:1.42!important;color:#222!important}
          .brief-list{gap:2mm!important}.brief-list li{padding:3mm!important;border-color:#e1e1e1!important;border-radius:2.5mm!important;break-inside:avoid-page}
          .checklist{gap:2mm!important}.check{padding:3mm!important;border-color:#e1e1e1!important;border-radius:2.5mm!important;break-inside:avoid-page}.check:before{color:#5b50cb!important}
          .asset-list{gap:2mm!important}.asset-row{padding:3mm!important;border-color:#e1e1e1!important;border-radius:2.5mm!important;break-inside:avoid-page}.asset-row .button{display:none!important}
          a{color:#111!important;text-decoration:none!important}
        }
        @media(max-width:800px){.brief-grid,.brief-fields,.checklist{grid-template-columns:1fr}.brief-card.wide,.brief-field.wide{grid-column:auto}.brief-top{flex-direction:column}}
      `}</style>

      <header className="brief-top">
        <div><span className="eyebrow">PORTFOLIO PRODUCTION BRIEF</span><h1>{displayName}</h1><p>Generated from application {application.id}. Use this as the working handoff for portfolio design, copy, asset selection and creator review.</p></div>
        <div className="brief-actions"><a className="button secondary compact" href={`/app/applications/${application.id}`}>← Application</a><PrintBriefButton /></div>
      </header>

      <div className="brief-grid">
        <section className="brief-card"><h2>1. Creator positioning</h2><div className="brief-fields">
          <div className="brief-field"><small>Display name</small><p>{displayName}</p></div>
          <div className="brief-field"><small>Primary category</small><p>{value(application.primaryCategory)}</p></div>
          <div className="brief-field"><small>Location</small><p>{location}</p></div>
          <div className="brief-field"><small>Languages</small><p>{list(data.languages)}</p></div>
          <div className="brief-field wide"><small>Headline</small><p>{value(data.headline)}</p></div>
          <div className="brief-field wide"><small>Creator story</small><p>{value(data.bio)}</p></div>
        </div></section>

        <section className="brief-card"><h2>2. Visual direction</h2><div className="brief-fields">
          <div className="brief-field"><small>Preferred style</small><p>{value(data.preferredStyle)}</p></div>
          <div className="brief-field"><small>Preferred colours</small><p>{value(data.preferredColours)}</p></div>
          <div className="brief-field wide"><small>Secondary niches</small><p>{list(data.secondaryCategories)}</p></div>
          <div className="brief-field wide"><small>Additional direction</small><p>{value(data.additionalNotes)}</p></div>
        </div></section>

        <section className="brief-card wide"><h2>3. Content priorities</h2><ul className="brief-list">{priorities.map((item) => <li key={item}>{item}</li>)}</ul></section>

        <section className="brief-card"><h2>4. Social & audience proof</h2><div className="brief-fields">
          <div className="brief-field"><small>Instagram</small><p>{value(data.instagram)}</p></div>
          <div className="brief-field"><small>YouTube</small><p>{value(data.youtube)}</p></div>
          <div className="brief-field"><small>LinkedIn</small><p>{value(data.linkedin)}</p></div>
          <div className="brief-field"><small>Facebook</small><p>{value(data.facebook)}</p></div>
          <div className="brief-field"><small>Followers</small><p>{value(data.followers)}</p></div>
          <div className="brief-field"><small>Monthly reach</small><p>{value(data.monthlyReach)}</p></div>
          <div className="brief-field"><small>Typical views</small><p>{value(data.averageViews)}</p></div>
          <div className="brief-field"><small>Show metrics publicly</small><p>{yesNo(data.showAudienceMetrics)}</p></div>
        </div></section>

        <section className="brief-card"><h2>5. Commercial context & goals</h2><div className="brief-fields">
          <div className="brief-field wide"><small>Services</small><p>{list(data.services)}</p></div>
          <div className="brief-field wide"><small>12-month goals</small><p>{list(data.goals)}</p></div>
          <div className="brief-field wide"><small>Potential HPEDIT needs</small><p>{list(data.hpeditNeeds)}</p></div>
          <div className="brief-field wide"><small>Collaborations</small><p>{value(data.notableCollaborations)}</p></div>
          <div className="brief-field wide"><small>Achievements / press</small><p>{value(data.achievements)}</p></div>
        </div></section>

        <section className="brief-card"><h2>6. Privacy & publishing permissions</h2><div className="brief-fields">
          <div className="brief-field"><small>Portfolio content consent</small><p>{yesNo(data.consentPortfolio)}</p></div>
          <div className="brief-field"><small>Privacy acknowledged</small><p>{yesNo(data.consentPrivacy)}</p></div>
          <div className="brief-field"><small>Public email</small><p>{yesNo(data.publicEmail)}</p></div>
          <div className="brief-field"><small>Public WhatsApp</small><p>{yesNo(data.publicWhatsapp)}</p></div>
          <div className="brief-field"><small>Show rates</small><p>{yesNo(data.showRates)}</p></div>
          <div className="brief-field"><small>Marketing consent</small><p>{yesNo(data.consentMarketing)}</p></div>
        </div></section>

        <section className="brief-card"><h2>7. Submitted assets · {assets.length}</h2>{assets.length ? <div className="asset-list">{assets.map((asset) => <div className="asset-row" key={asset.id}><span>{assetSummary(asset.kind, asset.fileName, asset.size)}</span><a className="button secondary compact" href={`/api/creator-applications/assets/admin/${asset.id}`} target="_blank">Open</a></div>)}</div> : <p style={{color:'var(--muted)'}}>No files were attached to the application.</p>}</section>

        <section className="brief-card wide"><h2>8. Production checklist</h2><div className="checklist">
          <div className="check">Confirm creator name, headline and positioning</div><div className="check">Review every submitted asset for quality and rights</div>
          <div className="check">Choose portfolio visual direction</div><div className="check">Draft homepage / hero copy</div>
          <div className="check">Build work / collaboration proof sections</div><div className="check">Respect public contact and metrics permissions</div>
          <div className="check">Test mobile, tablet and desktop layouts</div><div className="check">Run accessibility and link checks</div>
          <div className="check">Set Public / Password / Hidden access mode</div><div className="check">Send creator-review URL before final publication</div>
        </div><p className="print-note">Use the Print / Save PDF button above when an offline handoff is needed.</p></section>
      </div>
    </div>
  );
}
