import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { TranslationProvider } from "@/lib/i18n/useTranslation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fidel Tutorial — Tutoring built for the moments that count",
  description: "Fidel Tutorial pairs students across Ethiopia and the diaspora with vetted tutors and a track record of results. KG through university, SAT, TOEFL, IELTS, exam bootcamps, summer camps. Online and in-home. Addis Ababa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Schema.org EducationalOrganization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Fidel Tutorial",
              "url": "https://fideltutorial.com",
              "logo": "https://fideltutorial.com/logo.png",
              "description": "Fidel Tutorial pairs students across Ethiopia and the diaspora with vetted tutors and a track record of results. KG through university, SAT, TOEFL, IELTS, exam bootcamps, summer camps.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Addis Ababa",
                "addressCountry": "ET"
              },
              "sameAs": [
                "https://t.me/fideltutorial",
                "https://academy.fideltutorial.com"
              ]
            })
          }}
        />
        <TranslationProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
