import TagBlogs from "@/components/Tags/TagBlogs";

export default async function TagsBlogs({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <div>Tag Blog's Not Found</div>;
  }

  return <TagBlogs slug={slug} />;
}
