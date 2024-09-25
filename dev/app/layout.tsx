import cn from "@/lib/cssConditional";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce app",
  description: "Generated by moustafa saad",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(cairo.className, "bg-black-bg", "pb-9")}>
        {children}
      </body>
    </html>
  );
}
