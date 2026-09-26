import { About } from "../components/About";
import { CategoryNav } from "../components/CategoryNav";
import { Hero } from "../components/Hero";
import { Inquire } from "../components/Inquire";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WorkSections } from "../components/WorkSections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <CategoryNav />
        <WorkSections />
        <Inquire />
      </main>
      <SiteFooter />
    </>
  );
}
