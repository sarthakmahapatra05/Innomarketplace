"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { FestiveHeroBanner } from "@/components/FestiveHeroBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { PromoBannerGrid } from "@/components/PromoBannerGrid";
import { BottomNav, NavTab } from "@/components/BottomNav";
import { CartView, CartItem } from "@/components/CartView";
import { TrendsView } from "@/components/TrendsView";
import { CategoriesView } from "@/components/CategoriesView";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { AddressModal } from "@/components/AddressModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import {
  PRODUCTS_DATA,
  Product,
  INITIAL_ADDRESSES,
  Address,
} from "@/data/products";
import { CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  const [activeTab, setActiveTab] = useState<NavTab>("home");

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [currentAddress, setCurrentAddress] = useState<Address>(INITIAL_ADDRESSES[0]);

  const [activeCategory, setActiveCategory] = useState<
    "ALL" | "ETHNIC" | "WESTERN" | "MEN"
  >("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, size = "M") => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
    showToast(`Added ${product.title.slice(0, 24)}... to Cart!`);
  };

  const handleUpdateQuantity = (
    productId: string,
    size: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast("Removed from wishlist");
      } else {
        next.add(product.id);
        showToast("Saved to wishlist!");
      }
      return next;
    });
  };

  const handleSelectAddress = (addr: Address) => {
    setCurrentAddress(addr);
    showToast(`Delivering to ${addr.tag} (${addr.pincode})`);
  };

  const handleAddNewAddress = (newAddr: Omit<Address, "id">) => {
    const created: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [created, ...prev]);
    setCurrentAddress(created);
    showToast("New address added and selected!");
  };

  const handleBuyNow = (product: Product, size = "M") => {
    handleAddToCart(product, size);
    setActiveTab("cart");
    setTimeout(() => {
      setIsCheckoutOpen(true);
    }, 200);
  };

  const filterProducts = (products: Product[]) => {
    if (activeCategory === "ALL") return products;
    return products.filter((p) => p.category === activeCategory);
  };

  const collegeReadyProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "College Ready")
  );
  const bodyconDressesProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "Bodycon Dresses")
  );
  const pulloverProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "Pull over in Style")
  );
  const diwaliProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "Lights, Looks, Diwali")
  );
  const hoodieSeasonProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "Hoodie Season")
  );
  const trendingFitsProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "Trending Fits")
  );
  const patakhaFitsProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "Patakha Fits, Killer Deals")
  );
  const quarterZipProducts = filterProducts(
    PRODUCTS_DATA.filter((p) => p.section === "The Quarter-Zip Edit")
  );

  const wishlistedProducts = PRODUCTS_DATA.filter((p) =>
    wishlistIds.has(p.id)
  );

  const totalCartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotalCart = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalPayableCart = Math.max(0, subtotalCart);

  return (
    <div className="min-h-screen bg-[#faf8fc] flex flex-col justify-between">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="w-full">
        <Header
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenCart={() => setActiveTab("cart")}
          wishlistCount={wishlistIds.size}
          cartCount={totalCartCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onLogoClick={() => setActiveTab("home")}
        />

        {activeTab === "home" && (
          <main className="w-full pb-20 sm:pb-24">
            <FestiveHeroBanner
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              onSelectArchCategory={(archId) => {
                if (archId === "festive" || archId === "fusion") {
                  setActiveCategory("ETHNIC");
                } else if (archId === "men") {
                  setActiveCategory("MEN");
                } else {
                  setActiveCategory("WESTERN");
                }
              }}
            />

            <ProductCarousel
              title="College Ready"
              products={collegeReadyProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />

            <ProductCarousel
              title="Bodycon Dresses"
              products={bodyconDressesProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />

            <ProductCarousel
              title="Pull over in Style"
              products={pulloverProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />

            <PromoBannerGrid
              onExploreVideo={() => setActiveTab("trends")}
              onExploreCategory={() => setActiveTab("categories")}
            />

            <ProductCarousel
              title="Lights, Looks, Diwali"
              products={diwaliProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />

            <ProductCarousel
              title="Hoodie Season"
              products={hoodieSeasonProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />

            <ProductCarousel
              title="Trending Fits"
              products={trendingFitsProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />

            <ProductCarousel
              title="Patakha Fits, Killer Deals"
              products={patakhaFitsProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />

            <ProductCarousel
              title="The Quarter-Zip Edit"
              products={quarterZipProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
              onViewMore={() => setActiveTab("categories")}
            />
          </main>
        )}

        {activeTab === "trends" && (
          <main className="w-full pb-20 sm:pb-24">
            <TrendsView
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          </main>
        )}

        {activeTab === "categories" && (
          <main className="w-full pb-20 sm:pb-24">
            <CategoriesView
              initialCategory={activeCategory}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          </main>
        )}

        {activeTab === "cart" && (
          <main className="w-full pb-20 sm:pb-24">
            <CartView
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveFromCart}
              onContinueShopping={() => setActiveTab("home")}
              onProceedToCheckout={() => setIsCheckoutOpen(true)}
              onOpenSearch={() => {
                setActiveTab("home");
              }}
            />
          </main>
        )}
      </div>

      <Footer
        onNavigateTab={(tab) => setActiveTab(tab)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAddress={() => setIsAddressModalOpen(true)}
      />

      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 bg-zinc-950/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs sm:text-sm backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200 border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
          <button
            onClick={() => setActiveTab("cart")}
            className="ml-3 text-amber-300 font-bold hover:underline"
          >
            View Cart
          </button>
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        userPincode={currentAddress.pincode}
      />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={addresses}
        currentAddressId={currentAddress.id}
        onSelectAddress={handleSelectAddress}
        onAddNewAddress={handleAddNewAddress}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleAddToCart}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenAddresses={() => setIsAddressModalOpen(true)}
        currentAddress={currentAddress}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        address={currentAddress}
        totalAmount={totalPayableCart}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}
