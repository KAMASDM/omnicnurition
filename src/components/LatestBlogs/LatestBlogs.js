"use client";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import ajaxCall from "@/helpers/ajaxCall";
import { Calendar, Clock, Tag } from "lucide-react";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await ajaxCall(
          "/posts-latest/?site_domain=omnicnutrition.com",
          { method: "GET" }
        );
        setBlogs(response.data.results);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest insights on digital wellness and mindful tech
            use, grounded in science and tailored for a balanced digital
            lifestyle
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <article
                key={`loading-${index}`}
                className="overflow-hidden rounded-2xl shadow-lg h-full flex flex-col"
              >
                <div className="relative h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 bg-white flex flex-col flex-grow">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>

                  <div className="flex items-center gap-3 mb-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((blog, index) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 h-full flex flex-col"
              >
                <Link
                  href={`/${blog.slug}`}
                  aria-label={`Read more about ${blog.title}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={blog.featured_image}
                      alt={blog.image_alt || blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-purple-600 text-sm font-medium">
                        <Tag className="h-3 w-3" aria-hidden="true" />
                        {blog.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="relative p-6 bg-white flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
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
                      <span className="flex items-center gap-1">
                        <Calendar
                          className="h-4 w-4 text-purple-500"
                          aria-hidden="true"
                        />
                        {moment(blog.published_at).format("ll")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock
                          className="h-4 w-4 text-purple-500"
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
            No Latest Blogs Available.
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlogs;
