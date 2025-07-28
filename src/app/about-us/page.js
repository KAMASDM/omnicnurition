export const metadata = {
  title: "About Omnicnutrition | Our Mission & Story",
  description:
    "Discover how OmniNutrition uses AI and omics data (DNA, microbiome, metabolism) to deliver hyper-personalized dietary recommendations tailored to your unique biology.",
  openGraph: {
    title: "About Omnicnutrition | Our Mission & Story",
    description:
      "Discover how OmniNutrition uses AI and omics data (DNA, microbiome, metabolism) to deliver hyper-personalized dietary recommendations tailored to your unique biology.",
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
    title: "About Omnicnutrition | Our Mission & Story",
    description:
      "Discover how OmniNutrition uses AI and omics data (DNA, microbiome, metabolism) to deliver hyper-personalized dietary recommendations tailored to your unique biology.",
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

import AboutUs from "@/components/AboutUs/AboutUs";

export default function AboutPage() {
  return <AboutUs />;
}
