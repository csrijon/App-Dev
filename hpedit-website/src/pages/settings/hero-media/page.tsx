import type { CSSProperties } from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { DEFAULT_SITE_SETTINGS, getSiteSettings, saveSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

function validateHttpsUrl(value: string) {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

async function saveHomepageMedia(formData: FormData) {
  "use server";
  const current = await getSiteSettings();
  const heroImageUrl = String(formData.get("heroImageUrl") || "").trim();
  const heroVideoUrl = String(formData.get("heroVideoUrl") || "").trim();
  const ctaImageUrl = String(formData.get("ctaImageUrl") || "").trim();

  if (!validateHttpsUrl(heroImageUrl) || !validateHttpsUrl(heroVideoUrl) || !validateHttpsUrl(ctaImageUrl)) {
    redirect("/app/settings/hero-media?error=1");
  }

  await saveSiteSettings({
    ...current,
    heroImageUrl: heroImageUrl || DEFAULT_SITE_SETTINGS.heroImageUrl,
    heroVideoUrl,
    ctaImageUrl: ctaImageUrl || DEFAULT_SITE_SETTINGS.ctaImageUrl,
  });
  revalidatePath("/");
  revalidatePath("/app/settings");
  revalidatePath("/app/settings/hero-media");
  redirect("/app/settings/hero-media?saved=1");
}

async function restoreMediaDefaults() {
  "use server";
  const current = await getSiteSettings();
  await saveSiteSettings({
    ...current,
    heroImageUrl: DEFAULT_SITE_SETTINGS.heroImageUrl,
    heroVideoUrl: "",
    ctaImageUrl: DEFAULT_SITE_SETTINGS.ctaImageUrl,
  });
  revalidatePath("/");
  revalidatePath("/app/settings");
  revalidatePath("/app/settings/hero-media");
  redirect("/app/settings/hero-media?defaults=1");
}

export default async function HeroMediaSettingsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const site = await getSiteSettings();

  return (
    <div className="workspace-page">
      <style>{`
        .media-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:16px}.media-form{display:grid;gap:13px}.media-form label{display:grid;gap:7px;color:var(--muted);font-size:.82rem}.media-form input{width:100%;background:var(--surface-2);border:1px solid var(--line);border-radius:13px;color:var(--text);padding:12px 13px;outline:none;font:inherit}.preview-stack{display:grid;gap:14px}.media-preview{min-height:260px;border-radius:22px;border:1px solid var(--line);position:relative;overflow:hidden;background:#151821 center/cover no-repeat}.media-preview.hero{background-image:linear-gradient(90deg,rgba(255,255,255,.92),rgba(255,255,255,.12)),var(--preview)}.media-preview.cta{min-height:170px;background-image:linear-gradient(rgba(7,12,15,.45),rgba(7,12,15,.45)),var(--preview)}.media-preview:after{content:attr(data-label);position:absolute;left:14px;bottom:14px;padding:8px 10px;border-radius:999px;background:rgba(8,10,15,.78);color:#fff;font-size:.67rem;font-weight:850;letter-spacing:.08em}.media-note{padding:14px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.025);color:var(--muted);font-size:.82rem;line-height:1.55}.notice{margin:0 0 14px;padding:13px 16px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.035);color:var(--muted)}.notice.success{border-color:rgba(39,215,167,.24);background:rgba(39,215,167,.07);color:#8ef2d0}.notice.error{border-color:rgba(255,107,122,.25);background:rgba(255,107,122,.07);color:#ff9eaa}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}.source-state{display:flex;gap:8px;flex-wrap:wrap}.source-state span{padding:6px 9px;border-radius:999px;border:1px solid var(--line);font-size:.72rem;color:var(--muted)}@media(max-width:900px){.media-grid{grid-template-columns:1fr}.media-preview{min-height:220px}}
      `}</style>

      <header className="page-head"><div><span className="eyebrow">HOMEPAGE MEDIA</span><h1>Hero, video & CTA imagery</h1><p>Control the main public visuals without editing homepage code. Blank image fields safely fall back to the approved defaults.</p></div><Link className="button secondary" href="/app/settings">← Settings</Link></header>

      {params.saved ? <div className="notice success">Homepage media saved as a new reversible settings revision.</div> : null}
      {params.defaults ? <div className="notice success">Homepage media defaults restored.</div> : null}
      {params.error ? <div className="notice error">Use HTTPS URLs for homepage media, or leave the optional video field blank.</div> : null}

      <section className="media-grid">
        <article className="panel">
          <div className="panel-head"><div><span className="kicker">MEDIA SOURCES</span><h2>Homepage visual controls</h2></div><div className="source-state"><span>Still image required</span><span>Video optional</span></div></div>
          <form className="media-form" action={saveHomepageMedia}>
            <label><span>Hero still image URL</span><input name="heroImageUrl" type="url" defaultValue={site.heroImageUrl} placeholder="https://.../creator-hero.jpg" /></label>
            <label><span>Optional hero video URL</span><input name="heroVideoUrl" type="url" defaultValue={site.heroVideoUrl} placeholder="https://.../creator-hero.mp4" /></label>
            <label><span>Bottom CTA panoramic image URL</span><input name="ctaImageUrl" type="url" defaultValue={site.ctaImageUrl} placeholder="https://.../creator-panorama.jpg" /></label>
            <div className="media-note">The hero still is always retained as the visual fallback/poster. When you later provide a video, use a muted, loop-friendly MP4/WebM served over HTTPS. The CTA image remains independent from the hero, so both sections can be art-directed separately.</div>
            <div className="actions"><button className="button primary" type="submit">Save homepage media</button></div>
          </form>
          <div className="actions" style={{ marginTop: 10 }}><form action={restoreMediaDefaults}><button className="button secondary" type="submit">Restore approved media defaults</button></form></div>
        </article>

        <div className="preview-stack">
          <article className="panel"><div className="panel-head"><div><span className="kicker">HERO PREVIEW</span><h2>Current still</h2></div><span>{site.heroVideoUrl ? "Video configured" : "Still active"}</span></div><div className="media-preview hero" data-label="HERO STILL" style={{ "--preview": `url(${site.heroImageUrl})` } as CSSProperties} role="img" aria-label="Current homepage hero still preview" /></article>
          <article className="panel"><div className="panel-head"><div><span className="kicker">CTA PREVIEW</span><h2>Current panorama</h2></div><span>Public homepage</span></div><div className="media-preview cta" data-label="BOTTOM CTA" style={{ "--preview": `url(${site.ctaImageUrl})` } as CSSProperties} role="img" aria-label="Current bottom call-to-action background preview" /></article>
        </div>
      </section>
    </div>
  );
}
