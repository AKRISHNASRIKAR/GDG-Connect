import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Megaphone, Users } from "lucide-react";

const LandingCard = () => {
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            Key Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Why GDG Call Connect?
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
              Easily create and manage calls for speakers and volunteers. Reach
              a wide audience of talented individuals ready to contribute.
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
              Find speaking opportunities at GDG events worldwide. Share your
              knowledge and grow your personal brand in the tech community.
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
              relevant tags, and find the perfect match for your event needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingCard;
