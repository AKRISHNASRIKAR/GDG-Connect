import Image from "next/image";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const LandingHeader = () => {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Connect, Collaborate, Contribute
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                GDG Connect is the central place for Google Developer Groups to
                find speakers and volunteers for their events.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/calls">View Open Calls</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/submit-call">Post a New Call</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-full h-full shadow-blue-100 shadow-2xs border-t-1 rounded-xl p-8 flex items-center justify-center">
              <Image
                src="/gdg-icon.svg"
                alt="GDG Icon"
                width={192}
                height={192}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHeader;
