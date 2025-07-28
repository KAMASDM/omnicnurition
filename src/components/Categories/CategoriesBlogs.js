"use client";
import { useEffect, useState } from "react";
import { Search, X, BookOpen, BookCheck, Tag } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import ajaxCall from "@/helpers/ajaxCall";

export default function CategoriesBlogs({ slug }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      if (!slug) return;
      try {
        const response = await ajaxCall(
          `/posts-category/?site_domain=omnicnutrition.com&category_slug=${slug}`,
          { method: "GET" }
        );

        setBlogs(response.data.results);
        setFilteredBlogs(response.data.results);

        if (response.data.results.length > 0) {
          const formattedName = slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
          setCategoryName(formattedName);
          setCategoryDescription(
            `Explore insightful articles about ${formattedName} on Omnicnutrition. Discover plant-based nutrition, eco-conscious living, cruelty-free lifestyle tips, and how ${formattedName} supports a healthier, more sustainable world. Perfect for vegans, health enthusiasts, and green living advocates.`
          );
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBlogs();
  }, [slug]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  return (
    <main className="py-12 min-h-screen">
      <section
        aria-labelledby="category-heading"
        className="relative py-20 bg-green-100"
      >
        <div
          className="absolute inset-0 bg-grid-white/[0.05]"
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              id="category-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              itemProp="name"
            >
              {categoryName}'s Blogs
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              {categoryDescription}
            </p>
            <div className="relative max-w-2xl mx-auto">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder={`Search ${categoryName} articles...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 md:py-5 rounded-full bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  aria-label={`Search ${categoryName} articles`}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    aria-label="Clear search query"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container mx-auto px-6 py-12"
        aria-labelledby="blog-list-heading"
      >
        <div className="flex items-center justify-between mb-8">
          <h2
            id="blog-list-heading"
            className="text-2xl font-bold text-gray-900 flex items-center gap-2"
          >
            <BookOpen className="h-5 w-5 text-green-600" aria-hidden="true" />
            {searchQuery
              ? `Search Results for "${searchQuery}" in ${categoryName}`
              : `All ${categoryName} Articles`}
          </h2>
          <div className="text-sm text-gray-600">
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "article" : "articles"}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <Link
                  href={`/${blog.slug}`}
                  className="group flex flex-col h-full"
                >
                  <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={blog.featured_image}
                      alt={blog.image_alt || blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      itemProp="image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-green-600 text-sm font-medium">
                        <Tag className="h-3 w-3" aria-hidden="true" />
                        {blog.category.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3
                      className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-600 transition-colors"
                      itemProp="headline"
                    >
                      {blog.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 flex-grow"
                      itemProp="description"
                    >
                      {blog.excerpt}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                        {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Link
                            key={tagIndex}
                            href={`/tags/${tag.slug}`}
                            className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full hover:bg-green-100 transition-colors"
                            aria-label={`View more ${tag.name} articles`}
                            itemProp="keywords"
                          >
                            {tag.name}
                          </Link>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-green-100 flex items-center justify-center bg-green-100 text-green-600 font-semibold"
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        {blog.author.full_name.includes(" ")
                          ? `${blog.author.full_name.split(" ")[0][0]}${
                              blog.author.full_name.split(" ")[1][0]
                            }`
                          : blog.author.full_name.substring(0, 2)}
                      </div>
                      <div>
                        <p
                          className="text-xs sm:text-sm font-medium text-gray-900"
                          itemProp="name"
                        >
                          {blog.author.full_name}
                        </p>
                        <time
                          className="text-xs sm:text-sm text-gray-500"
                          dateTime={moment(blog.published_at).format()}
                          itemProp="datePublished"
                        >
                          {moment(blog.published_at).format("ll")}
                        </time>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                        <BookCheck
                          className="h-3 w-3 sm:h-4 sm:w-4 text-green-500"
                          aria-hidden="true"
                        />
                        {blog.estimated_reading_time} min read
                      </span>
                      <span className="text-green-600 text-sm sm:text-base font-medium hover:text-green-700 transition-colors">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Articles Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? `No results found for "${searchQuery}" in ${categoryName}`
                : `No articles available for ${categoryName} yet.`}
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              {searchQuery ? "Clear Search" : "Browse All Articles"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
