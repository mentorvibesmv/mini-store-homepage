import tplRestaurant from "@/assets/tpl-restaurant.jpg";
import tplFashion from "@/assets/tpl-fashion.jpg";
import tplMedical from "@/assets/tpl-medical.jpg";
import tplRealEstate from "@/assets/tpl-realestate.jpg";

// ============================================================
// Site content configuration.
// Every visible string, link, and image is defined here so a
// future admin panel can edit content without touching JSX.
// ============================================================

export type NavItem = {
  id: string;
  label: string;
  href: string;
  visible?: boolean;
  order?: number;
};

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
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const navActions = {
  loginLabel: "Log in",
  ctaLabel: "Get Custom Website",
  ctaHref: "#custom",
};

// -------------------- Hero --------------------
export const hero = {
  badge: "New · 2026 Template Collection",
  headline: "Beautiful websites, ready in minutes.",
  description:
    "Buy premium templates, tailor them to your brand, or commission a fully custom build. One studio, every stage of your website.",
  primary: { label: "Browse Templates", href: "#templates" },
  secondary: { label: "Request Custom Website", href: "#custom" },
  trust: [
    { id: "responsive", label: "Responsive" },
    { id: "seo", label: "SEO Optimized" },
    { id: "secure", label: "Fast & Secure" },
    { id: "easy", label: "Easy to Customize" },
  ],
};

// -------------------- Stats --------------------
export const stats = [
  { id: "templates", value: "240+", label: "Templates" },
  { id: "customers", value: "18k", label: "Happy Customers" },
  { id: "projects", value: "3.4k", label: "Projects Shipped" },
  { id: "satisfaction", value: "99%", label: "Satisfaction" },
];

// -------------------- Categories --------------------
export type Category = {
  id: string;
  label: string;
  count: string;
  tone: "violet" | "blue" | "orange" | "green" | "pink" | "amber" | "sky" | "muted";
};

export const categories: Category[] = [
  { id: "restaurant", label: "Restaurant", count: "32 templates", tone: "orange" },
  { id: "fashion", label: "Fashion", count: "28 templates", tone: "pink" },
  { id: "medical", label: "Medical", count: "21 templates", tone: "blue" },
  { id: "realestate", label: "Real Estate", count: "19 templates", tone: "amber" },
  { id: "fitness", label: "Fitness", count: "24 templates", tone: "green" },
  { id: "education", label: "Education", count: "17 templates", tone: "sky" },
  { id: "portfolio", label: "Portfolio", count: "36 templates", tone: "violet" },
  { id: "more", label: "Browse All", count: "240+ templates", tone: "muted" },
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
  featured?: boolean;
};

export const templates: Template[] = [
  {
    id: "lumina",
    title: "Lumina — Modern Restaurant",
    category: "Restaurant",
    price: "$49",
    rating: 4.9,
    reviews: 128,
    image: tplRestaurant,
    demoHref: "#",
    featured: true,
  },
  {
    id: "aurea",
    title: "Auréa — Editorial Fashion",
    category: "Fashion",
    price: "$59",
    rating: 4.8,
    reviews: 96,
    image: tplFashion,
    demoHref: "#",
    featured: true,
  },
  {
    id: "clarity",
    title: "Clarity — Medical Clinic",
    category: "Medical",
    price: "$54",
    rating: 4.9,
    reviews: 74,
    image: tplMedical,
    demoHref: "#",
    featured: true,
  },
  {
    id: "haven",
    title: "Haven — Luxury Real Estate",
    category: "Real Estate",
    price: "$69",
    rating: 5.0,
    reviews: 52,
    image: tplRealEstate,
    demoHref: "#",
    featured: true,
  },
];

// -------------------- Features --------------------
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: "sparkles" | "layout" | "search" | "sliders" | "refresh" | "life-buoy";
};

export const features: Feature[] = [
  {
    id: "design",
    title: "Modern Design",
    description: "Crafted by senior designers with an editorial, premium aesthetic.",
    icon: "sparkles",
  },
  {
    id: "responsive",
    title: "Fully Responsive",
    description: "Pixel-perfect on every screen, from ultrawide to mobile.",
    icon: "layout",
  },
  {
    id: "seo",
    title: "SEO Optimized",
    description: "Semantic markup, fast Core Web Vitals, and clean metadata by default.",
    icon: "search",
  },
  {
    id: "customize",
    title: "Easy to Customize",
    description: "Structured content and tokens — edit copy, colors, and images in minutes.",
    icon: "sliders",
  },
  {
    id: "updates",
    title: "Lifetime Updates",
    description: "One purchase, forever kept fresh with new features and refinements.",
    icon: "refresh",
  },
  {
    id: "support",
    title: "Human Support",
    description: "Real people, real answers — usually within a few hours.",
    icon: "life-buoy",
  },
];

// -------------------- Custom CTA --------------------
export const customCta = {
  eyebrow: "Custom builds",
  title: "Need something entirely your own?",
  description:
    "Our senior team designs and ships fully bespoke websites — from brand systems to production code. Book a discovery call and we'll shape the plan together.",
  cta: { label: "Request Custom Website", href: "#custom" },
};

// -------------------- Footer --------------------
export const footer = {
  tagline: "Premium templates and custom websites for ambitious brands.",
  columns: [
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      id: "products",
      title: "Products",
      links: [
        { label: "Templates", href: "#templates" },
        { label: "Custom Websites", href: "#custom" },
        { label: "Pricing", href: "#pricing" },
        { label: "Roadmap", href: "#" },
      ],
    },
    {
      id: "support",
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Community", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
  ],
  newsletter: {
    title: "Stay in the loop",
    description: "New templates, essays, and updates. One email per month.",
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
