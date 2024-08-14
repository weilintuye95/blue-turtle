"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { trpc } from "~/utils/trpc";

const SignInForm = () => {
  const router = useRouter();
  const useUserCreator = trpc.user.createOrReturnUser.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract the form data
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;

    try {
      // Call the mutation with the username
      const user = await useUserCreator.mutateAsync({ username });

      if (user) {
        // const searchParams = new URLSearchParams({ userId: user.id });
        // router.push(`/chat?${searchParams.toString()}`);
        router.push(`/chat/${user.username}`);
      }
    } catch (error) {
      // Handle any errors that occur during mutation
      console.error("Failed to create or return user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">User Name</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="John Doe"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
