import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { UserProvider } from "./context/UserContext";
import { ChatProvider } from "./context/ChatIdContext";

export const metadata: Metadata = {
  title: "Blue Turtle",
  description: "A little toy chat bot app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <UserProvider>
            <ChatProvider>{children}</ChatProvider>
          </UserProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
