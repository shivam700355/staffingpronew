import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export default function SEO({ title, description, keywords, ogTitle, ogDescription }: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes("StaffingPro") 
      ? title 
      : `${title} | StaffingPro - Elite Sourcing & Recruitment`;
    document.title = formattedTitle;

    // Helper to find or create meta tag
    const updateMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Update Description
    if (description) {
      updateMetaTag('name', 'description', description);
    }

    // 3. Update Keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // 4. Update OpenGraph Tags
    updateMetaTag('property', 'og:title', ogTitle || formattedTitle);
    if (description) {
      updateMetaTag('property', 'og:description', ogDescription || description);
    }
    updateMetaTag('property', 'og:type', 'website');
  }, [title, description, keywords, ogTitle, ogDescription]);

  return null; // This component is a declarative portal to raw metadata
}
