export function LogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden>
      <rect x="1" y="1" width="8" height="8" fill="var(--foreground)" />
      <rect x="11" y="1" width="8" height="8" fill="var(--border-strong)" />
      <rect x="1" y="11" width="8" height="8" fill="var(--border-strong)" />
      <rect x="11" y="11" width="8" height="8" fill="var(--primary)" />
    </svg>
  );
}
