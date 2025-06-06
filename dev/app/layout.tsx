import cn from "@/app/_utilities/cssConditional";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_components/AuthProvider";
import { cookies } from "next/headers";

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
  const cookie = await cookies();
  const mode = cookie.get("mode")?.value || "light";
  return (
    <html lang="en" data-theme={mode}>
      <body
        className={cn(
          cairo.className,
          "dark:bg-black-bg bg-white dark:text-white text-black-bg"
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
