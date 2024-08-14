import { HydrateClient } from "~/trpc/server";
import SignInForm from "./_components/home/SignInForm";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="bg-background flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              Blue Turtle Chat App
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter your username here. Your chat history will be retrieved
              based on your username:
            </p>
          </div>
          <SignInForm />
        </div>
      </main>
    </HydrateClient>
  );
}
