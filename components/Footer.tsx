"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  CreditCard,
  Heart,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  X,
  Package,
  Send,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface FooterProps {
  onNavigateTab?: (tab: "home" | "trends" | "categories" | "cart") => void;
  onSelectCategory?: (category: "ALL" | "ETHNIC" | "WESTERN" | "MEN") => void;
  onOpenWishlist?: () => void;
  onOpenProfile?: () => void;
  onOpenAddress?: () => void;
}

type ModalType =
  | "returns"
  | "shipping"
  | "genuine"
  | "privacy"
  | "terms"
  | "support"
  | "tracking"
  | null;

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onSelectCategory,
  onOpenWishlist,
  onOpenProfile,
  onOpenAddress,
}) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const [trackOrderInput, setTrackOrderInput] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@") || !newsletterEmail.includes(".")) {
      setNewsletterError("Please enter a valid email address");
      return;
    }
    setNewsletterError("");
    setNewsletterSubscribed(true);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackOrderInput.trim().toUpperCase();
    if (!cleanId) {
      setTrackResult("Please enter your Order ID (e.g. INNO-84920)");
      return;
    }
    setTrackResult(`Order ${cleanId} is On Time. Current status: Out for Delivery with Express Courier (Expected by 8:00 PM today).`);
  };

  const modalContents: Record<
    Exclude<ModalType, null>,
    { title: string; icon: React.ReactNode; body: React.ReactNode }
  > = {
    returns: {
      title: "14-Day Easy Returns Policy",
      icon: <RotateCcw className="w-5 h-5 text-emerald-400" />,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            We want you to love what you wear. If something does not fit or meet your expectations, you can return or exchange it within 14 days of delivery.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Doorstep pickup is scheduled at no extra charge.</li>
            <li>Items must be unworn, unwashed, and in their original packaging with tags intact.</li>
            <li>Refunds are initiated instantly upon courier pickup to your original payment method or UPI.</li>
          </ul>
        </div>
      ),
    },
    shipping: {
      title: "Free Express Shipping Policy",
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            All orders above ₹499 qualify for Free Express Shipping across all pincodes in India.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Metro cities: Delivery within 2 to 3 business days.</li>
            <li>Rest of India: Delivery within 3 to 5 business days.</li>
            <li>Real-time SMS and WhatsApp tracking updates for every checkpoint.</li>
            <li>Orders below ₹499 incur a flat nominal shipping fee of ₹49.</li>
          </ul>
        </div>
      ),
    },
    genuine: {
      title: "100% Genuine Creator Guarantee",
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Every product available on InnoMarket is sourced directly from certified creators, verified indie design houses, and licensed apparel manufacturers.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Strict 5-point quality audit prior to warehouse dispatch.</li>
            <li>Authentic fabrics, pre-shrunk cotton blends, and premium stitching.</li>
            <li>If you ever receive an item that fails our quality benchmark, we replace it free of charge.</li>
          </ul>
        </div>
      ),
    },
    privacy: {
      title: "Privacy & Data Protection",
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Your privacy is our utmost priority. We employ end-to-end 256-bit SSL encryption to ensure your personal credentials, addresses, and payment transactions are never compromised.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>We do not sell or monetize personal customer records to third-party data brokers.</li>
            <li>Payment data is processed strictly through PCI-DSS Level 1 compliant gateways.</li>
            <li>You can request complete deletion of your account and saved addresses at any time.</li>
          </ul>
        </div>
      ),
    },
    terms: {
      title: "Terms & Conditions",
      icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            By accessing and shopping on InnoMarket, you agree to comply with standard e-commerce fair use policies, transparent pricing, and respectful community conduct.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Product pricing displayed includes all statutory Goods and Services Taxes (GST).</li>
            <li>Promotional coupon codes are valid for specified validity periods and minimum cart values.</li>
            <li>Orders can be cancelled at any point before dispatch directly through your Account drawer.</li>
          </ul>
        </div>
      ),
    },
    support: {
      title: "24x7 Customer Helpdesk",
      icon: <Phone className="w-5 h-5 text-emerald-400" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Our dedicated customer care team is available around the clock to assist you with orders, sizing, exchanges, and payment queries.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <div>
                <span className="block text-[11px] text-zinc-400">Toll-Free Helpline</span>
                <a href="tel:18002026789" className="font-bold text-white hover:text-amber-300 transition-colors">
                  1800-202-6789 (9 AM - 9 PM IST)
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-rose-300 shrink-0" />
              <div>
                <span className="block text-[11px] text-zinc-400">Email Support</span>
                <a href="mailto:support@innomarket.in" className="font-bold text-white hover:text-rose-300 transition-colors">
                  support@innomarket.in
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-emerald-300 shrink-0" />
              <div>
                <span className="block text-[11px] text-zinc-400">Headquarters</span>
                <span className="text-white font-medium">
                  Sector 78, Noida, Uttar Pradesh 201301, India
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    tracking: {
      title: "Track Your Order Live",
      icon: <Package className="w-5 h-5 text-amber-400" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Enter your 6-digit InnoMarket Order Reference Number from your SMS or invoice to view real-time delivery status.
          </p>
          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={trackOrderInput}
                onChange={(e) => setTrackOrderInput(e.target.value)}
                placeholder="Enter Order ID (e.g. INNO-592810)"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-xl transition-colors"
              >
                Track
              </button>
            </div>
            {trackResult && (
              <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-200 text-xs">
                {trackResult}
              </div>
            )}
          </form>
        </div>
      ),
    },
  };

  return (
    <footer className="w-full bg-[#180521] text-white pt-10 sm:pt-14 pb-28 sm:pb-24 border-t border-purple-900/40 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-10 border-b border-purple-800/30 text-xs">
          <button
            onClick={() => setActiveModal("shipping")}
            className="flex items-center space-x-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Free Delivery</h4>
              <p className="text-zinc-400 text-[11px]">On orders above ₹499</p>
            </div>
          </button>

          <button
            onClick={() => setActiveModal("returns")}
            className="flex items-center space-x-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-300 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">14 Days Returns</h4>
              <p className="text-zinc-400 text-[11px]">Doorstep instant pickup</p>
            </div>
          </button>

          <button
            onClick={() => setActiveModal("genuine")}
            className="flex items-center space-x-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-400/10 text-rose-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">100% Genuine</h4>
              <p className="text-zinc-400 text-[11px]">Certified creator brands</p>
            </div>
          </button>

          <button
            onClick={() => setActiveModal("terms")}
            className="flex items-center space-x-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-400/10 text-purple-300 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Secure Checkout</h4>
              <p className="text-zinc-400 text-[11px]">UPI, Cards &amp; COD</p>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-10 text-xs border-b border-purple-800/30">
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigateTab && onNavigateTab("home")}
              className="cursor-pointer inline-block"
            >
              <img
                src="/logo.png"
                alt="InnoMarket"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
              Your destination for festive fashion, trending streetwear, everyday basics, and killer festive deals curated with care.
            </p>

            <div className="space-y-2 pt-1 text-xs text-zinc-300">
              <a
                href="mailto:support@innomarket.in"
                className="flex items-center space-x-2 text-zinc-400 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>support@innomarket.in</span>
              </a>
              <a
                href="tel:18002026789"
                className="flex items-center space-x-2 text-zinc-400 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>1800-202-6789 (Toll Free, 9 AM - 9 PM)</span>
              </a>
              <div className="flex items-center space-x-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-rose-300 shrink-0" />
                <span>Sector 78, Noida, Uttar Pradesh 201301</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
              Categories
            </h4>
            <ul className="space-y-2.5 text-zinc-400 text-xs">
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory("ETHNIC");
                    if (onNavigateTab) onNavigateTab("categories");
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Festive Fashion &amp; Kurtas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory("WESTERN");
                    if (onNavigateTab) onNavigateTab("categories");
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Bodycon Party Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory("MEN");
                    if (onNavigateTab) onNavigateTab("categories");
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Men&apos;s Hoodies &amp; Sweatshirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory("WESTERN");
                    if (onNavigateTab) onNavigateTab("home");
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  College Ready Basics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onNavigateTab) onNavigateTab("trends");
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Trends &amp; Video Drops
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-zinc-400 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal("tracking")}
                  className="hover:text-amber-300 transition-colors text-left flex items-center"
                >
                  <span>Track Your Order</span>
                  <ChevronRight className="w-3 h-3 ml-1 text-zinc-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("shipping")}
                  className="hover:text-amber-300 transition-colors text-left flex items-center"
                >
                  <span>Shipping &amp; Delivery</span>
                  <ChevronRight className="w-3 h-3 ml-1 text-zinc-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("returns")}
                  className="hover:text-amber-300 transition-colors text-left flex items-center"
                >
                  <span>Returns &amp; Exchanges</span>
                  <ChevronRight className="w-3 h-3 ml-1 text-zinc-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("support")}
                  className="hover:text-amber-300 transition-colors text-left flex items-center"
                >
                  <span>Customer Support 24x7</span>
                  <ChevronRight className="w-3 h-3 ml-1 text-zinc-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenWishlist) onOpenWishlist();
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenAddress) onOpenAddress();
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Delivery Addresses
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
              Special Offers
            </h4>
            <p className="text-zinc-400 text-xs mb-3">
              Get secret festive drop codes &amp; 20% off your next cart.
            </p>
            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed!</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Use code <span className="font-black text-amber-300">FESTIVE20</span> for 20% off at checkout.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-[11px] text-rose-400">{newsletterError}</p>
                )}
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-purple-800/30">
              <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Connect With Us
              </span>
              <div className="flex items-center space-x-2">
                {[
                  { name: "Instagram", url: "https://instagram.com" },
                  { name: "Twitter", url: "https://x.com" },
                  { name: "YouTube", url: "https://youtube.com" },
                  { name: "LinkedIn", url: "https://linkedin.com" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-zinc-300 hover:text-white transition-colors border border-white/10"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-400 gap-4">
          <p>&copy; 2026 InnoMarket Technologies Private Limited. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setActiveModal("genuine")}
              className="hover:text-white transition-colors"
            >
              Authenticity
            </button>
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for festive celebrations</span>
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="absolute inset-0"
            onClick={() => {
              setActiveModal(null);
              setTrackResult(null);
            }}
          />
          <div className="relative z-10 w-full max-w-lg bg-[#20082b] border border-purple-800/60 rounded-3xl p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-purple-800/40">
              <div className="flex items-center space-x-2.5">
                {modalContents[activeModal].icon}
                <h3 className="font-bold text-base sm:text-lg">
                  {modalContents[activeModal].title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setTrackResult(null);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4">
              {modalContents[activeModal].body}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
