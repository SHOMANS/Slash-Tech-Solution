import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { VisitTracker } from "@/components/visit-tracker";
import { ProgressBarProvider } from "@/components/providers/progress-bar-provider";
import { LoadingScreen } from "@/components/loading-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slash Tech Solution - Tech Solutions & Products",
  description: "Leading tech solution company offering web apps, mobile apps, and innovative products like Slash POS and Tourer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('slash-design')==='v2')document.documentElement.setAttribute('data-design','v2');}catch(e){}})();` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="slash-tech-theme"
        >
          <LoadingScreen />
          <ProgressBarProvider />
          <VisitTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
