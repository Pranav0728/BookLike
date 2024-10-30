"use client";
import LandingPage from "@/components/LandingPage";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push("/books"); 
    }
  }, [router, status]);

  // Optionally handle loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LandingPage />
    </>
  );
}
