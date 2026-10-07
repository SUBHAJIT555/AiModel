export function DemoFrame({ label }: { label: string }) {
  return (
    <div className="border border-border bg-surface p-4 font-mono text-xs text-muted">
      Demo slot · {label}
    </div>
  );
}
