
export function timeAgo(iso: string | number) {
  const t = typeof iso === 'number' ? iso : Date.parse(iso)
  const diff = Math.floor((Date.now() - t) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return new Date(t).toLocaleString()
}
