"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function HomeNavbar() {
  const { data: session } = useSession();

  return (
    <nav
      className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-10 pt-4 md:px-8"
      aria-label="Global"
    >
      <div className="flex items-center gap-2">
        <img
          alt="BookLike logo"
          width="28"
          height="28"
          decoding="async"
          className="size-6 md:size-7"
          src="/logo.png"
        />
        <span className="text-base font-bold md:text-lg">BookLike</span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative">
          {session?.user ? (
            <div className="flex items-center">
              <Avatar className="h-8 w-8" style={{ cursor: "pointer" }} onClick={() => {/* Handle avatar click */}}>
                {session.user.image ? (
                  <AvatarImage src={session.user.image} alt="Profile picture" />
                ) : (
                  <AvatarFallback>DP</AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm mx-2">{session.user.name}</span>
              <Button className="mx-2" size="tiny" onClick={() => signOut()} aria-label="Log out">
                Log out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {/* Handle sign-in logic */}}
              className="flex justify-center items-center"
              type="button"
              aria-label="Sign in"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
