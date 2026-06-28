function SkeletonCard({ height = 120 }: { height?: number }) {
  return (
    <div className="card animate-pulse" style={{ height }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }} />
        <div className="w-24 h-4 rounded" style={{ backgroundColor: 'var(--color-bg-surface-light)' }} />
      </div>
      <div className="w-20 h-8 rounded mb-2" style={{ backgroundColor: 'var(--color-bg-surface-light)' }} />
      <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-bg-surface-light)' }} />
    </div>
  )
}

function SkeletonChart({ height = 280 }: { height?: number }) {
  return (
    <div className="card animate-pulse" style={{ height }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded" style={{ backgroundColor: 'var(--color-bg-surface-light)' }} />
        <div className="w-32 h-5 rounded" style={{ backgroundColor: 'var(--color-bg-surface-light)' }} />
      </div>
      <div className="w-full rounded-lg" style={{ height: height - 60, backgroundColor: 'var(--color-bg-surface-light)' }} />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} height={120} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SkeletonChart height={320} />
        </div>
        <SkeletonChart height={320} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SkeletonChart height={280} />
        <SkeletonChart height={280} />
      </div>
    </div>
  )
}

export { SkeletonCard, SkeletonChart }
