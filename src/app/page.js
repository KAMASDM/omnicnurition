import Hero from "@/components/Hero/Hero";
import TrendingBlogs from "@/components/TrendingBlogs/TrendingBlogs";
import LatestBlogs from "@/components/LatestBlogs/LatestBlogs";
import NewsLetter from "@/components/NewsLetter/NewsLetter";

export default function Home() {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Omnicnurition",
    url: "https://omnicnurition.com",
    logo: "https://omnicnurition.com/omnicnurition.png",
    sameAs: [
      "https://www.facebook.com/omnicnurition",
      "https://www.instagram.com/omnicnurition",
      "https://x.com/omnicnurition",
    ],
    description:
      "Discover plant-based recipes scientifically optimized for your unique biology. Our AI analyzes DNA, microbiome and metabolism to deliver personalized vegan meals for optimal health.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <div className="blob-container">
        <Hero />
        <TrendingBlogs />
        <LatestBlogs />
        <NewsLetter />
      </div>
    </>
  );
}
