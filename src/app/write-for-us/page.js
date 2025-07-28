export const metadata = {
  title: "Write for Us - Guest Post Guidelines | Omnicnutrition.com",
  description:
    "Want to contribute to Omnicnutrition? Learn how to submit a guest post and join our mission to inspire plant-based living through engaging and informative content.",
  openGraph: {
    title: "Write for Us - Guest Post Guidelines | Omnicnutrition.com",
    description:
      "Submit your vegan lifestyle or plant-based recipe article to Omnicnutrition. Follow our guest post guidelines to become a featured contributor.",
    url: "https://omnicnutrition.com/write-for-us",
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
    title: "Write for Us - Guest Post Guidelines | Omnicnutrition.com",
    description:
      "Share your vegan tips, recipes, or lifestyle stories on Omnicnutrition. Review our guest post guidelines to contribute your voice to our growing community.",
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

import WriteForUs from "@/components/WriteForUs/WriteForUs";

export default function writeForUsPage() {
  return <WriteForUs />;
}
