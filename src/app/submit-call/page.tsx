import SubmitCallForm from "@/components/SubmitCallForm";

export default function SubmitCallPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Create a New Call
        </h1>
        <p className="text-lg text-muted-foreground">
          Fill out the form below to find speakers or volunteers for your next
          GDG event.
        </p>
      </div>
      <SubmitCallForm />
    </div>
  );
}
