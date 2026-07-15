import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { VisualPanel } from "@/components/ui/VisualPanel";
import { TruckIcon } from "@/components/ui/icons";
import { business } from "@/config/business";
import { serviceAreaCityNames } from "@/config/service-areas";

export function Hero() {
  return (
    <section className="relative text-white">
      <Container className="relative flex flex-col gap-10 pb-8 pt-10 sm:pb-12 sm:pt-14 lg:flex-row lg:items-center lg:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            {business.baseLocation} &middot; Mobile Junk Removal
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Junk gone. Space back. No hassle.
          </h1>
          <p className="mt-6 text-lg text-white/75 sm:text-xl">
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
          <p className="mt-6 text-sm text-white/55">
            Serving {serviceAreaCityNames.slice(0, 4).join(", ")}, and more.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <VisualPanel
            alt="Mobile hauling crew loading a dump trailer"
            icon={<TruckIcon />}
            label="Mobile crews & local hauling"
            className="aspect-[4/3] w-full shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
