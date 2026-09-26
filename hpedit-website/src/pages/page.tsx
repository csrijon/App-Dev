import Link from "next/link";
import { LiveOverview } from "@/components/LiveOverview";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="workspace-page">
      <header className="page-head">
        <div>
          <span className="eyebrow">OPERATIONS OVERVIEW</span>
          <h1>Creator portfolio control centre</h1>
          <p>Live production data for creator applications, hosted portfolios, engagement and administrative activity.</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="button primary compact" href="/app/portfolios">Manage portfolios</Link>
          <Link className="button secondary compact" href="/app/applications">Review applications</Link>
        </div>
      </header>
      <LiveOverview />
    </div>
  );
}
