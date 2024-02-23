import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./_components/providers/theme-provider";
import "./globals.css";
import { cn } from "@/_utils/cn";
import { QueryProvider } from "./_components/providers/query-provider";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <html lang="en">
         <body className={cn(inter.className, "bg-gray-900 px-4 sm:px-6")}>
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem
               disableTransitionOnChange
            >
               <QueryProvider>
                  {children}
                  <Toaster richColors />
               </QueryProvider>
            </ThemeProvider>
         </body>
      </html>
   );
};

export default RootLayout;