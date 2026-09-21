import { PROJECT_STATUSES, type ProjectStatus } from "@/lib/projects";

const tones = {
  green: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300",
  blue: "bg-sky-500/15 text-sky-700 ring-sky-500/30 dark:text-sky-300",
  gray: "bg-zinc-500/15 text-zinc-700 ring-zinc-500/30 dark:text-zinc-300",
  amber: "bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-300",
};

export function StatusBadge({ status, className = "" }: { status?: ProjectStatus; className?: string }) {
  if (!status) return null;
  const { label, tone } = PROJECT_STATUSES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset backdrop-blur ${tones[tone]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
