"use client";
import BlogDetails from "./BlogDetails";
import MobileBlogDetails from "./MobileBlogDetails";
import { useMediaQuery } from "react-responsive";

export default function ResponsiveBlogContainer({ slug }) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? (
    <BlogDetails slug={slug} />
  ) : (
    <MobileBlogDetails slug={slug} />
  );
}
