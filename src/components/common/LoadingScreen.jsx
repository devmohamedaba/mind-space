export default function LoadingScreen() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4 text-content-muted">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-mist border-t-primary" aria-hidden="true" />
        <span className="text-sm">جارٍ التحميل…</span>
      </div>
    </div>
  )
}
