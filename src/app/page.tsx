import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Gallery } from "@/components/home/Gallery";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ItemsGuide } from "@/components/home/ItemsGuide";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServiceAreasPreview } from "@/components/home/ServiceAreasPreview";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

const title = "Junk Removal in Burnsville, MN";
const description =
  "MN Junk Removal provides residential and commercial junk removal, cleanouts, furniture hauling, appliance removal, and debris removal in Burnsville and nearby Minnesota communities. Call (612) 267-9701 for an estimate.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title: `${title} | MN Junk Removal`, description, url: "/" },
};

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <Gallery />
      <ProcessSteps />
      <ItemsGuide />
      <WhyChooseUs />
      <ServiceAreasPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
