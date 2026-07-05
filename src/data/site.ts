import tplRestaurant from "@/assets/tpl-restaurant.jpg";
import tplFashion from "@/assets/tpl-fashion.jpg";
import tplMedical from "@/assets/tpl-medical.jpg";
import tplRealEstate from "@/assets/tpl-realestate.jpg";
import heroLaptop from "@/assets/hero-device-laptop.png";
import heroTablet from "@/assets/hero-device-tablet.png";
import heroMobile from "@/assets/hero-device-mobile.png";
import customHero from "@/assets/custom-hero.jpg";
import customPriceIllus from "@/assets/custom-price-illustration.jpg";
import customCtaIllus from "@/assets/custom-cta-illustration.jpg";

// ============================================================
// Site content configuration — future admin-panel editable.
// ============================================================

export type NavItem = { id: string; label: string; href: string };

export const brand = {
  name: "Mini Store",
  tagline: "Website designs and custom website services",
  logoMark: "M",
};

export const navigation: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "templates", label: "Templates", href: "/templates" },
  { id: "custom", label: "Custom Websites", href: "/custom-websites" },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "about", label: "About Us", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const navActions = {
  loginLabel: "Login",
  ctaLabel: "Get Custom Website",
  ctaHref: "/custom-websites",
};

// -------------------- Hero --------------------
export const hero = {
  badge: "New · 2026 Template Collection",
  headlineLines: ["Build Your Business", "Website ", "Than Ever"],
  headlineGradientWord: "Faster",
  description:
    "Browse ready-made website designs, choose a Mini Store plan, or request a separate custom website quote — all in one place.",
  primary: { label: "Browse Templates", href: "/templates" },
  secondary: { label: "Request Custom Website", href: "/custom-websites" },
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

// Stats intentionally empty — no verified figures to display yet.
export const stats: Stat[] = [];

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

export type TemplateTech = {
  id: string;
  name: string;
  tone: "orange" | "blue" | "amber" | "violet" | "pink" | "sky" | "green";
};

export type TemplateMeta = {
  pagesCount?: string; // e.g. "12+ Ready Pages"
  customization?: string; // e.g. "Easy with Drag & Drop"
  support?: string;
  updates?: string;
};

export type Template = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  category: string; // matches Category.label
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
    id: "lumina",
    slug: "lumina-restaurant",
    title: "Lumina Restaurant",
    shortDescription: "Warm, appetizing restaurant template with menu, reservations, and gallery.",
    fullDescription:
      "Lumina is a modern restaurant website template crafted for fine dining, cafes, bistros, and culinary businesses. It comes with a beautiful menu layout, reservation system, chef showcase, and more.",
    category: "Restaurant",
    image: tplRestaurant,
    gallery: [tplRestaurant, tplFashion, tplMedical, tplRealEstate],
    benefits: [
      "Modern & Clean Design",
      "Fully Responsive",
      "Easy to Customize",
      "SEO Optimized",
      "Fast Loading",
    ],
    pagesIncluded: [
      "Home",
      "About Us",
      "Menu",
      "Reservations",
      "Our Chefs",
      "Gallery",
      "Blog",
      "Blog Details",
      "Contact Us",
      "404 Page",
      "Terms & Conditions",
      "Privacy Policy",
    ],
    features: [
      "Modern & Unique Design",
      "Online Table Reservation",
      "Beautiful Menu Layout",
      "Chef Showcase",
      "Photo Gallery",
      "Testimonial Section",
      "Blog & News Section",
      "Fully Responsive Design",
      "SEO Friendly",
      "Cross Browser Compatible",
    ],
    technologies: [
      { id: "html", name: "HTML5", tone: "orange" },
      { id: "css", name: "CSS3", tone: "blue" },
      { id: "js", name: "JavaScript", tone: "amber" },
      { id: "bs", name: "Bootstrap 5", tone: "violet" },
      { id: "sass", name: "Sass", tone: "pink" },
      { id: "fa", name: "Font Awesome", tone: "sky" },
    ],
    meta: {
      pagesCount: "12+ Ready Pages",
      customization: "Easy with Drag & Drop",
    },
    tags: ["restaurant", "food", "menu", "reservations"],
    featured: true,
    popular: false,
    isNew: false,
    createdAt: "2025-08-14",
    visible: true,
    displayOrder: 1,
  },
  {
    id: "aurea",
    slug: "aurea-fashion",
    title: "Auréa Fashion",
    shortDescription: "Editorial fashion boutique with lookbook, product grid, and campaign hero.",
    category: "Fashion",
    image: tplFashion,
    tags: ["fashion", "boutique", "editorial", "lookbook"],
    featured: false,
    popular: false,
    isNew: false,
    createdAt: "2025-09-02",
    visible: true,
    displayOrder: 2,
  },
  {
    id: "clarity",
    slug: "clarity-medical",
    title: "Clarity Medical",
    shortDescription:
      "Trusted medical clinic site with services, doctors, and appointment booking.",
    category: "Medical",
    image: tplMedical,
    tags: ["medical", "clinic", "doctors", "healthcare"],
    featured: false,
    popular: true,
    isNew: false,
    createdAt: "2025-07-10",
    visible: true,
    displayOrder: 3,
  },
  {
    id: "haven",
    slug: "haven-real-estate",
    title: "Haven Real Estate",
    shortDescription: "Modern real estate template with property listings, filters, and agents.",
    category: "Real Estate",
    image: tplRealEstate,
    tags: ["real estate", "property", "listings", "agents"],
    featured: false,
    popular: false,
    isNew: false,
    createdAt: "2025-10-01",
    visible: true,
    displayOrder: 4,
  },
  {
    id: "powerfit",
    slug: "powerfit-gym",
    title: "PowerFit Gym",
    shortDescription: "Bold fitness studio site with class schedules, trainers, and memberships.",
    category: "Fitness",
    image: tplRestaurant,
    tags: ["fitness", "gym", "trainers", "classes"],
    featured: false,
    popular: false,
    isNew: true,
    createdAt: "2026-05-20",
    visible: true,
    displayOrder: 5,
  },
  {
    id: "eduvision",
    slug: "eduvision-academy",
    title: "EduVision Academy",
    shortDescription: "Modern education platform with courses, faculty, and enrollment flow.",
    category: "Education",
    image: tplFashion,
    tags: ["education", "academy", "courses", "learning"],
    featured: false,
    popular: false,
    isNew: false,
    createdAt: "2025-06-11",
    visible: true,
    displayOrder: 6,
  },
  {
    id: "alex-portfolio",
    slug: "alex-portfolio",
    title: "Alex Portfolio",
    shortDescription: "Minimal creative portfolio for designers and freelancers.",
    category: "Portfolio",
    image: tplMedical,
    tags: ["portfolio", "designer", "freelance", "minimal"],
    featured: false,
    popular: false,
    isNew: false,
    createdAt: "2025-05-04",
    visible: true,
    displayOrder: 7,
  },
  {
    id: "creative-studio",
    slug: "creative-studio",
    title: "Creative Studio",
    shortDescription: "Agency-grade portfolio for creative studios with case studies.",
    category: "Portfolio",
    image: tplRealEstate,
    tags: ["portfolio", "agency", "case studies", "creative"],
    featured: true,
    popular: false,
    isNew: false,
    createdAt: "2025-04-18",
    visible: true,
    displayOrder: 8,
  },
  {
    id: "bistro-noir",
    slug: "bistro-noir",
    title: "Bistro Noir",
    shortDescription: "Elegant fine-dining restaurant template with tasting menu.",
    category: "Restaurant",
    image: tplRestaurant,
    tags: ["restaurant", "fine dining", "menu", "wine"],
    featured: false,
    popular: false,
    isNew: false,
    createdAt: "2025-03-22",
    visible: true,
    displayOrder: 9,
  },
  {
    id: "atelier-mode",
    slug: "atelier-mode",
    title: "Atelier Mode",
    shortDescription: "Luxury fashion atelier with campaign storytelling and shop.",
    category: "Fashion",
    image: tplFashion,
    tags: ["fashion", "luxury", "atelier", "shop"],
    featured: false,
    popular: true,
    isNew: false,
    createdAt: "2026-01-08",
    visible: true,
    displayOrder: 10,
  },
  {
    id: "meridian-realty",
    slug: "meridian-realty",
    title: "Meridian Realty",
    shortDescription: "Premium property showcase with map view and mortgage tools.",
    category: "Real Estate",
    image: tplRealEstate,
    tags: ["real estate", "premium", "map", "mortgage"],
    featured: false,
    popular: false,
    isNew: true,
    createdAt: "2026-06-01",
    visible: true,
    displayOrder: 11,
  },
  {
    id: "wellcare",
    slug: "wellcare-clinic",
    title: "WellCare Clinic",
    shortDescription: "Friendly family clinic template with insurance and telehealth.",
    category: "Medical",
    image: tplMedical,
    tags: ["medical", "clinic", "telehealth", "family"],
    featured: false,
    popular: false,
    isNew: false,
    createdAt: "2025-02-14",
    visible: true,
    displayOrder: 12,
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
  {
    id: "design",
    title: "Modern & Unique Designs",
    description: "Crafted with a clean, modern editorial aesthetic.",
    icon: "sparkles",
    tone: "violet",
  },
  {
    id: "responsive",
    title: "Fully Responsive On All Devices",
    description: "Pixel-perfect on every screen, from ultrawide to mobile.",
    icon: "layout",
    tone: "blue",
  },
  {
    id: "seo",
    title: "SEO Optimized For Higher Rank",
    description: "Semantic markup, fast Core Web Vitals, clean metadata.",
    icon: "search",
    tone: "pink",
  },
  {
    id: "customize",
    title: "Easy to Customize No Coding Skills",
    description: "Structured content and tokens — edit in minutes.",
    icon: "sliders",
    tone: "green",
  },
  {
    id: "updates",
    title: "Updates & Maintenance Included",
    description: "We keep your website updated and running smoothly as part of your plan.",
    icon: "refresh",
    tone: "amber",
  },
  {
    id: "support",
    title: "Support When You Need It",
    description: "Reach real people through the support channels included in your plan.",
    icon: "life-buoy",
    tone: "sky",
  },
];

