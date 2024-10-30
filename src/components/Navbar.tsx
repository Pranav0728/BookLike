"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Booklike
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#demo">Demo</NavLink>
          <Button variant="primary" size="sm" className="rounded-full px-6">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-16 right-6 bg-white shadow-md rounded-lg w-48 py-2 flex flex-col space-y-2 md:hidden transition duration-200 ease-in-out">
            <NavLink href="#features" onClick={() => setIsMenuOpen(false)}>
              Features
            </NavLink>
            <NavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </NavLink>
            <NavLink href="#demo" onClick={() => setIsMenuOpen(false)}>
              Demo
            </NavLink>
            <Button
              variant="primary"
              size="sm"
              className="rounded-full mx-4 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

// NavLink Component
function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-gray-700 hover:text-primary transition-colors">
      {children}
    </Link>
  );
}
