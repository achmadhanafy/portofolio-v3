import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/store/provider";

const siteUrl = "https://achmad-hanafy-portofolio.vercel.app";

export const metadata: Metadata = {
  title: "Achmad Hanafy - Portfolio",
  description:
    "Achmad Hanafy Professional Portfolio, experienced Frontend and Mobile Developer, proven track record in building dynamic and responsive web and mobile applications.",
  openGraph: {
    title: "Achmad Hanafy - Web & Mobile Developer",
    description:
      "Experienced Frontend and Mobile Developer specializing in building dynamic, responsive web and mobile applications.",
    url: siteUrl,
    siteName: "Achmad Hanafy - Web & Mobile Developer",
    images: [
      {
        url: `${siteUrl}/images/profile.jpeg`,
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
      "Experienced Frontend and Mobile Developer specializing in building dynamic, responsive web and mobile applications.",
    images: [`${siteUrl}/images/profile.jpeg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body
        className="antialiased bg-[#141312] text-[#e6e1df]"
        style={{
          fontFamily:
            "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
