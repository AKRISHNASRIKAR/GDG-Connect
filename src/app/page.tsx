import LandingCard from "@/components/Landing/LandingCard";
import LandingHeader from "@/components/Landing/LandingHeader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />

      <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen">
        <LandingCard />
      </section>
    </div>
  );
}
