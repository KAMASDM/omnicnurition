"use client";
import { motion } from "framer-motion";
import { Sparkles, Tag } from "lucide-react";
import Link from "next/link";

export default function RelatedArticles({ relatedBlogs }) {
  if (!relatedBlogs || relatedBlogs.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="container mx-auto px-6 py-12"
      aria-labelledby="related-articles-heading"
    >
      <div className="flex items-center mb-6">
        <Sparkles className="h-6 w-6 text-green-600 mr-3" aria-hidden="true" />
        <h2
          id="related-articles-heading"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent"
        >
          Related Articles
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {relatedBlogs.slice(0, 4).map((relatedBlog) => (
          <motion.article
            key={relatedBlog.id}
            whileHover={{ y: -5 }}
            className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <Link
              href={`/${relatedBlog.slug}`}
              className="block h-full"
              aria-label={`Read related article: ${relatedBlog.title}`}
            >
              {relatedBlog.featured_image && (
                <div className="h-40 sm:h-48 md:h-40 overflow-hidden relative">
                  <img
                    src={relatedBlog.featured_image}
                    alt={relatedBlog.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    loading="lazy"
                  />
                  {relatedBlog.category && relatedBlog.category.name && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-green-600 text-sm font-medium">
                        <Tag className="h-3 w-3" aria-hidden="true" />
                        {relatedBlog.category.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-4 h-full flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                  {relatedBlog.title}
                </h3>
                {relatedBlog.excerpt && (
                  <p className="text-gray-600 flex-grow">
                    {relatedBlog.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
