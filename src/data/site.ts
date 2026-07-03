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
  { id: "home", label: "Home", href: "/" },
  { id: "templates", label: "Templates", href: "/templates" },
  { id: "custom", label: "Custom Websites", href: "/#custom" },
  { id: "pricing", label: "Pricing", href: "/#pricing" },
  { id: "about", label: "About Us", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const navActions = {
  loginLabel: "Login",
  ctaLabel: "Get Custom Website",
  ctaHref: "/#custom",
};

// -------------------- Hero --------------------
export const hero = {
  badge: "New · 2026 Template Collection",
  headlineLines: ["Build Your Business", "Website ", "Than Ever"],
  headlineGradientWord: "Faster",
  description:
    "Buy premium templates, tailor them to your brand, or commission a fully custom build. One studio, every stage of your website.",
  primary: { label: "Browse Templates", href: "/templates" },
  secondary: { label: "Request Custom Website", href: "/#custom" },
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
export type TemplateBadge = "featured" | "popular" | "new";

export type TemplateTech = { id: string; name: string; tone: "orange" | "blue" | "amber" | "violet" | "pink" | "sky" | "green" };

export type TemplateMeta = {
  pagesCount?: string;         // e.g. "12+ Ready Pages"
  customization?: string;      // e.g. "Easy with Drag & Drop"
  support?: string;            // e.g. "6 Months Included"
  updates?: string;            // e.g. "Lifetime Free Updates"
};

export type Template = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  category: string; // matches Category.label
  price: number; // numeric for sorting
  priceLabel: string;
  rating: number;
  reviews: number;
  customerCount?: string; // e.g. "1,245+ Happy Customers"
  image: string;
  gallery?: string[];
  benefits?: string[];
  pagesIncluded?: string[];
  features?: string[];
  technologies?: TemplateTech[];
  meta?: TemplateMeta;
  tags: string[];
  featured: boolean;
  popular: boolean;
  isNew: boolean;
  createdAt: string; // ISO
  updatedAt?: string;
  visible: boolean;
  displayOrder: number;
};

export const templates: Template[] = [
  {
    id: "lumina", slug: "lumina-restaurant", title: "Lumina Restaurant",
    shortDescription: "Warm, appetizing restaurant template with menu, reservations, and gallery.",
    category: "Restaurant", price: 49, priceLabel: "$49",
    rating: 4.9, reviews: 128, image: tplRestaurant,
    tags: ["restaurant", "food", "menu", "reservations"],
    featured: true, popular: false, isNew: false,
    createdAt: "2025-08-14", visible: true, displayOrder: 1,
  },
  {
    id: "aurea", slug: "aurea-fashion", title: "Auréa Fashion",
    shortDescription: "Editorial fashion boutique with lookbook, product grid, and campaign hero.",
    category: "Fashion", price: 59, priceLabel: "$59",
    rating: 4.8, reviews: 96, image: tplFashion,
    tags: ["fashion", "boutique", "editorial", "lookbook"],
    featured: false, popular: false, isNew: false,
    createdAt: "2025-09-02", visible: true, displayOrder: 2,
  },
  {
    id: "clarity", slug: "clarity-medical", title: "Clarity Medical",
    shortDescription: "Trusted medical clinic site with services, doctors, and appointment booking.",
    category: "Medical", price: 54, priceLabel: "$54",
    rating: 4.9, reviews: 74, image: tplMedical,
    tags: ["medical", "clinic", "doctors", "healthcare"],
    featured: false, popular: true, isNew: false,
    createdAt: "2025-07-10", visible: true, displayOrder: 3,
  },
  {
    id: "haven", slug: "haven-real-estate", title: "Haven Real Estate",
    shortDescription: "Modern real estate template with property listings, filters, and agents.",
    category: "Real Estate", price: 69, priceLabel: "$69",
    rating: 5.0, reviews: 52, image: tplRealEstate,
    tags: ["real estate", "property", "listings", "agents"],
    featured: false, popular: false, isNew: false,
    createdAt: "2025-10-01", visible: true, displayOrder: 4,
  },
  {
    id: "powerfit", slug: "powerfit-gym", title: "PowerFit Gym",
    shortDescription: "Bold fitness studio site with class schedules, trainers, and memberships.",
    category: "Fitness", price: 49, priceLabel: "$49",
    rating: 4.7, reviews: 41, image: tplRestaurant,
    tags: ["fitness", "gym", "trainers", "classes"],
    featured: false, popular: false, isNew: true,
    createdAt: "2026-05-20", visible: true, displayOrder: 5,
  },
  {
    id: "eduvision", slug: "eduvision-academy", title: "EduVision Academy",
    shortDescription: "Modern education platform with courses, faculty, and enrollment flow.",
    category: "Education", price: 49, priceLabel: "$49",
    rating: 4.8, reviews: 63, image: tplFashion,
    tags: ["education", "academy", "courses", "learning"],
    featured: false, popular: false, isNew: false,
    createdAt: "2025-06-11", visible: true, displayOrder: 6,
  },
  {
    id: "alex-portfolio", slug: "alex-portfolio", title: "Alex Portfolio",
    shortDescription: "Minimal creative portfolio for designers and freelancers.",
    category: "Portfolio", price: 39, priceLabel: "$39",
    rating: 4.9, reviews: 37, image: tplMedical,
    tags: ["portfolio", "designer", "freelance", "minimal"],
    featured: false, popular: false, isNew: false,
    createdAt: "2025-05-04", visible: true, displayOrder: 7,
  },
  {
    id: "creative-studio", slug: "creative-studio", title: "Creative Studio",
    shortDescription: "Agency-grade portfolio for creative studios with case studies.",
    category: "Portfolio", price: 59, priceLabel: "$59",
    rating: 4.8, reviews: 88, image: tplRealEstate,
    tags: ["portfolio", "agency", "case studies", "creative"],
    featured: true, popular: false, isNew: false,
    createdAt: "2025-04-18", visible: true, displayOrder: 8,
  },
  {
    id: "bistro-noir", slug: "bistro-noir", title: "Bistro Noir",
    shortDescription: "Elegant fine-dining restaurant template with tasting menu.",
    category: "Restaurant", price: 55, priceLabel: "$55",
    rating: 4.7, reviews: 44, image: tplRestaurant,
    tags: ["restaurant", "fine dining", "menu", "wine"],
    featured: false, popular: false, isNew: false,
    createdAt: "2025-03-22", visible: true, displayOrder: 9,
  },
  {
    id: "atelier-mode", slug: "atelier-mode", title: "Atelier Mode",
    shortDescription: "Luxury fashion atelier with campaign storytelling and shop.",
    category: "Fashion", price: 65, priceLabel: "$65",
    rating: 4.9, reviews: 59, image: tplFashion,
    tags: ["fashion", "luxury", "atelier", "shop"],
    featured: false, popular: true, isNew: false,
    createdAt: "2026-01-08", visible: true, displayOrder: 10,
  },
  {
    id: "meridian-realty", slug: "meridian-realty", title: "Meridian Realty",
    shortDescription: "Premium property showcase with map view and mortgage tools.",
    category: "Real Estate", price: 79, priceLabel: "$79",
    rating: 4.8, reviews: 47, image: tplRealEstate,
    tags: ["real estate", "premium", "map", "mortgage"],
    featured: false, popular: false, isNew: true,
    createdAt: "2026-06-01", visible: true, displayOrder: 11,
  },
  {
    id: "wellcare", slug: "wellcare-clinic", title: "WellCare Clinic",
    shortDescription: "Friendly family clinic template with insurance and telehealth.",
    category: "Medical", price: 49, priceLabel: "$49",
    rating: 4.6, reviews: 33, image: tplMedical,
    tags: ["medical", "clinic", "telehealth", "family"],
    featured: false, popular: false, isNew: false,
    createdAt: "2025-02-14", visible: true, displayOrder: 12,
  },
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
  cta: { label: "Request Custom Website", href: "/#custom" },
};

// -------------------- Marketplace (Templates page) --------------------
export const marketplaceHero = {
  badge: "Website Template Marketplace",
  titleLine1: "Find the right",
  titleLine2: "starting point.",
  description:
    "Explore premium website templates designed for real businesses, then make them your own.",
  previews: [
    { id: "restaurant", src: tplRestaurant, alt: "Restaurant template preview" },
    { id: "realestate", src: tplRealEstate, alt: "Real estate template preview" },
    { id: "medical", src: tplMedical, alt: "Medical template preview" },
  ],
};

export type FilterCategory = { id: string; label: string };

export const filterCategories: FilterCategory[] = [
  { id: "all", label: "All" },
  { id: "Restaurant", label: "Restaurant" },
  { id: "Fashion", label: "Fashion" },
  { id: "Real Estate", label: "Real Estate" },
  { id: "Medical", label: "Medical" },
  { id: "Fitness", label: "Fitness" },
  { id: "Education", label: "Education" },
  { id: "Portfolio", label: "Portfolio" },
  { id: "more", label: "More" },
];

export type SortOption = {
  id: "featured" | "newest" | "popular" | "price-asc" | "price-desc";
  label: string;
};

export const sortOptions: SortOption[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export const marketplaceCta = {
  title: "Can't find the right fit?",
  description:
    "Tell us what your business needs and we'll create a website around it.",
  benefits: ["100% Custom Design", "Fast Delivery", "Dedicated Support"],
  cta: { label: "Request Custom Website", href: "/#custom" },
};

// -------------------- Footer --------------------
export const footer = {
  tagline: "Premium templates and custom websites for ambitious brands.",
  columns: [
    { id: "products", title: "Products", links: [
      { label: "Templates", href: "/templates" },
      { label: "Custom Websites", href: "/#custom" },
      { label: "Pricing", href: "/#pricing" },
      { label: "How It Works", href: "/#" },
      { label: "Become an Affiliate", href: "/#" },
    ]},
    { id: "company", title: "Company", links: [
      { label: "About Us", href: "/#about" },
      { label: "Careers", href: "/#" },
      { label: "Press", href: "/#" },
      { label: "Contact", href: "/#contact" },
      { label: "Reviews", href: "/#" },
    ]},
    { id: "support", title: "Support", links: [
      { label: "Help Center", href: "/#" },
      { label: "Documentation", href: "/#" },
      { label: "Community", href: "/#" },
      { label: "Status", href: "/#" },
    ]},
  ],
  newsletter: {
    title: "Newsletter",
    description: "Get new templates and updates. One email per month.",
    placeholder: "you@studio.com",
    cta: "Subscribe",
  },
  socials: [
    { id: "x", label: "X", href: "/#" },
    { id: "in", label: "LinkedIn", href: "/#" },
    { id: "dr", label: "Dribbble", href: "/#" },
    { id: "ig", label: "Instagram", href: "/#" },
  ],
  payments: ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"],
  legal: `© ${new Date().getFullYear()} Mini Store. All rights reserved.`,
};
