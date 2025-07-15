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
import {
  Users,
  Mic,
  Mail,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

import { getAllCalls } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

export default function ListingsPage() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const result = await getAllCalls();
      if (Array.isArray(result)) { // Assuming getAllCalls now returns an array of calls
        setCalls(result);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch calls.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching calls:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    const date =
      dateString instanceof Date ? dateString : new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const deadlineDate =
      deadline instanceof Date ? deadline : new Date(deadline);
    return deadlineDate < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading calls...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-black">All Listings</h1>
          <div className="flex gap-2">
            <Button onClick={fetchCalls} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button asChild>
              <Link href="/submit-call">Submit New Call</Link>
            </Button>
          </div>
        </div>

        {calls.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No calls posted yet.</p>
              <p className="text-sm">Be the first to submit a call!</p>
            </div>
            <Button asChild>
              <Link href="/submit-call">Submit First Call</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {calls.map((call) => (
              <Card key={call.id} className="hover:shadow-md hover:scale-[1.01] transition-all">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl text-black">
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
                        <div
                          className={`flex items-center text-sm px-3 py-1 rounded-full ${
                            isDeadlinePassed(call.deadline)
                              ? "bg-red-50 text-red-700"
                              : "bg-gray-100 text-black"
                          }`}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          {isDeadlinePassed(call.deadline)
                            ? "Expired: "
                            : "Deadline: "}
                          {formatDate(call.deadline)}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800 mb-4 leading-relaxed">
                      {call.description}
                    </p>

                    {call.tags && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {call.tags
                            .split(",")
                            .map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-1" />
                          Contact: {call.contactEmail}
                        </div>
                        {call.location && (
                          <div className="text-sm text-gray-600">
                            📍 {call.location}
                          </div>
                        )}
                      </div>
                     <Button size="sm" asChild>
                       <Link href="/thank-you">Apply</Link>
                     </Button>

                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
