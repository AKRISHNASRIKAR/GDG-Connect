import Link from "next/link";
import { Megaphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Megaphone className="h-6 w-6 text-primary hidden sm:block" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Krishna
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} GDG Call Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
