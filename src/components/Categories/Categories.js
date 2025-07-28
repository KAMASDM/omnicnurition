"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { motion } from "framer-motion";
import ajaxCall from "@/helpers/ajaxCall";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  ChevronDown,
  BookOpen,
  BookCheck,
  Clock,
} from "lucide-react";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Plant-Based Diet",
    slug: "plant-based-diet",
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(3);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await ajaxCall(
          "/get-categories/?site=omnicnutrition.com",
          { method: "GET" }
        );
        if (response?.data?.results?.length > 0) {
          setCategories(response.data.results);
          const digitalDetoxCategory = response.data.results.find(
            (cat) => cat.slug === "plant-based-diet"
          );
          if (digitalDetoxCategory) {
            setSelectedCategory(digitalDetoxCategory);
          }
        } else {
          console.log("No categories found or invalid response");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        if (!selectedCategory.slug) return;

        setLoading(true);
        const response = await ajaxCall(
          `/posts-category/?site_domain=omnicnutrition.com&category_slug=${selectedCategory.slug}`,
          { method: "GET" }
        );

        setBlogs(response.data.results);
        setFilteredBlogs(response.data.results);
        setCurrentPage(1);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBlogs();
  }, [selectedCategory.slug]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (blog.tags &&
            blog.tags.some((tag) =>
              tag.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
      setFilteredBlogs(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, blogs]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (isCategoryOpen) setIsCategoryOpen(false);
  };

  const PaginationControls = () => {
    const maxVisiblePages = 5;

    if (totalPages <= 1) return null;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstBlog + 1}-
          {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
          {filteredBlogs.length} articles
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" aria-hidden="true" />
          </button>
          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === 1
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600 hover:bg-purple-50"
                } shadow-md`}
                aria-label={`Go to page 1`}
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-2 text-gray-500" aria-hidden="true">
                  <Ellipsis className="w-5 h-5" />
                </span>
              )}
            </>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <button
              key={startPage + i}
              onClick={() => paginate(startPage + i)}
              className={`w-10 h-10 rounded-full ${
                currentPage === startPage + i
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-purple-50"
              } shadow-md`}
              aria-label={`Go to page ${startPage + i}`}
            >
              {startPage + i}
            </button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-500" aria-hidden="true">
                  <Ellipsis className="w-5 h-5" />
                </span>
              )}
              <button
                onClick={() => paginate(totalPages)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === totalPages
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600 hover:bg-purple-50"
                } shadow-md`}
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight
              className="w-5 h-5 text-gray-600"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <main className="py-12 min-h-screen">
      <section className="relative py-20 bg-purple-100">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Categories
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore personalized, plant-powered recipes inspired by global
              cuisines.
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
                  placeholder={`Search ${selectedCategory.name} blogs...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 md:py-5 rounded-full bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  aria-label={`Search ${selectedCategory.name} blogs...`}
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
        aria-label="Blog categories"
        className="sticky top-16 z-10 bg-white shadow-md"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="md:hidden w-full">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg"
                aria-expanded={isCategoryOpen}
                aria-controls="mobile-categories"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isCategoryOpen && (
                <motion.div
                  id="mobile-categories"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 space-y-2"
                >
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left rounded-full text-sm font-semibold transition-colors duration-300 border border-purple-600 ${
                        selectedCategory.slug === category.slug
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                          : "bg-white text-purple-600 hover:bg-purple-50"
                      }`}
                      aria-label={`View articles in ${category.name} category`}
                      aria-current={
                        selectedCategory.slug === category.slug
                          ? "true"
                          : "false"
                      }
                    >
                      {category.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <div className="hidden md:flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  className={`inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 border border-purple-600  ${
                    selectedCategory.slug === category.slug
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white text-purple-600 hover:bg-purple-50"
                  }`}
                  aria-label={`View articles in ${category.name} category`}
                  aria-current={
                    selectedCategory.slug === category.slug ? "true" : "false"
                  }
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            id="blog-list-heading"
            className="text-2xl font-bold text-gray-900 flex items-center gap-2"
          >
            <BookOpen className="h-5 w-5 text-purple-600" aria-hidden="true" />
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : `${selectedCategory.name} Articles`}
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
                className="overflow-hidden bg-white rounded-2xl shadow-lg"
                aria-busy="true"
              >
                <div className="p-8 h-full min-h-[320px] flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gray-200 p-3 rounded-xl animate-pulse">
                      <div className="h-6 w-6"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-6 w-3/4"></div>
                  <div className="mt-auto">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog, index) => (
                <Link
                  key={blog.id}
                  href={`/${blog.slug}`}
                  aria-label={`Read article: ${blog.title}`}
                  className="block"
                >
                  <motion.article
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                    role="listitem"
                  >
                    <div className="relative h-48">
                      <img
                        src={blog.featured_image}
                        alt={blog.image_alt || blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        itemProp="image"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full bg-white/90 text-purple-600 text-sm font-medium"
                          itemProp="articleSection"
                        >
                          {blog.category.name}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h2
                        itemProp="headline"
                        className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors"
                      >
                        {blog.title}
                      </h2>

                      <p
                        itemProp="description"
                        className="text-gray-600 mb-4 line-clamp-2"
                      >
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto">
                        <div
                          className="flex items-center gap-3 mb-3"
                          itemProp="author"
                          itemScope
                          itemType="https://schema.org/Person"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-purple-100 flex items-center justify-center bg-purple-100 text-purple-600 font-semibold">
                            {blog.author.full_name.includes(" ")
                              ? `${blog.author.full_name.split(" ")[0][0]}${
                                  blog.author.full_name.split(" ")[1][0]
                                }`
                              : blog.author.full_name.substring(0, 2)}
                          </div>
                          <div>
                            <p
                              itemProp="name"
                              className="text-xs sm:text-sm font-medium text-gray-900"
                            >
                              {blog.author && blog.author.full_name}
                            </p>
                            <time
                              itemProp="datePublished"
                              dateTime={moment(blog.published_at).format()}
                              className="text-xs sm:text-sm text-gray-500"
                            >
                              {moment(blog.published_at).format("ll")}
                            </time>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center justify-between text-xs sm:text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookCheck
                              className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500"
                              aria-hidden="true"
                            />
                            {blog.estimated_reading_time} min read
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock
                              className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500"
                              aria-hidden="true"
                            />
                            {moment(blog.published_at)
                              .startOf("hour")
                              .fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
            <PaginationControls />
          </>
        ) : (
          <div className="flex justify-center items-center py-10">
            <div className="text-center text-gray-600 text-lg">
              No categories found matching your search criteria.
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
