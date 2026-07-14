import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { business } from "@/config/business";
import { serviceAreaCityNames } from "@/config/service-areas";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-black text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,106,19,0.18)_0%,rgba(11,12,13,0)_55%)]"
      />
      <Container className="relative flex flex-col gap-10 py-16 sm:py-24 lg:flex-row lg:items-center lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            {business.baseLocation} &middot; Mobile Junk Removal
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Junk gone. Space back. No hassle.
          </h1>
          <p className="mt-6 text-lg text-white/80 sm:text-xl">
            AA Dump Removal hauls away furniture, appliances, and debris for homes and
            businesses across Burnsville and the surrounding communities. Request a
            quote and we&apos;ll handle the loading, hauling, and disposal.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" variant="primary" className="text-lg">
              Get a Free Quote
            </Button>
            <CallButton className="text-lg" />
          </div>
          <p className="mt-6 text-sm text-white/60">
            Serving {serviceAreaCityNames.slice(0, 4).join(", ")}, and more.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="aspect-[4/3] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-brand-charcoal to-brand-black p-8 shadow-2xl">
            <div className="flex h-full flex-col justify-between">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-2 text-sm font-semibold text-brand-orange">
                <span className="h-2 w-2 rounded-full bg-brand-orange" />
                Mobile crews &middot; Local hauling
              </div>
              <div>
                <p className="text-2xl font-bold">One call.</p>
                <p className="text-2xl font-bold text-brand-orange">One load. Gone.</p>
                <p className="mt-3 text-sm text-white/60">
                  Residential and commercial pickups, scheduled around you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
