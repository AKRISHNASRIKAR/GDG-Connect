import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Megaphone, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Connect, Collaborate, Contribute
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  GDG Call Hub is the central place for Google Developer Groups
                  to find speakers and volunteers for their events.
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
              <div className="w-full h-full bg-primary rounded-xl p-8 flex items-center justify-center">
                <Megaphone className="w-48 h-48 text-primary-foreground/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Why GDG Call Hub?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We streamline the process of organizing and participating in GDG
                events.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="grid gap-1">
                  <CardTitle>For Organizers</CardTitle>
                </div>
                <Users className="w-8 h-8 ml-auto text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Easily create and manage calls for speakers and volunteers.
                  Reach a wide audience of talented individuals ready to
                  contribute.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="grid gap-1">
                  <CardTitle>For Speakers</CardTitle>
                </div>
                <Megaphone className="w-8 h-8 ml-auto text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find speaking opportunities at GDG events worldwide. Share
                  your knowledge and grow your personal brand in the tech
                  community.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="grid gap-1">
                  <CardTitle>AI-Powered</CardTitle>
                </div>
                <Code className="w-8 h-8 ml-auto text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Leverage Google AI to enhance your call descriptions, suggest
                  relevant tags, and find the perfect match for your event
                  needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