// -------------------- Custom CTA --------------------
export const customCta = {
  title: "Need Something Unique?",
  description:
    "We design and build fully bespoke websites — from brand systems to production code — around your business.",
  benefits: ["Custom design", "Built for your brand", "Owned by you"],
  cta: { label: "Request Custom Website", href: "/custom-websites" },
};

// -------------------- Marketplace (Templates page) --------------------
export const marketplaceHero = {
  badge: "Website Design Gallery",
  titleLine1: "Find the right",
  titleLine2: "starting point.",
  description:
    "Browse website designs made for real businesses. Choose a starting design and pair it with a Mini Store plan.",
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
  id: "featured" | "newest";
  label: string;
};

export const sortOptions: SortOption[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
];

export const marketplaceCta = {
  title: "Can't find the right fit?",
  description: "Tell us what your business needs and we'll create a website around it.",
  benefits: ["100% Custom Design", "Built for your brand", "Ongoing Support"],
  cta: { label: "Request Custom Website", href: "/custom-websites" },
};

// -------------------- Footer --------------------
export const footer = {
  tagline: "Website designs and custom website services for growing businesses.",
  columns: [
    {
      id: "products",
      title: "Products",
      links: [
        { label: "Templates", href: "/templates" },
        { label: "Custom Websites", href: "/custom-websites" },
        { label: "Pricing", href: "/pricing" },
        { label: "How It Works", href: "/how-it-works" },
      ],
    },
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} Mini Store. All rights reserved.`,
};

// -------------------- Custom Websites Page --------------------

export type CustomBenefit = {
  id: string;
  label: string;
  icon: "palette" | "zap" | "headset" | "check" | "shield" | "clock";
};

export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: "message" | "file" | "code" | "check" | "rocket";
  tone: "violet" | "blue" | "green" | "amber" | "pink";
};

export type ServiceType = {
  id: string;
  title: string;
  description: string;
  icon: "briefcase" | "cart" | "user" | "send" | "utensils" | "home" | "stethoscope" | "layers";
  tone: "violet" | "blue" | "orange" | "green" | "pink" | "amber" | "sky";
  visible: boolean;
  displayOrder: number;
};

export type RecentWork = {
  id: string;
  title: string;
  category: string;
  image: string;
  tone: "violet" | "blue" | "orange" | "green" | "pink" | "amber" | "sky";
  visible: boolean;
  displayOrder: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
  displayOrder: number;
};

export const customRequestHref = "/custom-websites/request";

export const customWebsitesPage = {
  hero: {
    badge: "100% Custom Websites",
    titleLines: ["We build stunning", "websites for your"],
    titleGradient: "unique business.",
    description:
      "Stand out online with a custom website designed to match your brand, engage your audience, and grow your business.",
    benefits: [
      { id: "design", label: "100% Custom Design", icon: "palette" },
      { id: "yours", label: "Built for Your Brand", icon: "check" },
      { id: "support", label: "Ongoing Support", icon: "headset" },
    ] satisfies CustomBenefit[],
    primary: { label: "Request Custom Website", href: customRequestHref },
    secondary: { label: "How It Works", href: "#process" },
    visual: {
      src: customHero,
      alt: "Custom website preview on desktop and mobile",
      width: 1280,
      height: 1024,
    },
  },
  process: {
    eyebrow: "HOW IT WORKS",
    title: "Our Simple Process",
    steps: [
      {
        id: "discuss",
        step: 1,
        title: "Discuss",
        description: "Share your requirements and business goals with us.",
        icon: "message",
        tone: "violet",
      },
      {
        id: "plan",
        step: 2,
        title: "Plan & Design",
        description: "We plan the structure and create a custom design.",
        icon: "file",
        tone: "blue",
      },
      {
        id: "develop",
        step: 3,
        title: "Develop",
        description: "Our team builds your website with clean, modern code.",
        icon: "code",
        tone: "green",
      },
      {
        id: "review",
        step: 4,
        title: "Review & Test",
        description: "You review, we test, and make sure it's perfect.",
        icon: "check",
        tone: "amber",
      },
      {
        id: "launch",
        step: 5,
        title: "Launch",
        description: "We go live and support you every step of the way.",
        icon: "rocket",
        tone: "pink",
      },
    ] satisfies ProcessStep[],
  },
  services: {
    title: "What We Build",
    items: [
      {
        id: "business",
        title: "Business Websites",
        description: "Professional websites for companies and startups.",
        icon: "briefcase",
        tone: "violet",
        visible: true,
        displayOrder: 1,
      },
      {
        id: "ecommerce",
        title: "E-commerce Stores",
        description: "Online stores that sell more and grow your brand.",
        icon: "cart",
        tone: "green",
        visible: true,
        displayOrder: 2,
      },
      {
        id: "portfolio",
        title: "Portfolio Websites",
        description: "Showcase your work and attract more clients.",
        icon: "user",
        tone: "orange",
        visible: true,
        displayOrder: 3,
      },
      {
        id: "landing",
        title: "Landing Pages",
        description: "High-converting pages for offers and campaigns.",
        icon: "send",
        tone: "sky",
        visible: true,
        displayOrder: 4,
      },
      {
        id: "restaurant",
        title: "Restaurant Websites",
        description: "Online presence for restaurants and cafes.",
        icon: "utensils",
        tone: "pink",
        visible: true,
        displayOrder: 5,
      },
      {
        id: "realestate",
        title: "Real Estate Websites",
        description: "Property listings with advanced search and filters.",
        icon: "home",
        tone: "blue",
        visible: true,
        displayOrder: 6,
      },
      {
        id: "medical",
        title: "Medical Websites",
        description: "Healthcare websites that build trust and credibility.",
        icon: "stethoscope",
        tone: "green",
        visible: true,
        displayOrder: 7,
      },
      {
        id: "apps",
        title: "Custom Web Apps",
        description: "Powerful web applications built for your needs.",
        icon: "layers",
        tone: "violet",
        visible: true,
        displayOrder: 8,
      },
    ] satisfies ServiceType[],
  },
  included: {
    title: "What's Included",
    features: [
      "100% Custom Design",
      "Responsive on All Devices",
      "SEO Friendly Structure",
      "Speed Optimized",
      "Contact / Inquiry Forms",
      "Content Upload",
      "Basic On-Page SEO",
      "Social Media Integration",
      "Training & Documentation",
      "3 Months Free Support",
    ],
    pricing: {
      label: "Custom Website Pricing",
      price: "Custom Quote",
      note: "Custom quote based on your requirements.",
      benefits: ["Full Ownership", "Custom Design", "Scalable & Future Ready"],
      cta: { label: "Get Custom Website Quote", href: customRequestHref },
      illustration: { src: customPriceIllus, alt: "Website mockup illustration" },
      badge: "Custom Quote",
    },
  },
  recentWork: {
    title: "Our Recent Work",
    items: [
      {
        id: "spice",
        title: "Spice Palace Restaurant",
        category: "Restaurant",
        image: tplRestaurant,
        tone: "orange",
        visible: true,
        displayOrder: 1,
      },
      {
        id: "haven",
        title: "Haven Real Estate",
        category: "Real Estate",
        image: tplRealEstate,
        tone: "amber",
        visible: true,
        displayOrder: 2,
      },
      {
        id: "lifecare",
        title: "LifeCare Hospital",
        category: "Medical",
        image: tplMedical,
        tone: "blue",
        visible: true,
        displayOrder: 3,
      },
      {
        id: "aurea",
        title: "Auréa Fashion",
        category: "Fashion",
        image: tplFashion,
        tone: "pink",
        visible: true,
        displayOrder: 4,
      },
    ] satisfies RecentWork[],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        id: "time",
        question: "How long does it take to build a custom website?",
        answer:
          "Most custom websites are delivered in 2 to 4 weeks depending on the size, features, and how quickly we receive your content and feedback.",
        visible: true,
        displayOrder: 1,
      },
      {
        id: "update",
        question: "Can I update the website myself?",
        answer:
          "Yes. We build with easy-to-manage structures and provide training so you can update content, images, and pages on your own.",
        visible: true,
        displayOrder: 2,
      },
      {
        id: "responsive",
        question: "Will my website be mobile responsive?",
        answer:
          "Every website we deliver is fully responsive and works beautifully across desktops, laptops, tablets, and mobile devices.",
        visible: true,
        displayOrder: 3,
      },
      {
        id: "info",
        question: "What information do you need to get started?",
        answer:
          "We'll need your brand assets, a short brief about your business goals, any reference websites you like, and your content or a plan for it.",
        visible: true,
        displayOrder: 4,
      },
      {
        id: "hosting",
        question: "Do you provide domain and hosting?",
        answer:
          "We help you choose and set up a reliable domain and hosting provider. Hosting costs are billed by the provider directly, keeping ownership in your hands.",
        visible: true,
        displayOrder: 5,
      },
      {
        id: "support",
        question: "Do you offer after-sales support?",
        answer:
          "Yes. Every custom website includes 3 months of free support for fixes and small changes, with affordable ongoing plans available afterwards.",
        visible: true,
        displayOrder: 6,
      },
    ] satisfies FaqItem[],
  },
  finalCta: {
    title: "Ready to grow your business online?",
    description: "Let's build a website that represents your brand and drives real results.",
    benefits: ["Free Consultation", "No Obligation", "Quick Response"],
    cta: { label: "Request Custom Website", href: customRequestHref },
    illustration: { src: customCtaIllus, alt: "Custom website chat illustration" },
  },
};

// -------------------- Pricing Page --------------------

export type PlanTone = "green" | "blue" | "violet";
export type PlanCTA = { label: string; href: string };

export type StarterPlan = {
  id: "starter";
  name: string;
  subtitle: string;
  planType: string;
  tone: PlanTone;
  icon: "cart" | "briefcase" | "code";
  monthlyPrice: string;
  annualPrice: string;
  annualSaving?: string;
  domain: { label: string; example: string };
  features: string[];
  cta: PlanCTA;
  popular?: boolean;
  visible: boolean;
  displayOrder: number;
};

export type BusinessPlan = Omit<StarterPlan, "id"> & {
  id: "business";
  setupPrice: string;
  setupNote: string;
};

export type CustomPlan = {
  id: "custom";
  name: string;
  subtitle: string;
  planType: string;
  tone: PlanTone;
  icon: "code";
  startingPrice: string;
  pricingNote: string;
  features: string[];
  cta: PlanCTA;
  visible: boolean;
  displayOrder: number;
};

export type PricingPlan = StarterPlan | BusinessPlan | CustomPlan;

export type CompareRow = {
  id: string;
  label: string;
  starter: string;
  business: string;
  custom: string;
};

export type AddOn = {
  id: string;
  label: string;
  price: string;
  icon: "pages" | "content" | "cart" | "logo" | "plug" | "wrench";
  visible: boolean;
  displayOrder: number;
};

export type CommonFeature = {
  id: string;
  label: string;
  icon: "mobile" | "shield" | "gauge" | "backup" | "browser" | "monitor";
  visible: boolean;
  displayOrder: number;
};

export const pricingPage = {
  hero: {
    badge: "Simple, Transparent Pricing",
    titleLines: ["Choose the perfect", "website "],
    titleGradient: "solution for you",
    description:
      "Flexible plans for every business need. One-time fees and subscriptions are clearly shown separately.",
    trust: [
      { id: "clear", label: "Clear Pricing", icon: "shield" as const },
      { id: "flex", label: "Flexible Options", icon: "check" as const },
      { id: "support", label: "Dedicated Support", icon: "headset" as const },
    ],
    visual: { src: customHero, alt: "Mini Store website preview on desktop and mobile" },
  },

  plans: {
    starter: {
      id: "starter",
      name: "Mini Store Basic",
      subtitle: "Pre-built template with Mini Store subdomain",
      planType: "Subscription Plan",
      tone: "green",
      icon: "cart",
      monthlyPrice: "₹299",
      annualPrice: "₹2,999",
      domain: { label: "Your site will be like", example: "yourbusiness.ministore.in" },
      features: [
        "Pre-built Website Template",
        "Mini Store Subdomain",
        "Mobile Responsive Design",
        "Hosting Included",
        "SSL Certificate & Security",
        "Basic SEO Setup",
        "Limited Customization",
        "Maintenance & Updates Included",
        "Email Support",
      ],
      cta: { label: "Choose Mini Store Basic", href: "/pricing/start?plan=starter" },
      visible: true,
      displayOrder: 1,
    } satisfies StarterPlan,

    business: {
      id: "business",
      name: "Mini Store Commerce Managed",
      subtitle: "Pre-built template with your own domain",
      planType: "One-time Setup + Subscription",
      tone: "blue",
      icon: "briefcase",
      setupPrice: "₹4,999",
      setupNote: "One-time setup charge",
      monthlyPrice: "₹599",
      annualPrice: "₹5,999",
      domain: { label: "Use your own domain like", example: "yourbusiness.com" },
      features: [
        "Premium Pre-built Templates",
        "Custom Domain Connection",
        "More Customization Options",
        "Content Upload (Pages, Images, Videos)",
        "SEO Setup (On-page)",
        "Hosting & SSL Certificate",
        "Speed Optimized",
        "Security & Regular Updates",
        "Priority Support",
      ],
      cta: { label: "Choose Commerce Managed", href: "/pricing/start?plan=business" },
      popular: true,
      visible: true,
      displayOrder: 2,
    } satisfies BusinessPlan,

    custom: {
      id: "custom",
      name: "Custom Website",
      subtitle: "Fully custom website built for your business",
      planType: "Custom Quote",
      tone: "violet",
      icon: "code",
      startingPrice: "Custom Quote",
      pricingNote: "Custom quote based on your requirements.",
      features: [
        "100% Custom Design & Development",
        "Custom Domain Support",
        "Custom Pages & Features",
        "Advanced Functionality",
        "Third-party Integrations",
        "Admin Panel (If Required)",
        "Performance & Speed Optimization",
        "Advanced SEO Setup",
        "Optional Ongoing Support & Maintenance",
      ],
      cta: { label: "Get Custom Website Quote", href: customRequestHref },
      visible: true,
      displayOrder: 3,
    } satisfies CustomPlan,
  },

  compareTitle: "Compare All Plans",
  compareRows: [
    {
      id: "type",
      label: "Website Type",
      starter: "Pre-built Template",
      business: "Pre-built Template",
      custom: "Fully Custom",
    },
    {
      id: "domain",
      label: "Domain",
      starter: "Mini Store Subdomain",
      business: "Your Own Domain",
      custom: "Your Own Domain",
    },
    {
      id: "setup",
      label: "Setup / Development Fee",
      starter: "—",
      business: "₹4,999 One-time",
      custom: "Custom Quote",
    },
    {
      id: "sub",
      label: "Subscription / Maintenance",
      starter: "₹299/month or ₹2,999/year",
      business: "₹599/month or ₹5,999/year",
      custom: "As per requirement",
    },
    {
      id: "pages",
      label: "Pages",
      starter: "Up to 5 Pages",
      business: "Up to 20 Pages",
      custom: "Based on project scope",
    },
    {
      id: "custom",
      label: "Customization",
      starter: "Limited",
      business: "Moderate",
      custom: "Fully Custom",
    },
    { id: "adv", label: "Advanced Features", starter: "no", business: "yes", custom: "yes" },
    { id: "ecom", label: "E-commerce", starter: "no", business: "yes", custom: "yes" },
    { id: "admin", label: "Admin Panel", starter: "no", business: "no", custom: "If Required" },
    {
      id: "support",
      label: "Support",
      starter: "Email Support",
      business: "Priority Support",
      custom: "Based on Agreement",
    },
  ] satisfies CompareRow[],

  commonFeatures: {
    title: "What's Included in All Plans",
    items: [
      { id: "mobile", label: "Mobile Responsive", icon: "mobile", visible: true, displayOrder: 1 },
      { id: "ssl", label: "SSL Security Included", icon: "shield", visible: true, displayOrder: 2 },
      { id: "speed", label: "Speed Optimized", icon: "gauge", visible: true, displayOrder: 3 },
      { id: "backup", label: "Regular Backups", icon: "backup", visible: true, displayOrder: 4 },
      {
        id: "browser",
        label: "Browser Compatibility",
        icon: "browser",
        visible: true,
        displayOrder: 5,
      },
      {
        id: "monitor",
        label: "Uptime Monitoring",
        icon: "monitor",
        visible: true,
        displayOrder: 6,
      },
    ] satisfies CommonFeature[],
  },

  addOns: {
    title: "Popular Add-ons (Optional)",
    items: [
      {
        id: "pages",
        label: "Additional Pages",
        price: "₹999 / Page",
        icon: "pages",
        visible: true,
        displayOrder: 1,
      },
      {
        id: "content",
        label: "Content Writing",
        price: "₹1,499 / Page",
        icon: "content",
        visible: true,
        displayOrder: 2,
      },
      {
        id: "ecom",
        label: "E-commerce Functionality",
        price: "₹4,999+",
        icon: "cart",
        visible: true,
        displayOrder: 3,
      },
      {
        id: "logo",
        label: "Logo Design",
        price: "₹1,499",
        icon: "logo",
        visible: true,
        displayOrder: 4,
      },
      {
        id: "integ",
        label: "Advanced Integrations",
        price: "Custom Quote",
        icon: "plug",
        visible: true,
        displayOrder: 5,
      },
      {
        id: "maint",
        label: "Monthly Maintenance Package",
        price: "₹1,999 / month",
        icon: "wrench",
        visible: true,
        displayOrder: 6,
      },
    ] satisfies AddOn[],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        id: "diff",
        question: "What is the difference between Mini Store Basic and Commerce Managed?",
        answer:
          "Mini Store Basic uses a Mini Store subdomain (yourbusiness.ministore.in) on a simple monthly or yearly subscription. Mini Store Commerce Managed uses a pre-built template on your own custom domain (yourbusiness.com) with a one-time setup charge plus an ongoing subscription for hosting and maintenance.",
        visible: true,
        displayOrder: 1,
      },
      {
        id: "upgrade",
        question: "Can I upgrade my plan later?",
        answer:
          "Yes. You can move from Mini Store Basic to Commerce Managed, or from Commerce Managed to a fully Custom Website at any time. We help you migrate your content and settings so nothing is lost.",
        visible: true,
        displayOrder: 2,
      },
      {
        id: "domain",
        question: "Do you provide domain and hosting?",
        answer:
          "Mini Store Basic includes the Mini Store subdomain and hosting. Commerce Managed includes hosting and SSL; you can connect a domain you already own or register a new one — domain registration cost is billed separately by the domain provider. Custom Website domain, hosting, and maintenance are decided as part of your project quote.",
        visible: true,
        displayOrder: 3,
      },
      {
        id: "billing",
        question: "How does billing work?",
        answer:
          "Subscription payments are collected in advance. Auto-renewal is only enabled with your explicit consent — otherwise we send you expiry reminders before your plan ends.",
        visible: true,
        displayOrder: 4,
      },
      {
        id: "hidden",
        question: "Are there any hidden charges?",
        answer:
          "No. Setup fees, subscriptions, and optional add-ons are shown separately on this page. Third-party costs like domain registration or premium integrations are always disclosed before you commit.",
        visible: true,
        displayOrder: 5,
      },
      {
        id: "mobile",
        question: "Will my website be mobile responsive?",
        answer:
          "Yes. Every plan — Mini Store Basic, Commerce Managed, and Custom Website — delivers a fully responsive website that works on desktops, laptops, tablets, and mobile devices.",
        visible: true,
        displayOrder: 6,
      },
      {
        id: "after",
        question: "Do you offer after-sales support?",
        answer:
          "Yes. Mini Store Basic includes email support, Commerce Managed includes priority support, and Custom Website support is defined by your selected support agreement. Maintenance add-ons are available for all plans.",
        visible: true,
        displayOrder: 7,
      },
    ] satisfies FaqItem[],
  },

  finalCta: {
    title: "Still not sure which plan is right for you?",
    description: "Let's discuss your requirements and help you choose the best solution.",
    benefits: ["Free Consultation", "No Obligation", "Quick Response"],
    cta: { label: "Talk to Our Expert", href: customRequestHref },
    illustration: { src: customCtaIllus, alt: "Consultation illustration" },
  },
};

// -------------------- About Page --------------------
import aboutHeroImg from "@/assets/about-hero.jpg";
import aboutCtaImg from "@/assets/about-cta.jpg";

export type AboutTone = "violet" | "green" | "orange" | "blue" | "pink" | "amber" | "sky";

export const aboutPage = {
  hero: {
    badge: "About Mini Store",
    headingPre: "We make professional websites ",
    headingGradient: "simple, affordable and accessible",
    headingPost: " for everyone.",
    description:
      "Mini Store is a one-stop platform for templates and custom websites built to help businesses of all sizes establish a strong online presence without technical complexity or high costs.",
    trustPoints: [
      { id: "process", label: "Simple Process", icon: "check" as const },
      { id: "pricing", label: "Affordable Pricing", icon: "tag" as const },
      { id: "support", label: "Reliable Support", icon: "headset" as const },
    ],
    image: {
      src: aboutHeroImg,
      alt: "Mini Store responsive website preview",
      width: 1280,
      height: 960,
    },
  },
  mission: {
    eyebrow: "WHY WE EXIST",
    title: "Our Mission",
    description:
      "Many businesses struggle to get a professional website because of high costs, complicated processes, or lack of technical knowledge. Mini Store exists to change that.",
    principles: [
      {
        id: "affordable",
        title: "Affordable for Everyone",
        description: "We believe every business deserves a professional website at a fair price.",
        icon: "wallet" as const,
        tone: "violet" as AboutTone,
      },
      {
        id: "time",
        title: "Save Time",
        description: "Our ready-made templates and simple process help you go online in no time.",
        icon: "clock" as const,
        tone: "green" as AboutTone,
      },
      {
        id: "notech",
        title: "No Technical Skills Needed",
        description: "You don't need to code or design. We handle the technical part for you.",
        icon: "code" as const,
        tone: "orange" as AboutTone,
      },
      {
        id: "growth",
        title: "Focus on Growth",
        description:
          "We take care of your website so you can focus on what matters most — your business.",
        icon: "chart" as const,
        tone: "blue" as AboutTone,
      },
    ],
  },
  capabilities: {
    eyebrow: "WHAT WE DO",
    title: "Everything You Need to Build Your Online Presence",
    items: [
      {
        id: "templates",
        title: "Website Templates",
        description:
          "Beautiful, modern and conversion-ready templates for all types of businesses.",
        icon: "monitor" as const,
        tone: "violet" as AboutTone,
        href: "/templates",
      },
      {
        id: "custom",
        title: "Custom Websites",
        description: "100% custom websites built to match your brand and business goals.",
        icon: "pen" as const,
        tone: "green" as AboutTone,
        href: "/custom-websites",
      },
      {
        id: "performance",
        title: "Reliable Performance",
        description:
          "Fast, secure and mobile responsive websites that deliver the best experience.",
        icon: "shield" as const,
        tone: "amber" as AboutTone,
      },
      {
        id: "support",
        title: "Ongoing Support",
        description:
          "We're here to support you every step of the way, even after your website is live.",
        icon: "headset" as const,
        tone: "blue" as AboutTone,
      },
    ],
  },
  journey: {
    eyebrow: "HOW MINI STORE WORKS FOR YOU",
    title: "Simple Steps. Great Results.",
    steps: [
      {
        id: "choose",
        number: 1,
        title: "Choose",
        description: "Pick a template or choose a custom website option.",
        icon: "search" as const,
        tone: "violet" as AboutTone,
      },
      {
        id: "share",
        number: 2,
        title: "Share Details",
        description: "Share your requirements, content and any preferences.",
        icon: "file" as const,
        tone: "green" as AboutTone,
      },
      {
        id: "build",
        number: 3,
        title: "We Build",
        description: "Our team designs and develops your website with care.",
        icon: "pen" as const,
        tone: "amber" as AboutTone,
      },
      {
        id: "review",
        number: 4,
        title: "Review",
        description: "You review the website and we make any necessary changes.",
        icon: "eye" as const,
        tone: "blue" as AboutTone,
      },
      {
        id: "live",
        number: 5,
        title: "Go Live",
        description: "Your website goes live and your business is ready to grow.",
        icon: "rocket" as const,
        tone: "violet" as AboutTone,
      },
    ],
  },
  promises: {
    eyebrow: "OUR PROMISE",
    title: "Why Businesses Trust Mini Store",
    items: [
      {
        id: "transparent",
        title: "Transparent Pricing",
        description: "No hidden surprises. What you see is what you pay.",
        icon: "shield-check" as const,
        tone: "violet" as AboutTone,
      },
      {
        id: "secure",
        title: "Secure & Reliable",
        description: "We use best practices to keep your website safe and secure.",
        icon: "lock" as const,
        tone: "green" as AboutTone,
      },
      {
        id: "customer",
        title: "Customer First",
        description: "Your success is our priority. We listen, care and deliver.",
        icon: "users" as const,
        tone: "blue" as AboutTone,
      },
      {
        id: "quality",
        title: "Quality Focused",
        description: "We focus on clean design, performance and the best user experience.",
        icon: "rocket" as const,
        tone: "amber" as AboutTone,
      },
      {
        id: "longterm",
        title: "Long-term Support",
        description: "We don't just build. We build relationships that last.",
        icon: "refresh" as const,
        tone: "violet" as AboutTone,
      },
    ],
  },
  cta: {
    title: "Let's Build Something Great Together",
    description:
      "Whether you need a template or a fully custom website, we're here to bring your ideas to life.",
    benefits: ["Free Consultation", "No Obligation", "Quick Response"],
    primary: { label: "Get in Touch", href: "/contact" },
    illustration: {
      src: aboutCtaImg,
      alt: "Team collaborating around a laptop",
      width: 1024,
      height: 768,
    },
  },
};

// -------------------- Contact Page --------------------
import contactHeroImg from "@/assets/contact-hero.jpg";

export type ContactMethodId = "email" | "whatsapp" | "chat" | "hours";
export type ContactMethodTone = "violet" | "green" | "blue" | "orange";

export type ContactMethod = {
  id: ContactMethodId;
  title: string;
  primary: string;
  description: string;
  tone: ContactMethodTone;
  icon: "mail" | "whatsapp" | "chat" | "clock";
  href?: string;
  visible: boolean;
  status?: "live" | "coming-soon";
};

export type ContactSubjectOption = { id: string; label: string };
export type ContactBudgetOption = { id: string; label: string };

export const contactPage = {
  // Centralized official business contact details (edit in one place).
  // Set null/empty to hide or disable the corresponding action.
  business: {
    email: "hello@ministore.in",
    whatsappNumber: "+91 91234 56789",
    whatsappE164: "919123456789", // digits only, no +/spaces; used in wa.me link
    whatsappHours: "Mon – Sat, 9:00 AM – 7:00 PM",
    businessHours: {
      weekdays: "Mon – Sat, 9:00 AM – 7:00 PM",
      weekend: "Sunday: Closed",
    },
    liveChat: { enabled: false, statusLabel: "Coming Soon" },
    responseGuidance: "We usually reply within a few hours.",
  },

  hero: {
    badge: "Contact Mini Store",
    headingPre: "We're here to\nhelp you ",
    headingGradient: "succeed.",
    description:
      "Have a question, need help, or want to start a project? Fill out the form and our team will get back to you as soon as possible.",
    trustPoints: [
      { id: "quick", label: "Quick Response", icon: "check" as const },
      { id: "friendly", label: "Friendly Support", icon: "smile" as const },
      { id: "noobligation", label: "No Obligation", icon: "check" as const },
    ],
    image: {
      src: contactHeroImg,
      alt: "Contact Mini Store illustration",
      width: 1024,
      height: 1024,
    },
  },

  form: {
    title: "Send us a message",
    supporting: "All fields marked with * are required",
    submitLabel: "Send Message",
    successTitle: "Thanks — your message has been prepared.",
    successBody:
      "Our team will be in touch shortly. A submission service will be connected soon; please email us directly for anything urgent.",
    errorBody: "Something went wrong. Please try again or email us directly.",
    consentLabel: "I agree to the",
    privacyHref: "/legal/privacy",
    termsHref: "/legal/terms",
    subjectOptions: [
      { id: "general", label: "General Question" },
      { id: "template", label: "Template Help" },
      { id: "custom", label: "Custom Website" },
      { id: "pricing", label: "Pricing & Plans" },
      { id: "technical", label: "Technical Support" },
      { id: "partnership", label: "Partnership" },
    ] satisfies ContactSubjectOption[],
    budgetOptions: [
      { id: "unsure", label: "Not Sure Yet" },
      { id: "b1", label: "Below ₹5,000" },
      { id: "b2", label: "₹5,000 – ₹15,000" },
      { id: "b3", label: "₹15,000 – ₹30,000" },
      { id: "b4", label: "₹30,000 – ₹50,000" },
      { id: "b5", label: "Above ₹50,000" },
    ] satisfies ContactBudgetOption[],
  },

  methods: {
    title: "Other ways to reach us",
    supporting: "Choose the option that works best for you.",
    valueCard: {
      title: "We value your time",
      description: "Our team will get back to you as quickly as possible.",
    },
  },

  process: {
    eyebrow: "WHAT HAPPENS NEXT?",
    title: "We keep it simple and transparent.",
    steps: [
      {
        id: "receive",
        number: 1,
        title: "We Receive Your Message",
        description: "We receive your message and understand your requirement.",
        icon: "file" as const,
        tone: "violet" as AboutTone,
      },
      {
        id: "review",
        number: 2,
        title: "Our Team Reviews It",
        description: "Our team reviews the details and prepares the best next step for you.",
        icon: "users" as const,
        tone: "green" as AboutTone,
      },
      {
        id: "reply",
        number: 3,
        title: "We Get Back to You",
        description: "We contact you with the right solution and next steps.",
        icon: "send" as const,
        tone: "amber" as AboutTone,
      },
    ],
  },

  faq: {
    eyebrow: "QUICK ANSWERS",
    title: "Frequently Asked Questions",
    items: [
      {
        id: "respond",
        question: "How soon will you respond?",
        answer:
          "We aim to reply during business hours, Monday to Saturday. Most queries are answered within a few hours.",
      },
      {
        id: "custom",
        question: "Do you provide template customization?",
        answer:
          "Yes. Business plans include moderate customization, and our Custom Website service can extend any template to fit your brand and requirements.",
      },
      {
        id: "request",
        question: "Can I request a custom website?",
        answer:
          "Absolutely. Choose Custom Website in the form and share your requirements — we'll get back with a scope and quote.",
      },
      {
        id: "support",
        question: "Do you offer support after my website is live?",
        answer:
          "Yes. Every plan includes support, and optional maintenance add-ons are available so your website stays fast, secure, and up to date.",
      },
    ],
  },

  cta: {
    title: "Let's build something amazing together",
    description:
      "Whether you need a template or a fully custom website, we're ready to bring your ideas to life.",
    benefits: ["Free Consultation", "No Obligation", "Quick Response"],
    primary: { label: "Get in Touch" }, // scrolls to form; no href
    illustration: {
      src: aboutCtaImg,
      alt: "Team collaborating together",
      width: 1024,
      height: 768,
    },
  },
};

// -------------------- How It Works Page --------------------
export type HowTone = "violet" | "green" | "orange" | "blue";

export const howItWorksPage = {
  hero: {
    badge: "How It Works",
    headingPre: "Simple Process.\n",
    headingGradient: "Powerful",
    headingPost: " Results.",
    description:
      "We've made building your website easy, transparent and hassle-free. Here's how Mini Store works from start to finish.",
    trustPoints: [
      { id: "simple", label: "Easy & Simple", icon: "check" as const },
      { id: "transparent", label: "Transparent", icon: "shield" as const },
      { id: "always", label: "Always Here", icon: "headset" as const },
    ],
    image: {
      src: aboutHeroImg,
      alt: "Mini Store responsive website preview on laptop and phone",
      width: 1280,
      height: 960,
    },
  },
  process: {
    eyebrow: "OUR PROCESS",
    title: "How Mini Store Works",
    description:
      "From choosing your path to going live, we handle every step so you can focus on growing your business.",
    steps: [
      {
        id: "choose",
        number: "01",
        title: "Choose Your Path",
        description: "Choose between a ready-made template or a fully custom website.",
        icon: "path" as const,
        tone: "violet" as HowTone,
      },
      {
        id: "select",
        number: "02",
        title: "Select Template or Custom",
        description: "Browse templates or tell us what you need. We'll suggest the best solution.",
        icon: "browser" as const,
        tone: "green" as HowTone,
      },
      {
        id: "share",
        number: "03",
        title: "Share Your Details",
        description: "Share your business information, content, and any specific requirements.",
        icon: "form" as const,
        tone: "orange" as HowTone,
      },
      {
        id: "build",
        number: "04",
        title: "We Build Your Website",
        description:
          "Our team designs and develops your website with care and attention to detail.",
        icon: "code" as const,
        tone: "blue" as HowTone,
      },
      {
        id: "review",
        number: "05",
        title: "Review & Feedback",
        description: "You review the website and share your feedback. We make any agreed changes.",
        icon: "review" as const,
        tone: "violet" as HowTone,
      },
      {
        id: "live",
        number: "06",
        title: "Go Live",
        description: "Once you're happy, we launch your website and make it live.",
        icon: "rocket" as const,
        tone: "green" as HowTone,
      },
      {
        id: "support",
        number: "07",
        title: "Ongoing Support",
        description: "Support continues based on your selected plan or project agreement.",
        icon: "headset" as const,
        tone: "orange" as HowTone,
      },
    ],
  },
  values: {
    eyebrow: "WHY IT WORKS",
    title: "Built Around You",
    description: "We focus on what matters most — your success.",
    items: [
      {
        id: "customer",
        title: "Customer First",
        description:
          "Your goals are our priority. We listen, understand and deliver based on the agreed requirements.",
        icon: "target" as const,
        tone: "violet" as HowTone,
      },
      {
        id: "notech",
        title: "No Technical Stress",
        description:
          "You don't need to worry about the technical side. We guide you through the process.",
        icon: "shield" as const,
        tone: "green" as HowTone,
      },
      {
        id: "fast",
        title: "Fast & Efficient",
        description:
          "Our streamlined process helps move your website from idea to launch efficiently.",
        icon: "bolt" as const,
        tone: "orange" as HowTone,
      },
      {
        id: "growth",
        title: "Focus on Growth",
        description:
          "We handle the website process so you can focus on running and growing your business.",
        icon: "chart" as const,
        tone: "blue" as HowTone,
      },
    ],
  },
  cta: {
    title: "Ready to Get Started?",
    description: "Let's build a website that helps your business grow. We're ready when you are!",
    benefits: ["Free Consultation", "No Obligation", "Quick Response"],
    primary: { label: "Get in Touch", href: "/contact" },
    illustration: {
      src: aboutCtaImg,
      alt: "Team collaborating on a website project",
      width: 1024,
      height: 768,
    },
  },
};
