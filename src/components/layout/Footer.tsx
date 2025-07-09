import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 px-2 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/gdg-icon.svg" alt="GDG Icon" className="w-6 h-6" />
            <span className="font-bold">GDG Connect</span>
          </Link>
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
