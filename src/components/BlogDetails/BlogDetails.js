"use client";
import { useState, useEffect, useRef } from "react";
import {
  Clock,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Tag,
  Eye,
  Sparkles,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Square,
  Volume2,
  Headphones,
  ArrowRight,
  Settings,
  XCircle,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import ajaxCall from "@/helpers/ajaxCall";
import RelatedArticles from "../RelatedArticles/RelatedArticles";

export default function BlogDetails({ slug }) {
  const [blog, setBlog] = useState({});
  const category = blog?.category?.name;
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Reading progress state
  const bodyRef = useRef(null);
  const contentRef = useRef(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Table of contents state
  const [tableOfContents, setTableOfContents] = useState([]);

  // Speech-related states
  const utteranceRef = useRef(null);
  const speechSynthRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [speechRate, setSpeechRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechVolume, setSpeechVolume] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [speechSections, setSpeechSections] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const response = await ajaxCall(`/post/${slug}/`, { method: "GET" });
        setBlog(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          extractTableOfContents();
          extractSpeechSections();
        }, 800);
      }
    };

    fetchBlog();
    // Reset speech state when slug changes
    handleStop();
    // Scroll to top when slug changes
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
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
      }
    };

    fetchRelatedBlogs();
  }, [category]);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthRef.current = window.speechSynthesis;

      // Get available voices
      const loadVoices = () => {
        const availableVoices = speechSynthRef.current?.getVoices() || [];
        setVoices(availableVoices);

        // Select Hindi voice as default
        if (availableVoices.length > 0) {
          const hindiVoice = availableVoices.find(
            (voice) =>
              voice.lang.includes("hi-IN") && voice.name.includes("Google")
          );

          // If Hindi voice is found, use it; otherwise fall back to first available voice
          setSelectedVoice(hindiVoice?.name || availableVoices[0].name);
        }
      };

      // Chrome loads voices asynchronously
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }

      loadVoices();
    }

    // Cleanup function
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  // Extract headings for table of contents
  const extractTableOfContents = () => {
    if (!contentRef.current) return;

    // Find all heading elements in the blog content
    const headings = contentRef.current.querySelectorAll("h2, h3");
    const toc = [];

    headings.forEach((heading, index) => {
      // Skip headings that already have IDs
      const id = heading.id || `heading-${index}`;

      // Set ID if it doesn't exist
      if (!heading.id) heading.id = id;

      toc.push({
        id,
        title: heading.textContent || `Section ${index + 1}`,
      });
    });

    setTableOfContents(toc);
  };

  // Extract sections for text-to-speech
  const extractSpeechSections = () => {
    if (!contentRef.current) return;

    const sections = [];
    let currentSection = null;

    // Function to add accumulated content to sections array
    const addCurrentSection = () => {
      if (currentSection && currentSection.text.trim()) {
        sections.push(currentSection);
      }
    };

    // Get all relevant elements (headings and paragraphs)
    const contentElements = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, li, blockquote"
    );

    // First, add the main title
    const titleElement = contentRef.current.querySelector("h1");
    if (titleElement && titleElement.textContent) {
      sections.push({
        id: "title",
        title: "Title",
        text: titleElement.textContent,
        level: 1,
        element: titleElement,
      });
    }

    // Process the rest of the content
    contentElements.forEach((element, index) => {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent || "";

      // If we encounter a heading, start a new section
      if (tagName.match(/^h[1-6]$/)) {
        // Add the previous section if it exists
        addCurrentSection();

        // Create a new section with this heading
        const headingLevel = parseInt(tagName.substring(1));
        const id = element.id || `section-${index}`;

        if (!element.id) element.id = id;

        currentSection = {
          id,
          title: text,
          text: text, // Initialize with just the heading text
          level: headingLevel,
          element: element,
        };
      }
      // If it's a paragraph or list item, add to current section's content
      else if (
        currentSection &&
        (tagName === "p" || tagName === "li" || tagName === "blockquote")
      ) {
        currentSection.text += " " + text;
      }
    });

    // Add the last section if exists
    addCurrentSection();

    setSpeechSections(sections);
  };

  // Update reading progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!bodyRef.current || !contentRef.current) return;

      // Calculate reading progress
      const totalHeight = contentRef.current.scrollHeight;
      const containerHeight = bodyRef.current.clientHeight;
      const scrollTop = bodyRef.current.scrollTop;

      // Calculate percentage through content
      const scrollableDistance = totalHeight - containerHeight;
      const progress = (scrollTop / scrollableDistance) * 100;

      setReadingProgress(Math.min(Math.max(progress, 0), 100));
    };

    // Add scroll event listener to the content container
    if (bodyRef.current) {
      bodyRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [bodyRef.current, contentRef.current]);

  // Scroll to a specific heading
  const scrollToHeading = (id) => {
    if (!bodyRef.current) return;

    const element = document.getElementById(id);
    if (element) {
      const offset = 20; // Small offset for better visibility
      const elementTop = element.offsetTop;

      bodyRef.current.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  // Text-to-speech functions
  const handlePlay = () => {
    if (!speechSynthRef.current || speechSections.length === 0) return;

    // If already playing, pause
    if (isPlaying) {
      speechSynthRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // If paused, resume
    if (speechSynthRef.current.paused) {
      speechSynthRef.current.resume();
      setIsPlaying(true);
      return;
    }

    // Otherwise start speaking the current section
    speakSection(currentSectionIndex);
  };

  const handleStop = () => {
    if (!speechSynthRef.current) return;

    speechSynthRef.current.cancel();
    setIsPlaying(false);
    setCurrentSectionIndex(0);
  };

  const handlePrevious = () => {
    if (!speechSynthRef.current) return;

    const newIndex = Math.max(0, currentSectionIndex - 1);

    // Only change if we're moving to a different section
    if (newIndex !== currentSectionIndex) {
      speechSynthRef.current.cancel();
      setCurrentSectionIndex(newIndex);

      // If we were playing, start the new section
      if (isPlaying) {
        setTimeout(() => speakSection(newIndex), 100);
      }
    }
  };

  const handleNext = () => {
    if (!speechSynthRef.current) return;

    const newIndex = Math.min(
      speechSections.length - 1,
      currentSectionIndex + 1
    );

    // Only change if we're moving to a different section
    if (newIndex !== currentSectionIndex) {
      speechSynthRef.current.cancel();
      setCurrentSectionIndex(newIndex);

      // If we were playing, start the new section
      if (isPlaying) {
        setTimeout(() => speakSection(newIndex), 100);
      }
    }
  };

  const speakSection = (index) => {
    if (!speechSynthRef.current || !speechSections[index]) return;

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(speechSections[index].text);
    utteranceRef.current = utterance;

    // Set voice if selected
    if (selectedVoice) {
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }

    // Set other properties
    utterance.rate = speechRate;
    utterance.volume = speechVolume;

    // Handle when utterance finishes
    utterance.onend = () => {
      // Move to next section if not the last one
      if (index < speechSections.length - 1) {
        setCurrentSectionIndex(index + 1);
        speakSection(index + 1);
      } else {
        setIsPlaying(false);
        setCurrentSectionIndex(0);
      }
    };

    // Handle if utterance is stopped/interrupted
    utterance.onpause = () => setIsPlaying(false);
    utterance.onresume = () => setIsPlaying(true);

    // Highlight the current section in the content
    if (speechSections[index].element) {
      scrollToHeading(speechSections[index].id);
    }

    // Start speaking
    speechSynthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    setSpeechRate(rate);

    // Update current utterance if it exists
    if (utteranceRef.current) {
      utteranceRef.current.rate = rate;
    }
  };

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setSpeechVolume(volume);

    // Update current utterance if it exists
    if (utteranceRef.current) {
      utteranceRef.current.volume = volume;
    }
  };

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);

    // If currently playing, restart with new voice
    if (isPlaying && speechSynthRef.current) {
      const currentIndex = currentSectionIndex;
      speechSynthRef.current.cancel();
      setTimeout(() => speakSection(currentIndex), 100);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-gray-50 overflow-hidden pt-16">
      <div className="fixed top-0 left-0 w-full z-50 h-1 bg-transparent">
        <div
          className="h-full bg-green-600 transition-width duration-150 ease-linear"
          style={{ width: `${readingProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(readingProgress)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Reading progress"
        />
      </div>
      <button
        onClick={() => setIsAudioPlayerOpen(!isAudioPlayerOpen)}
        className="fixed bottom-20 right-6 z-50 p-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-colors"
        aria-label={
          isAudioPlayerOpen ? "Close audio player" : "Open audio player"
        }
      >
        <Headphones className="h-5 w-5" />
      </button>
      {isAudioPlayerOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-32 right-6 w-80 z-50 rounded-lg bg-white p-6 shadow-md border border-gray-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg text-gray-900 font-medium flex items-center">
              <Headphones className="w-4 h-4 text-green-600 mr-2" />
              Listen to Article
            </h2>
            <button
              onClick={() => setIsAudioPlayerOpen(false)}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Close audio player"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-3 truncate">
            {speechSections[currentSectionIndex]?.title || "Loading content..."}
          </p>
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentSectionIndex <= 0 || !speechSections.length}
              className={`p-2 rounded-full ${
                currentSectionIndex <= 0 || !speechSections.length
                  ? "text-gray-400 bg-gray-100"
                  : "text-gray-900 bg-gradient-to-r from-green-50 to-green-50 hover:from-green-100 hover:to-green-100 transition-colors"
              }`}
              aria-label="Previous section"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={handlePlay}
              disabled={!speechSections.length}
              className="p-3 rounded-full bg-gradient-to-r from-green-600 to-green-600 text-white hover:from-green-700 hover:to-green-700 transition-colors"
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white" />
              )}
            </button>
            <button
              onClick={handleStop}
              disabled={!isPlaying}
              className={`p-2 rounded-full ${
                !isPlaying
                  ? "text-gray-400 bg-gray-100"
                  : "text-gray-900 bg-gradient-to-r from-green-50 to-green-50 hover:from-green-100 hover:to-green-100 transition-colors"
              }`}
              aria-label="Stop audio"
            >
              <Square className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={
                currentSectionIndex >= speechSections.length - 1 ||
                !speechSections.length
              }
              className={`p-2 rounded-full ${
                currentSectionIndex >= speechSections.length - 1 ||
                !speechSections.length
                  ? "text-gray-400 bg-gray-100"
                  : "text-gray-900 bg-gradient-to-r from-green-50 to-green-50 hover:from-green-100 hover:to-green-100 transition-colors"
              }`}
              aria-label="Next section"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center mb-3 text-sm text-gray-600">
            <span className="mr-2">Section:</span>
            <span>
              {currentSectionIndex + 1} / {speechSections.length}
            </span>
          </div>
          <div className="mb-3">
            <label
              htmlFor="voice-select"
              className="block text-sm text-gray-600 mb-1"
            >
              Voice
            </label>
            <select
              id="voice-select"
              value={selectedVoice}
              onChange={handleVoiceChange}
              className="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <label htmlFor="speed-range" className="flex items-center">
                <Settings className="w-3 h-3 mr-1" /> Speed
              </label>
              <span>{speechRate}x</span>
            </div>
            <input
              id="speed-range"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={handleRateChange}
              className="w-full accent-green-600"
            />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <label htmlFor="volume-range" className="flex items-center">
                <Volume2 className="w-3 h-3 mr-1" /> Volume
              </label>
              <span>{Math.round(speechVolume * 100)}%</span>
            </div>
            <input
              id="volume-range"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={speechVolume}
              onChange={handleVolumeChange}
              className="w-full accent-green-600"
            />
          </div>
        </motion.div>
      )}
      <div className="flex-grow flex overflow-hidden">
        <aside className="w-64 lg:w-80 p-6 border-r border-gray-200 flex-shrink-0 overflow-y-auto bg-white">
          {tableOfContents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 mb-6 shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-4 w-4 text-green-600 mr-2" />
                Table of Contents
              </h2>
              <nav
                className="max-h-[calc(100vh-24rem)] overflow-y-auto pr-2"
                aria-label="Table of contents"
              >
                <ul className="space-y-1">
                  {tableOfContents.map((heading) => (
                    <li key={heading.id}>
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`flex items-center w-full px-2 py-1.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50/20 rounded transition-colors ${
                          heading.level === 3 ? "pl-4" : ""
                        }`}
                        aria-label={`Scroll to section: ${heading.title}`}
                      >
                        <ArrowRight className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                        <span className="truncate">{heading.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                  <Headphones className="h-4 w-4 bg-gradient-to-r from-green-600 to-green-green bg-clip-text text-transparent mr-2" />
                  Listen to Article
                </h3>
                <button
                  onClick={handlePlay}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm rounded-lg bg-gradient-to-r from-green-600 to-green-600 text-white hover:from-green-700 hover:to-green-700 transition-colors mb-4"
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-900 mb-1">
                    <span>Reading progress</span>
                    <span>{Math.round(readingProgress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-green-50/30 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-green-600 to-green-600 rounded-full"
                      style={{ width: `${readingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </aside>
        <article
          ref={bodyRef}
          className="flex-grow h-full overflow-y-auto pb-12 bg-white"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div ref={contentRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-green-600 text-white font-medium"
                    itemProp="articleSection"
                  >
                    {blog?.category?.name}
                  </span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time
                      dateTime={blog?.published_at}
                      itemProp="datePublished"
                    >
                      {moment(blog?.published_at)?.format("ll")}
                    </time>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {moment(blog?.published_at)?.startOf("hour")?.fromNow()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <span itemProp="interactionCount">
                      {blog.view_count} views
                    </span>
                  </div>
                </div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent"
                  itemProp="headline"
                >
                  {blog.title}
                </h1>
                <p className="text-xl text-gray-600" itemProp="description">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-gray-200"></div>
              </motion.div>

              {blog.featured_image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="my-8 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={blog.featured_image}
                    alt={blog.image_alt || blog.title}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                    width="1200"
                    height="630"
                    itemProp="image"
                  />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="p-6 prose max-w-none bg-gradient-to-br from-green-50 to-green-50 rounded-xl shadow-md"
                itemProp="articleBody"
              />
            </div>
            <RelatedArticles relatedBlogs={relatedBlogs} />
          </div>
        </article>
        <aside className="w-64 lg:w-80 p-6 border-l border-gray-200 flex-shrink-0 overflow-y-auto bg-white">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 mb-6 shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-4 w-4 text-green-600 mr-2" />
              Share this article
            </h2>
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
              className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 shadow-md mb-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag
                  className="h-4 w-4 text-green-600 mr-2"
                  aria-hidden="true"
                />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${tag.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium hover:shadow-md transition-shadow"
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
              itemScope
              itemType="https://schema.org/Person"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About the Author
              </h2>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-600 flex items-center justify-center text-white text-2xl font-semibold mb-3">
                  {blog.author.full_name.includes(" ")
                    ? `${blog.author.full_name.split(" ")[0][0]}${
                        blog.author.full_name.split(" ")[1][0]
                      }`
                    : blog.author.full_name.substring(0, 2)}
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900"
                  itemProp="name"
                >
                  {blog.author.full_name}
                </h3>
                <p className="text-gray-600 mt-2" itemProp="description">
                  Content creator and specialist in well-being topics.
                  Passionate about helping people unplug and find balance in
                  their lives.
                </p>
              </div>
            </motion.div>
          )}
        </aside>
      </div>
    </main>
  );
}
