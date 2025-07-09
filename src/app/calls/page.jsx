"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Mic, Mail, Calendar } from "lucide-react";
import Link from "next/link";

import { mockCalls } from "@/app/lib/mock-data";

export default function ListingsPage() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    // Simulate async fetch
    setTimeout(() => {
      setCalls(mockCalls);
    }, 300); // optional delay
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Listings</h1>

        <div className="grid gap-6">
          {calls.map((call) => (
            <Card key={call.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">
                        {call.eventName}
                      </CardTitle>
                      <Badge
                        variant={
                          call.callType === "volunteer"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {call.callType === "volunteer" ? (
                          <>
                            <Users className="w-3 h-3 mr-1" />
                            Volunteer
                          </>
                        ) : (
                          <>
                            <Mic className="w-3 h-3 mr-1" />
                            Speaker
                          </>
                        )}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500">
                      Posted on {formatDate(call.postedDate)}
                    </CardDescription>
                  </div>
                  {call.deadline && (
                    <div className="flex items-center text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 mr-1" />
                      Deadline: {formatDate(call.deadline)}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {call.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-1" />
                    Contact: {call.contactEmail}
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/thank-you">Apply Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
