import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/shared/TopNav";

export const metadata: Metadata = {
  title: "Mini Flashcards",
  description: "A refined minimalism flashcard application for language learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground pt-12">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
