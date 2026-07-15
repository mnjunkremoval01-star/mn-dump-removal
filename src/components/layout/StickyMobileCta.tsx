import Link from "next/link";
import { business, hasPhone } from "@/config/business";

export function StickyMobileCta() {
  return (
    <div className="glass-panel fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] lg:hidden">
      {hasPhone && (
        <a
          href={`tel:${business.phoneHref}`}
          className="flex-1 rounded-xl bg-brand-orange px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Call Now
        </a>
      )}
      <Link
        href="/quote"
        className={`rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white ${
          hasPhone ? "flex-1" : "w-full"
        }`}
      >
        Request a Quote
      </Link>
    </div>
  );
}
