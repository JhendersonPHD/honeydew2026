import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ShopifyProvider } from "@/contexts/ShopifyContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HoneyDew - Farm to Consumer",
  description: "Fresh From the Farm, Powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ErrorBoundary>
          <AuthProvider>
            <ShopifyProvider>
              <AnalyticsProvider>
                {children}
              </AnalyticsProvider>
            </ShopifyProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
