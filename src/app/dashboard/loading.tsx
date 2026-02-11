export default function DashboardLoading() {
  return (
    <div className="animate-in fade-in duration-200">
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <div className="h-24 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="h-48 animate-pulse rounded bg-muted" />
        </div>
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="h-48 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
