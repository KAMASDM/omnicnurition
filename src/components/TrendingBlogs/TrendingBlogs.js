"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import ajaxCall from "@/helpers/ajaxCall";
import { TrendingUp, Clock, ArrowRight, BookCheck, Tag } from "lucide-react";

const TrendingBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const response = await ajaxCall(
          "/posts-popular/?site_domain=omnicnutrition.com",
          { method: "GET" }
        );
        setTrendingBlogs(response.data.results);
      } catch (error) {
        console.error("Error fetching trending blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBlogs();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 mb-4">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Most Popular Articles
            </h2>
            <p className="mt-2 text-gray-600">
              Explore our most read and talked about articles.
            </p>
          </div>
          <Link
            href="/blogs"
            className="group hidden md:flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300"
            aria-label="View all articles"
          >
            View All Articles
            <ArrowRight
              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={`loading-${index}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {[...Array(3)].map((_, tagIndex) => (
                      <div
                        key={`loading-tag-${tagIndex}`}
                        className="h-6 w-16 bg-gray-200 rounded-md animate-pulse"
                      ></div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : trendingBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {trendingBlogs?.map((blog, index) => (
              <article
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <Link
                  href={`/${blog.slug}`}
                  aria-label={`Read more about ${blog.title}`}
                >
                  <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={blog.featured_image}
                      alt={blog.image_alt || blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-purple-600 text-sm font-medium">
                        <Tag className="h-3 w-3" aria-hidden="true" />
                        {blog.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-purple-100 flex items-center justify-center bg-purple-100 text-purple-600 font-semibold">
                        {blog.author.full_name.includes(" ")
                          ? `${blog.author.full_name.split(" ")[0][0]}${
                              blog.author.full_name.split(" ")[1][0]
                            }`
                          : blog.author.full_name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          {blog.author.full_name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {moment(blog.published_at).format("ll")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center justify-between text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="flex items-center gap-1">
                          <BookCheck
                            className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500"
                            aria-hidden="true"
                          />
                          Estimated Read Time :{" "}
                          <span className="font-semibold">
                            {blog.estimated_reading_time} min
                          </span>
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock
                          className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500"
                          aria-hidden="true"
                        />
                        {moment(blog.published_at).startOf("hour").fromNow()}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No Trending Articles Available.
          </div>
        )}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300"
            aria-label="View all articles"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingBlogs;
