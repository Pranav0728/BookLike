// components/Footer.tsx
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link href="/" className="text-2xl font-bold text-primary">
            Booklike
          </Link>
          <p className="text-gray-400 text-sm text-center md:text-left">
            Your digital notebook, reimagined.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
            <FooterLink href="#features">Features</FooterLink>
            <FooterLink href="#pricing">Pricing</FooterLink>
            <FooterLink href="#demo">Demo</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </div>
          <div className="mt-5 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Booklike. All rights reserved.
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <SocialIcon
            href="https://facebook.com"
            icon={<FacebookIcon className="w-5 h-5" />}
          />
          <SocialIcon
            href="https://twitter.com"
            icon={<TwitterIcon className="w-5 h-5" />}
          />
          <SocialIcon
            href="https://instagram.com"
            icon={<InstagramIcon className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Footer Bottom */}
    </footer>
  );
}

// FooterLink Component
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="">
      {children}
    </Link>
  );
}

// SocialIcon Component
function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className=" transition-colors"
    >
      {icon}
    </Link>
  );
}
