import Link from "next/link";
import { business, hasPhone } from "@/config/business";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-black/10 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden">
      {hasPhone && (
        <a
          href={`tel:${business.phoneHref}`}
          className="flex-1 rounded-md border-2 border-brand-black px-4 py-3 text-center text-sm font-semibold text-brand-black"
        >
          Call Now
        </a>
      )}
      <Link
        href="/quote"
        className={`rounded-md bg-brand-orange px-4 py-3 text-center text-sm font-semibold text-white ${
          hasPhone ? "flex-1" : "w-full"
        }`}
      >
        Get a Free Quote
      </Link>
    </div>
  );
}
