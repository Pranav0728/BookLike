"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, BookIcon, CloudIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/books');
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b p-4 mt-10">
        <section className="text-center mt-16 mb-10">
          <h1 className="text-5xl font-bold mb-4">
            Booklike: Your Digital Notebook, Reimagined
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Capture ideas, notes, and moments with a digital experience that feels
            just like a real book. Personalize every detail, from fonts to ink
            colors, and flip through pages with ease.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="rounded-full px-8 py-3" 
            onClick={handleGetStarted}
          >
            Get Started <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <FeatureCard
            icon={<PencilIcon className="w-8 h-8 text-primary" />}
            title="Customizable Themes"
            description="Choose from a range of book-like themes, ink colors, and fonts to make each note feel unique."
          />
          <FeatureCard
            icon={<CloudIcon className="w-8 h-8 text-primary" />}
            title="Cross-Device Sync"
            description="Access your notes from any device with seamless cloud sync and backup features."
          />
          <FeatureCard
            icon={<BookIcon className="w-8 h-8 text-primary" />}
            title="Realistic Page Flipping"
            description="Enjoy a tactile experience with smooth, book-like page-turning animations."
          />
        </section>

        {/* Showcase Section */}
        <section className="text-center my-20">
          <h2 className="text-4xl font-bold mb-6">See Booklike in Action</h2>
          <p className="text-lg mb-8">
            Experience the true feel of a digital notebook that looks and works
            just like a real book.
          </p>
          <div className="relative overflow-hidden rounded-lg shadow-lg mx-auto max-w-4xl">
            <Image
              src="/logo.png"
              alt="Booklike app demo"
              width={800}  
              height={400}
              className="object-cover"
              placeholder="blur" // Use placeholder to improve loading experience
              blurDataURL="/images/booklike-demo.png" // Use a low-quality image for the placeholder
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-5xl mx-auto my-24 text-center pricing" id="pricing">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg mb-12">
            Start with the free version or unlock the full experience with our
            premium features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PricingCard
              title="Free"
              price="$0"
              features={["Limited notebooks", "Basic themes", "Local access only"]}
              cta="Get Started"
            />
            <PricingCard
              title="Premium"
              price="$9.99/mo"
              features={[
                "Unlimited notebooks",
                "Exclusive themes",
                "Cloud sync",
                "PDF export",
              ]}
              cta="Go Premium"
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary py-12 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Write Your Story?</h2>
          <p className="text-lg mb-8 max-w-lg mx-auto text-white">
            Join Booklike today and enjoy the experience of writing in a digital
            notebook that feels just like the real thing.
          </p>
          <Button variant="secondary" size="lg" className="rounded-full px-8 py-3">
            Get Started for Free <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 shadow-md rounded-lg text-center">
      <div className="flex justify-center items-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Pricing Card Component
function PricingCard({ title, price, features, cta }: { title: string; price: string; features: string[]; cta: string }) {
  return (
    <div className="p-8 shadow-md rounded-lg text-center">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-primary mb-6">{price}</p>
      <ul className="mb-8 text-gray-600 space-y-2">
        {features.map((feature, index) => (
          <li key={index}>✓ {feature}</li>
        ))}
      </ul>
      <Button variant="primary" size="lg" className="rounded-full px-8 py-3">
        {cta}
      </Button>
    </div>
  );
}
