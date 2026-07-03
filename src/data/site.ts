import tplRestaurant from "@/assets/tpl-restaurant.jpg";
import tplFashion from "@/assets/tpl-fashion.jpg";
import tplMedical from "@/assets/tpl-medical.jpg";
import tplRealEstate from "@/assets/tpl-realestate.jpg";
import heroLaptop from "@/assets/hero-device-laptop.png";
import heroTablet from "@/assets/hero-device-tablet.png";
import heroMobile from "@/assets/hero-device-mobile.png";

// ============================================================
// Site content configuration — future admin-panel editable.
// ============================================================

export type NavItem = { id: string; label: string; href: string };

export const brand = {
  name: "Mini Store",
  tagline: "Premium website templates & custom builds",
  logoMark: "M",
};

export const navigation: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "templates", label: "Templates", href: "#templates" },
  { id: "custom", label: "Custom Websites", href: "#custom" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const navActions = {
  loginLabel: "Login",
  ctaLabel: "Get Custom Website",
  ctaHref: "#custom",
};

// -------------------- Hero --------------------
export const hero = {
  badge: "New · 2026 Template Collection",
  headlineLines: ["Build Your Business", "Website ", "Than Ever"], // "Faster" gradient injected at index 1 end
  headlineGradientWord: "Faster",
  description:
    "Buy premium templates, tailor them to your brand, or commission a fully custom build. One studio, every stage of your website.",
  primary: { label: "Browse Templates", href: "#templates" },
  secondary: { label: "Request Custom Website", href: "#custom" },
  benefits: [
    { id: "responsive", label: "Mobile Responsive" },
    { id: "seo", label: "SEO Optimized" },
    { id: "secure", label: "Fast & Secure" },
    { id: "easy", label: "Easy To Customize" },
  ],
  devices: {
    laptop: { src: heroLaptop, alt: "Template on laptop", width: 1280, height: 896 },
    tablet: { src: heroTablet, alt: "Template on tablet", width: 688, height: 960 },
    mobile: { src: heroMobile, alt: "Template on mobile", width: 624, height: 1072 },
  },
};

// -------------------- Stats --------------------
export type StatTone = "violet" | "blue" | "green" | "orange";
export type Stat = {
  id: string;
  value: string;
  title: string;
  description: string;
  icon: "templates" | "customers" | "projects" | "star";
  tone: StatTone;
};

export const stats: Stat[] = [
  { id: "templates", value: "240+", title: "Templates", description: "Ready-to-use designs", icon: "templates", tone: "violet" },
  { id: "customers", value: "18k+", title: "Happy Customers", description: "Across 40+ countries", icon: "customers", tone: "blue" },
  { id: "projects", value: "3.4k", title: "Projects Shipped", description: "Delivered on time", icon: "projects", tone: "green" },
  { id: "satisfaction", value: "99%", title: "Satisfaction", description: "Loved by our clients", icon: "star", tone: "orange" },
];

// -------------------- Categories --------------------
export type Category = {
  id: string;
  label: string;
  tone: "violet" | "blue" | "orange" | "green" | "pink" | "amber" | "sky" | "muted";
};

export const categories: Category[] = [
  { id: "restaurant", label: "Restaurant", tone: "orange" },
  { id: "fashion", label: "Fashion", tone: "pink" },
  { id: "realestate", label: "Real Estate", tone: "amber" },
  { id: "medical", label: "Medical", tone: "blue" },
  { id: "fitness", label: "Fitness", tone: "green" },
  { id: "education", label: "Education", tone: "sky" },
  { id: "portfolio", label: "Portfolio", tone: "violet" },
  { id: "more", label: "More", tone: "muted" },
];

// -------------------- Templates --------------------
export type Template = {
  id: string;
  title: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  demoHref: string;
};

export const templates: Template[] = [
  { id: "lumina", title: "Lumina Restaurant", category: "Restaurant", price: "$49", rating: 4.9, reviews: 128, image: tplRestaurant, demoHref: "#" },
  { id: "aurea", title: "Auréa Fashion", category: "Fashion", price: "$59", rating: 4.8, reviews: 96, image: tplFashion, demoHref: "#" },
  { id: "clarity", title: "Clarity Medical", category: "Medical", price: "$54", rating: 4.9, reviews: 74, image: tplMedical, demoHref: "#" },
  { id: "haven", title: "Haven Real Estate", category: "Real Estate", price: "$69", rating: 5.0, reviews: 52, image: tplRealEstate, demoHref: "#" },
];

// -------------------- Features --------------------
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: "sparkles" | "layout" | "search" | "sliders" | "refresh" | "life-buoy";
  tone: "violet" | "blue" | "pink" | "green" | "amber" | "sky";
};

export const features: Feature[] = [
  { id: "design", title: "Modern & Unique Designs", description: "Crafted by senior designers with a premium editorial aesthetic.", icon: "sparkles", tone: "violet" },
  { id: "responsive", title: "Fully Responsive On All Devices", description: "Pixel-perfect on every screen, from ultrawide to mobile.", icon: "layout", tone: "blue" },
  { id: "seo", title: "SEO Optimized For Higher Rank", description: "Semantic markup, fast Core Web Vitals, clean metadata.", icon: "search", tone: "pink" },
  { id: "customize", title: "Easy to Customize No Coding Skills", description: "Structured content and tokens — edit in minutes.", icon: "sliders", tone: "green" },
  { id: "updates", title: "Lifetime Updates Free & Regular", description: "One purchase, forever kept fresh with new features.", icon: "refresh", tone: "amber" },
  { id: "support", title: "Dedicated Support We're Here to Help", description: "Real people, real answers — usually within a few hours.", icon: "life-buoy", tone: "sky" },
];

// -------------------- Custom CTA --------------------
export const customCta = {
  title: "Need Something Unique?",
  description:
    "Our senior team designs and ships fully bespoke websites — from brand systems to production code.",
  benefits: ["Custom design", "Dedicated team", "Fast delivery"],
  cta: { label: "Request Custom Website", href: "#custom" },
};

// -------------------- Footer --------------------
export const footer = {
  tagline: "Premium templates and custom websites for ambitious brands.",
  columns: [
    { id: "products", title: "Products", links: [
      { label: "Templates", href: "#templates" },
      { label: "Custom Websites", href: "#custom" },
      { label: "Pricing", href: "#pricing" },
      { label: "Roadmap", href: "#" },
    ]},
    { id: "company", title: "Company", links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#contact" },
    ]},
    { id: "support", title: "Support", links: [
      { label: "Help Center", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
    ]},
  ],
  newsletter: {
    title: "Newsletter",
    description: "New templates and updates. One email per month.",
    placeholder: "you@studio.com",
    cta: "Subscribe",
  },
  socials: [
    { id: "x", label: "X", href: "#" },
    { id: "in", label: "LinkedIn", href: "#" },
    { id: "dr", label: "Dribbble", href: "#" },
    { id: "ig", label: "Instagram", href: "#" },
  ],
  payments: ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"],
  legal: `© ${new Date().getFullYear()} Mini Store. All rights reserved.`,
};
