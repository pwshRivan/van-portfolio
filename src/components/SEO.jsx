import { useEffect } from "react";
import PropTypes from "prop-types";
import { SEO_DEFAULTS } from "@/data/portfolioData";

const SEO = ({
  title = SEO_DEFAULTS.SITE_TITLE,
  description = SEO_DEFAULTS.SITE_DESCRIPTION,
  keywords = SEO_DEFAULTS.SITE_KEYWORDS,
  author = SEO_DEFAULTS.SITE_AUTHOR,
  image = SEO_DEFAULTS.SITE_IMAGE,
  url = SEO_DEFAULTS.SITE_URL,
  type = "website",
  schema = null,
}) => {
  useEffect(() => {
    // Construct full title with site name if not already included
    const siteTitle = title.includes(SEO_DEFAULTS.SITE_AUTHOR)
      ? title
      : `${title} | ${SEO_DEFAULTS.SITE_AUTHOR}`;

    // Base JSON-LD Schema - Person/Portfolio
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author,
      url: url,
      image: image,
      description: description,
      jobTitle: "Frontend Developer",
      knowsAbout: keywords.split(",").map((k) => k.trim()),
      sameAs: [
        "https://github.com/rivaannn",
        "https://www.linkedin.com/in/rivaannnn",
        "https://www.instagram.com/rivaann_/",
      ],
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SEO_DEFAULTS.SITE_NAME,
      url: SEO_DEFAULTS.SITE_URL,
      description: description,
      author: {
        "@type": "Person",
        name: author,
      },
    };

    // Combine schemas
    const combinedSchema = schema || personSchema;

    // Update document title
    document.title = siteTitle;

    // Helper function to set or update meta tags
    const setMetaTag = (name, content, property = false) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Set primary meta tags
    setMetaTag("title", siteTitle);
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("author", author);
    setMetaTag("robots", "index, follow");
    setMetaTag("language", "English");
    setMetaTag("revisit-after", "7 days");

    // Open Graph tags
    setMetaTag("og:type", type, true);
    setMetaTag("og:url", url, true);
    setMetaTag("og:title", siteTitle, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:image", image, true);
    setMetaTag("og:image:width", "1200", true);
    setMetaTag("og:image:height", "630", true);
    setMetaTag("og:site_name", SEO_DEFAULTS.SITE_NAME, true);
    setMetaTag("og:locale", "en_US", true);

    // Additional meta tags
    setMetaTag("theme-color", SEO_DEFAULTS.THEME_COLOR);
    setMetaTag("msapplication-TileColor", SEO_DEFAULTS.THEME_COLOR);
    setMetaTag("mobile-web-app-capable", "yes");
    setMetaTag("apple-mobile-web-app-capable", "yes");
    setMetaTag("apple-mobile-web-app-status-bar-style", "default");
    setMetaTag("apple-mobile-web-app-title", SEO_DEFAULTS.SITE_NAME);

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Add JSON-LD structured data
    const addJsonLd = (data, id) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("id", id);
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    addJsonLd(combinedSchema, "schema-person");
    addJsonLd(websiteSchema, "schema-website");
  }, [title, description, keywords, author, image, url, type, schema]);

  return null;
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  schema: PropTypes.object,
};

export default SEO;
