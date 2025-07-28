export const metadata = {
  title: "Omnicnutrition Blog | AI-Powered Personalized Nutrition Insights",
  description:
    "Cutting-edge research on DNA-based diets, microbiome optimization, and AI-driven meal planning. Your science-backed resource for precision nutrition.",
  openGraph: {
    title: "Omnicnutrition Blog | AI-Powered Personalized Nutrition Insights",
    description:
      "Cutting-edge research on DNA-based diets, microbiome optimization, and AI-driven meal planning. Your science-backed resource for precision nutrition.",
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
    title: "Omnicnutrition Blog | AI-Powered Personalized Nutrition Insights",
    description:
      "Cutting-edge research on DNA-based diets, microbiome optimization, and AI-driven meal planning. Your science-backed resource for precision nutrition.",
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

import Blog from "@/components/Blogs/Blog";

export default function Blogs() {
  return <Blog />;
}
