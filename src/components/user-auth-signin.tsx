"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../components/ui/icons";
import { Button } from "../components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthFormSignin({ className, ...props }: UserAuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const googleClicked = async()=>{
    setLoading(true);
    try {
      await signIn("google");
    } catch (error: any) {
      console.error("Google sign-in error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const emailClicked = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("email", { email, redirect: false });
    } catch (error: any) {
      console.error("Email sign-in error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6 w-auto", className)} {...props}>
      <Button variant="default" type="button" disabled={loading} onClick={googleClicked}>
        {loading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Sign in with Google
      </Button>

      <span className="flex justify-center items-center">OR</span>

      <form onSubmit={emailClicked} className="flex-col flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mb-4 p-2 border rounded"
          required
        />
        <Button variant="default" type="submit" disabled={loading}>
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}
          Sign up with email
        </Button>
      </form>
    </div>
  );
}
