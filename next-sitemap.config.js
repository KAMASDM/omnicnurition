const { default: axios } = require("axios");

module.exports = {
  siteUrl: "https://omnicnutrition.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,

  transform: async (config, path) => {
    const priorityMap = {
      "/": 1.0,
      "/blogs": 0.9,
      "/about-us": 0.8,
      "/contact-us": 0.8,
      "/categories": 0.8,
    };

    if (priorityMap.hasOwnProperty(path)) {
      return {
        loc: path,
        changefreq: "daily",
        priority: priorityMap[path],
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async () => {
    try {
      const blogResponse = await axios.get(
        "https://peekly.in/blog/api/all-posts/?site_domain=omnicnutrition.com"
      );
      const blogPosts = blogResponse.data.results;

      const categoryResponse = await axios.get(
        "https://peekly.in/blog/api/get-categories/?site=omnicnutrition.com"
      );
      const categories = categoryResponse.data.results;

      const blogPaths = blogPosts.map((post) => ({
        loc: `/${encodeURIComponent(post.slug)}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.9,
      }));

      const categoryPaths = categories.map((category) => ({
        loc: `/categories/${encodeURIComponent(category.slug)}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.9,
      }));

      return [...blogPaths, ...categoryPaths];
    } catch (error) {
      console.error("Error fetching data for sitemap:", error);
      return [];
    }
  },

  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
