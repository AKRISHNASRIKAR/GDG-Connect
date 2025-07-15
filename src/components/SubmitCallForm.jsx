"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import { getSuggestions } from "@/app/submit-call/actions";
import { addCall } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export default function SubmitCallForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      type: "Speaker",
      description: "",
      format: "Online",
      location: "",
      tags: "",
      contactEmail: "",
      deadline: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    
    try {
      // Format the data to match your existing structure
      const callData = {
        eventName: data.title,
        callType: data.type.toLowerCase(),
        description: data.description,
        format: data.format,
        location: data.location,
        tags: data.tags,
        contactEmail: data.contactEmail,
        deadline: data.deadline || null,
      };

      const result = await addCall(callData);

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your call has been submitted successfully.",
        });
        
        // Reset form
        form.reset();
        
        // Redirect to calls page
        router.push("/calls");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit call.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    const description = form.getValues("description");

    if (!description || description.length < 20) {
      toast({
        title: "Description too short",
        description:
          "Enter at least 20 characters before generating suggestions.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await getSuggestions(description);

      if (result?.suggestions) {
        form.setValue("description", result.suggestions);
        if (result.callType) {
          form.setValue("type", result.callType);
        }
        if (result.tags) {
          form.setValue("tags", result.tags);
        }
        form.trigger(["description", "type", "tags"]);

        toast({
          title: "AI Suggestions Applied!",
          description: "Fields have been updated with AI suggestions.",
        });
      } else {
        toast({
          title: "Error",
          description: result?.error || "Failed to fetch suggestions.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., DevFest 2025 Speaker Call"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Speaker">Speaker</SelectItem>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <div className="relative space-y-2">
                        <Textarea
                          rows={6}
                          placeholder="Tell us what you're looking for..."
                          {...field}
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleGenerate}
                          disabled={loading}
                          className="absolute bottom-2 right-2"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          {loading ? "Generating..." : "Get AI Suggestion"}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City or 'Online'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your-email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags / Tech Stack</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., React, Firebase, AI"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Call"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}