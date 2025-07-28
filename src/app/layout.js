import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title:
    "AI-Powered Plant-Based Recipes | Optimized for Your Biology | OmniNutrition",
  description:
    "Discover plant-based recipes scientifically optimized for your unique biology. Our AI analyzes DNA, microbiome and metabolism to deliver personalized vegan meals for optimal health.",
  icons: {
    icon: [
      { url: "/omnicnutrition.png" },
      { url: "/omnicnutrition.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/omnicnutrition.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    title:
      "AI-Powered Plant-Based Recipes | Optimized for Your Biology | OmniNutrition",
    description:
      "Discover plant-based recipes scientifically optimized for your unique biology. Our AI analyzes DNA, microbiome and metabolism to deliver personalized vegan meals for optimal health.",
    images: [
      {
        url: "https://omnicnutrition.com/omnicnutrition.png",
        width: 800,
        height: 600,
        alt: "Omnicnutrition",
      },
    ],
    siteName: "Omnicnutrition",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI-Powered Plant-Based Recipes | Optimized for Your Biology | OmniNutrition",
    description:
      "Discover plant-based recipes scientifically optimized for your unique biology. Our AI analyzes DNA, microbiome and metabolism to deliver personalized vegan meals for optimal health.",
    images: [
      {
        url: "https://omnicnutrition.com/omnicnutrition.png",
        width: 800,
        height: 600,
        alt: "Omnicnutrition",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RL37GHGN4E"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', 'G-RL37GHGN4E');
            `,
          }}
        ></Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2283636579212292"
          crossorigin="anonymous"
        ></Script>
        <meta
          name="google-site-verification"
          content="iUWe1_LyuzF3giz31MVxPTRS6ccFnk88zR9aYp-cmAc"
        ></meta>
        <meta
          name="google-adsense-account"
          content="ca-pub-2283636579212292"
        ></meta>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
