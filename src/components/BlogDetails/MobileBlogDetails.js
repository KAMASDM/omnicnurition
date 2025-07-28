"use client";
import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  ArrowLeft,
  Tag,
  Eye,
  Sparkles,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ajaxCall from "@/helpers/ajaxCall";
import BlogTicker from "../RelatedArticles/BlogTicker";
import RelatedArticles from "../RelatedArticles/RelatedArticles";

export default function BlogDetails({ slug }) {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showTicker, setShowTicker] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const category = blog?.category?.name;
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const response = await ajaxCall(`/post/${slug}/`, { method: "GET" });
        setBlog(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!category) return;
      try {
        const response = await ajaxCall(
          `/posts-category/?site_domain=omnicnutrition.com&category_name=${category}`,
          { method: "GET" }
        );
        setRelatedBlogs(response.data.results);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTicker(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <main className="pt-12 min-h-screen bg-gradient-to-r from-green-50/30 to-green-50/30">
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showTicker ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <BlogTicker relatedBlogs={relatedBlogs} />
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-green-600 text-white font-medium">
                  {blog?.category?.name}
                </span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>{moment(blog?.published_at)?.format("ll")}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {moment(blog?.published_at)?.startOf("hour")?.fromNow()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  <span>{blog.view_count} views</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                {blog.title}
              </h1>
              <p className="text-xl text-gray-600">{blog.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  {blog.author?.full_name && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-600 flex items-center justify-center text-white font-semibold">
                      {blog.author.full_name.includes(" ")
                        ? `${blog.author.full_name.split(" ")[0][0]}${
                            blog.author.full_name.split(" ")[1][0]
                          }`
                        : blog.author.full_name.substring(0, 2)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-gray-900 font-medium">
                      {blog.author?.full_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Author & Content Creator
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            {blog.featured_image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={blog.featured_image}
                  alt={blog.image_alt || blog.title}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            )}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-600 max-w-none bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 shadow-md"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 flex justify-end"
              >
                <button
                  onClick={handleGoBack}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to Blogs
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles
                    className="h-4 w-4 text-green-600 mr-2"
                    aria-hidden="true"
                  />
                  Share this article
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.facebook.com/omnicnurition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-6 w-6 mb-1" aria-hidden="true" />
                    <span className="text-xs">Facebook</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://x.com/vegan_vibrance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-6 w-6 mb-1" aria-hidden="true" />
                    <span className="text-xs">Twitter</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/veganthevibrance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
                    aria-label="Visit us on Instagram"
                  >
                    <Instagram className="h-6 w-6 mb-1" aria-hidden="true" />
                    <span className="text-xs">Instagram</span>
                  </motion.a>
                </div>
              </motion.div>
              {blog.tags?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag
                      className="h-4 w-4 text-green-600 mr-2"
                      aria-hidden="true"
                    />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/tag/${tag.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 text-green-600 text-sm font-medium hover:shadow-md transition-shadow"
                        aria-label={`View all posts tagged ${tag.name}`}
                        itemProp="keywords"
                      >
                        <Tag className="h-3 w-3" aria-hidden="true" />
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
              {blog.author && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    About the Author
                  </h3>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-600 flex items-center justify-center text-white text-2xl font-semibold mb-3">
                      {blog.author.full_name.includes(" ")
                        ? `${blog.author.full_name.split(" ")[0][0]}${
                            blog.author.full_name.split(" ")[1][0]
                          }`
                        : blog.author.full_name.substring(0, 2)}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {blog.author.full_name}
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Content creator and specialist in well-being topics.
                      Passionate about helping people unplug and find balance in
                      their lives.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </div>
      {isVisible && (
        <div className="fixed bottom-8 left-8 z-50">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Blogs
          </motion.button>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <RelatedArticles loading={loading} relatedBlogs={relatedBlogs} />
      </motion.div>
    </main>
  );
}
