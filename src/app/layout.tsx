import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/store/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://achmad-hanafy-portofolio.vercel.app";

export const metadata: Metadata = {
  title: "Achmad Hanafy - Portfolio",
  description:
    "Achmad Hanafy Professional Portfolio, experienced Frontend and Mobile Developer, proven track record in building dynamic and responsive web and mobile applications. Expertise encompasses both front-end and back-end development, enabling me to design, implement, and maintain comprehensive application solutions seamlessly",
  openGraph: {
    title: "Achmad Hanafy - Web & Mobile Developer",
    description:
      "Experienced Frontend and Mobile Developer specializing in building dynamic, responsive web and mobile applications. Skilled in frontend and backend development, delivering scalable, high-quality solutions with seamless user experiences.",
    url: siteUrl,
    siteName: "Achmad Hanafy - Web & Mobile Developer",
    images: [
      {
        url: `${siteUrl}/profile.jpeg`,
        width: 1200,
        height: 630,
        alt: "Achmad Hanafy - Web & Mobile Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Achmad Hanafy - Web & Mobile Developer",
    description:
      "Experienced Frontend and Mobile Developer specializing in building dynamic, responsive web and mobile applications. Skilled in frontend and backend development, delivering scalable, high-quality solutions with seamless user experiences.",
    images: [`${siteUrl}/profile.jpeg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
