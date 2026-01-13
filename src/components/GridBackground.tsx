import { cn } from "@/lib/utils";

const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid Pattern - visible across entire page */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]",
        )}
      />
    </div>
  );
};

export default GridBackground;
