import { cn } from "@/core/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-border", className)}
      {...props}
    />
  );
}

export { Skeleton };
