import ajaxCall from "@/helpers/ajaxCall";
import ResponsiveBlogContainer from "@/components/BlogDetails/ResponsiveBlogContainer";

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post was not found",
    };
  }

  try {
    const { data: blog } = await ajaxCall(`/post/${slug}/`, {
      method: "GET",
    });
    return {
      title: blog?.meta_title,
      description: blog?.meta_description,
      openGraph: {
        title: blog?.meta_title,
        description: blog?.meta_description,
        images: [
          {
            url: blog?.featured_image,
            alt: blog?.image_alt || blog?.meta_title,
            width: 800,
            height: 600,
          },
        ],
        siteName: "Omnicnutrition",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: blog?.meta_title,
        description: blog?.meta_description,
        images: [
          {
            url: blog?.featured_image,
            alt: blog?.image_alt || blog?.meta_title,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Blog Post",
      description: "Read our latest blog post",
    };
  }
};

export default async function BlogDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <div>Blog Not Found</div>;
  }

  const { data: blog } = await ajaxCall(`/post/${slug}/`, {
    method: "GET",
  });

  const getBlogSchema = () => {
    if (!blog) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://omnicnutrition.com/${slug}`,
      },
      headline: blog?.meta_title,
      description: blog?.meta_description,
      image: blog?.featured_image,
      author: {
        "@type": "Person",
        name: blog?.author?.full_name,
      },
      publisher: {
        "@type": "Organization",
        name: "Omnicnutrition",
        logo: {
          "@type": "ImageObject",
          url: "https://omnicnutrition.com/omnicnutrition.png",
        },
      },
      datePublished: blog?.published_at,
    };
  };

  const blogSchema = getBlogSchema();

  return (
    <>
      {blogSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      )}
      <ResponsiveBlogContainer slug={slug} />
    </>
  );
}
