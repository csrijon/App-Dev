import { notFound } from "next/navigation";
import { getApplicationForAdmin } from "@/lib/creator-application-admin";
import { getPortfolioProductionLink } from "@/lib/portfolio-production-link";
import { getPortfolioQa } from "@/lib/portfolio-qa";
import { creatorApprovalIsCurrent, getLatestCreatorPortfolioReview } from "@/lib/creator-portfolio-review";
import { CopyTextButton } from "@/components/CopyTextButton";
import { ConfirmReviewDecisionButton } from "@/components/ConfirmReviewDecisionButton";

export const dynamic = "force-dynamic";

function displayName(fullName: string, creatorName: string | null) {
  return creatorName?.trim() || fullName;
}

export default async function ReviewPackPage({ params, searchParams }: { params: Promise<{ applicationId: string }>; searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const { applicationId } = await params;
  const query = await searchParams;
  const application = await getApplicationForAdmin(applicationId);
  if (!application) notFound();

  const link = await getPortfolioProductionLink(applicationId);
  const [qa, latestReview, approvalCurrent] = link ? await Promise.all([
    getPortfolioQa(link.slug),
    getLatestCreatorPortfolioReview(applicationId),
    creatorApprovalIsCurrent(applicationId),
  ]) : [null, null, false] as const;
  const name = displayName(application.fullName, application.creatorName);
  const url = link ? `https://influencers.hpedit.com/${link.slug}` : "";
  const subject = `Your HPEDIT creator portfolio is ready for review`;
  const passwordNote = link?.access === "PASSWORD"
    ? "The portfolio is password-protected. Please share the current password separately; the CMS stores only a secure hash and cannot display the plaintext password."
    : "";
  const message = link ? `Hi ${name},\n\nYour HPEDIT creator portfolio is ready for your review.\n\nReview it here:\n${url}\n\nPlease check your name, bio, images, links, contact details, collaborations/achievements and how the portfolio looks on your phone. If you would like any corrections, send them back to us in one message and we will update the portfolio.\n\n${link.access === "PASSWORD" ? "This review link is currently password-protected. I will share the password separately.\n\n" : ""}Nothing will be treated as finally approved until we receive your review/confirmation.\n\nHPEDIT Creator Portfolios\ninfo@hpedit.com` : "Link a hosted portfolio to this application before creating a creator review message.";

  return (
    <div className="workspace-page review-pack-page">
      <style>{`
        .review-pack-grid{display:grid;grid-template-columns:1fr .8fr;gap:14px}.review-card{border:1px solid var(--line);border-radius:17px;background:rgba(255,255,255,.02);padding:17px}.review-card h2{margin:0 0 12px;font-size:1.05rem}.review-card p{color:var(--muted);line-height:1.6}.review-message{white-space:pre-wrap;padding:14px;border:1px solid var(--line);border-radius:13px;background:var(--surface-2);color:var(--muted);line-height:1.6;font-size:.86rem}.review-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.review-facts{display:grid;gap:8px}.review-fact{padding:11px 12px;border:1px solid var(--line);border-radius:11px}.review-fact small{display:block;color:var(--dim);margin-bottom:4px}.review-fact strong{font-size:.9rem}.qa-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}.qa-mini div{padding:11px;border:1px solid var(--line);border-radius:11px}.qa-mini b{display:block;font-size:1.3rem}.qa-mini span{font-size:.72rem;color:var(--dim)}.warning,.success,.error{padding:12px 13px;border-radius:12px;font-size:.82rem;line-height:1.5;margin-bottom:14px}.warning{border:1px solid rgba(231,181,77,.28);background:rgba(231,181,77,.08);color:#f0cc78}.success{border:1px solid rgba(39,215,167,.25);background:rgba(39,215,167,.07);color:#8ef2d0}.error{border:1px solid rgba(255,107,122,.25);background:rgba(255,107,122,.07);color:#ff9eaa}.decision-form{display:grid;gap:10px;margin-top:14px}.decision-form textarea{width:100%;min-height:94px;background:var(--surface-2);border:1px solid var(--line);border-radius:11px;color:var(--text);padding:11px;font:inherit;resize:vertical}.decision-help{margin:-2px 0 0!important;font-size:.74rem;line-height:1.45!important;color:var(--dim)!important}.decision-actions{display:flex;gap:8px;flex-wrap:wrap}.review-history{margin-top:12px;padding:12px;border:1px solid var(--line);border-radius:12px}.review-history small{color:var(--dim);display:block;margin-bottom:4px}.review-history p{margin:6px 0 0;white-space:pre-wrap;font-size:.82rem}@media(max-width:850px){.review-pack-grid{grid-template-columns:1fr}}
      `}</style>

      <header className="page-head"><div><span className="eyebrow">CREATOR REVIEW HANDOFF</span><h1>{name}</h1><p>Prepare the linked portfolio, QA result and creator-facing review message from one place.</p></div><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><a className="button secondary compact" href="/app/production">← Production</a><a className="button secondary compact" href={`/app/applications/${application.id}`}>Application</a></div></header>

      {query.decisionSaved === "approved" ? <div className="success">Creator approval recorded for the current portfolio revision.</div> : null}
      {query.decisionSaved === "changes_requested" ? <div className="warning">Creator-requested changes recorded. The portfolio must be updated and approved again before publication.</div> : null}
      {query.decisionError === "note-required" ? <div className="error">Summarise the creator&apos;s requested changes before recording a Changes Requested decision.</div> : query.decisionError ? <div className="error">The creator review decision could not be saved. Confirm a hosted portfolio is still linked and try again.</div> : null}
      {!link ? <div className="error">No hosted portfolio is linked to this application yet. Link one from the Production Queue first.</div> : null}
      {passwordNote ? <div className="warning">{passwordNote}</div> : null}
      {approvalCurrent ? <div className="success">Publication approval is current for this exact portfolio revision.</div> : latestReview?.decision === "APPROVED" ? <div className="warning">The creator previously approved the portfolio, but the hosted portfolio changed afterward. Fresh approval is required for the current revision.</div> : null}

      <div className="review-pack-grid">
        <section className="review-card"><h2>Creator review message</h2><div className="review-message">{message}</div><div className="review-actions"><CopyTextButton text={message} label="Copy message"/><CopyTextButton text={subject} label="Copy subject"/>{link ? <a className="button secondary compact" href={`mailto:${application.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}>Open email client</a> : null}</div>

        {link ? <><h2 style={{marginTop:22}}>Record creator response</h2><form className="decision-form" action="/api/creator-applications/review-decision" method="post"><input type="hidden" name="applicationId" value={application.id}/><textarea name="note" maxLength={4000} placeholder="Paste or summarise the creator's confirmation or requested changes…"/><p className="decision-help">Optional for approval. Required when recording Changes Requested. Maximum 4,000 characters.</p><div className="decision-actions"><ConfirmReviewDecisionButton className="button primary compact" decision="APPROVED">Record creator approval</ConfirmReviewDecisionButton><ConfirmReviewDecisionButton className="button secondary compact" decision="CHANGES_REQUESTED">Record changes requested</ConfirmReviewDecisionButton></div></form>{latestReview ? <div className="review-history"><small>Latest recorded creator decision · {latestReview.createdAt.toLocaleString("en-IN")}</small><strong>{latestReview.decision === "APPROVED" ? "Approved" : "Changes requested"}{approvalCurrent ? " · current revision" : " · not current for publication"}</strong>{latestReview.note ? <p>{latestReview.note}</p> : null}</div> : null}</> : null}</section>

        <aside className="review-card"><h2>Review facts</h2><div className="review-facts"><div className="review-fact"><small>Creator email</small><strong>{application.email}</strong></div><div className="review-fact"><small>Application status</small><strong>{application.status}</strong></div>{link ? <><div className="review-fact"><small>Portfolio</small><strong>@{link.slug}</strong></div><div className="review-fact"><small>Access</small><strong>{link.access}</strong></div><div className="review-fact"><small>Creator approval</small><strong>{approvalCurrent ? "Current" : latestReview ? "Needs review / refresh" : "Not recorded"}</strong></div><div className="review-actions"><a className="button secondary compact" href={url} target="_blank">Open portfolio</a><CopyTextButton text={url} label="Copy URL"/><a className="button secondary compact" href={`/app/portfolios/${encodeURIComponent(link.slug)}/qa`}>Open QA</a></div></> : null}</div>

        {qa ? <><h2 style={{marginTop:18}}>QA summary</h2><span className={`status ${qa.status === "PASS" ? "active" : qa.status === "WARNING" ? "review" : "planning"}`}>{qa.status}</span><div className="qa-mini"><div><b>{qa.checks.filter((check)=>check.level === "PASS").length}</b><span>Passed</span></div><div><b>{qa.warnings}</b><span>Warnings</span></div><div><b>{qa.failed}</b><span>Failures</span></div></div></> : null}</aside>
      </div>
    </div>
  );
}
