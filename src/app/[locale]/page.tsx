import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { VisionBanner } from "@/components/home/VisionBanner";
import { ProductRows } from "@/components/home/ProductRows";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { SelectionGuide } from "@/components/home/SelectionGuide";
import { FAQ } from "@/components/home/FAQ";
import { Inquiry } from "@/components/home/Inquiry";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);

  return (
    <>
      <HeroSection />
      <AboutTeaser />
      <VisionBanner />
      <ProductRows />
      <WhyChooseUs />
      <SelectionGuide />
      <FAQ />
      <Inquiry />
    </>
  );
}
