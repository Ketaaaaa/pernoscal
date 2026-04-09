import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ProductsTeaser } from "@/components/home/ProductsTeaser";
import { VisionBanner } from "@/components/home/VisionBanner";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { CTASection } from "@/components/home/CTASection";

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
      <ProductsTeaser />
      <VisionBanner />
      <PrinciplesSection />
      <ProjectsShowcase />
      <CTASection />
    </>
  );
}
