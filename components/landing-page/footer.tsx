import Link from "next/link";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
  InstagramIcon,
} from "lucide-react";
import Logo from "../assets/logo";
import Image from "next/image";

const MainFooter = () => {
  return (
    <footer className="bg-background border-t relative overflow-hidden px-4 md:px-10">
      <Image
        src="/utils/circle.svg"
        alt="Circle Decoration"
        width={400}
        height={400}
        draggable={false}
        className="absolute top-20 -z-0 left-40"
      />

      <Image
        src="/utils/circle.svg"
        alt="Circle Decoration"
        width={400}
        height={400}
        draggable={false}
        className="absolute -top-36 -z-0 right-40"
      />

      <div className="mx-auto py-8 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          <nav className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/menus"
              className="text-gray-600 hover:text-foreground transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/plans"
              className="text-gray-600 hover:text-foreground transition-colors"
            >
              Plans
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MailIcon className="w-4 h-4" />
              <span>contact@seacatering.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <PhoneIcon className="w-4 h-4" />
              <span>+62 8123456789</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPinIcon className="w-4 h-4" />
              <span>Jl. Merdeka No. 123, Jakarta, Indonesia</span>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <Link
                href="https://github.com/jevvonn/sea-catering-fe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-foreground transition-colors"
                aria-label="Follow us on GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/j_vmcb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 border-t text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SEA Catering. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;
