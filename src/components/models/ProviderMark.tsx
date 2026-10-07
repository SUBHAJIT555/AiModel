export function ProviderMark({ name }: { name: string }) {
  const mark = name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
  return (
    <span className="inline-flex size-7 items-center justify-center rounded-[8px] border border-border bg-background font-mono text-[10px] text-muted">
      {mark}
    </span>
  );
}
