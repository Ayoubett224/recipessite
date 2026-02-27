import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "ehesart — Delicious Recipes & Cooking Ideas",
    description:
        "Discover mouthwatering recipes, cooking tips, and meal inspiration. From quick weeknight dinners to gourmet desserts — ehesart has it all.",
    keywords: [
        "recipes",
        "cooking",
        "food blog",
        "dinner ideas",
        "healthy meals",
        "easy recipes",
        "desserts",
        "meal prep",
        "ehesart",
    ],
    authors: [{ name: "ehesart" }],
    openGraph: {
        type: "website",
        siteName: "ehesart",
        title: "ehesart — Delicious Recipes & Cooking Ideas",
        description:
            "Discover mouthwatering recipes, cooking tips, and meal inspiration.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    src="https://d3u598arehftfk.cloudfront.net/prebid_hb_38408_37683.js"
                    strategy="beforeInteractive"
                />
            </head>
            <body className={`${playfair.variable} ${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
