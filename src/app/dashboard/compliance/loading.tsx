export default function ComplianceLoading() {
  return (
    <div className="animate-in fade-in duration-200">
      <div className="mb-6">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}
