"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

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

import AIChatBox from "@/components/AIChatBox";
import { getSuggestions } from "./actions"; // ✅ Genkit AI flow
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
    },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
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
    const result = await getSuggestions(description);
    setLoading(false);

    if (result?.suggestions) {
      form.setValue("description", result.suggestions);
      form.setValue("type", result.callType);
      form.setValue("tags", result.tags);
      form.trigger(["description", "type", "tags"]);

      toast({
        title: "AI Suggestions Applied!",
        description: "Fields have been updated with AI suggestions.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to fetch suggestions.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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

                <Link href="/calls">
                  <Button type="submit" className="w-full">
                    Submit Call
                  </Button>
                </Link>
              </form>
            </Form>
          </div>

          {/* AI Chatbox Panel */}
          <div className="w-full md:w-1/3">
            <AIChatBox
              onUseResult={(text) => {
                form.setValue("description", text);
                form.trigger("description");
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
