import { contactData } from "./contactData";
import vanImg from "@/assets/images/van.jpg";

export const seoDefaults = {
  SITE_TITLE: contactData.name,
  SITE_DESCRIPTION: `Portfolio of ${contactData.name}, a passionate web developer specializing in modern web technologies`,
  SITE_KEYWORDS: `Web Developer, React, Node.js, Web Development, Portfolio, ${contactData.name}`,
  SITE_AUTHOR: contactData.name,
  SITE_NAME: contactData.name,
  SITE_IMAGE: vanImg,
  SITE_URL: "https://rivan.me",
  THEME_COLOR: "#0f172a",
};
