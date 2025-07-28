export const metadata = {
  title: "Contact Omnicnutrition | Get in Touch Today",
  description: "Have questions or feedback? Contact Omnicnutrition team today!",
  openGraph: {
    title: "Contact Omnicnutrition | Get in Touch Today",
    description:
      "Have questions or feedback? Contact Omnicnutrition team today!",
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
    title: "Contact Omnicnutrition | Get in Touch Today",
    description:
      "Have questions or feedback? Contact Omnicnutrition team today!",
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

import ContactUs from "@/components/ContactUs/ContactUs";

export default function contactUs() {
  return <ContactUs />;
}
