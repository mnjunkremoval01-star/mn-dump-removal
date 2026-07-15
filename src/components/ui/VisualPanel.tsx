import Image from "next/image";
import { ReactNode } from "react";

/**
 * Image slot for service/gallery visuals. Pass `src` once real photography
 * (or generated imagery) is available and it renders a real photo; until
 * then it falls back to a layered gradient + icon treatment so the layout
 * doesn't depend on placeholder stock photos.
 */
export function VisualPanel({
  src,
  alt,
  icon,
  label,
  className = "",
}: {
  src?: string;
  alt: string;
  icon: ReactNode;
  label: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-brand-charcoal ${className}`}
      role="img"
      aria-label={alt}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(255,106,19,0.35),transparent_55%),radial-gradient(100%_100%_at_100%_100%,rgba(255,106,19,0.18),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-brand-orange">
          {icon}
        </div>
        <p className="text-sm font-semibold text-white/80">{label}</p>
      </div>
    </div>
  );
}
