import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ItemsGuide } from "@/components/home/ItemsGuide";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServiceAreasPreview } from "@/components/home/ServiceAreasPreview";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export const metadata: Metadata = {
  title: "Junk Removal & Dump Hauling in Burnsville, MN",
  description:
    "AA Dump Removal offers mobile junk removal, furniture and appliance hauling, and property cleanouts for Burnsville, MN and surrounding communities. Request a free quote.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <ServicesOverview />
      <ProcessSteps />
      <ItemsGuide />
      <WhyChooseUs />
      <ServiceAreasPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
