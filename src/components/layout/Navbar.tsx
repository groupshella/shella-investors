"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Easing, EasingFunction } from "framer-motion";
import { Menu, X, ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "مَن نحن", href: "#about" },
    { name: "رؤيتنا", href: "#vision" },
    { name: "ما يميّزنا", href: "#features" },
    { name: "قصة شِلّة", href: "#story" },
    { name: "الحاسبة", href: "#calculator" },
    { name: "كيف تعمل", href: "#how-it-works" },
];

const easing = [0.25, 0.46, 0.45, 0.94];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { scrollY } = useScroll();

    // Smart hide/show on scroll direction (Ultra-Contextual Navigation trend)
    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollY = latest;

        // Detect scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
        setIsScrolled(currentScrollY > 20);
    });

    // Active section detection
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map((link) => link.href.replace("#", ""));
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const handleLinkClick = useCallback((href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: easing as unknown as Easing }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <nav
                    className={`relative transition-all duration-500 ${isScrolled
                        ? "mx-3 sm:mx-4 mt-3 rounded-2xl border border-dark-200/30 bg-dark-50/95 backdrop-blur-xl shadow-lg shadow-primary/10"
                        : "bg-transparent"
                        }`}
                >
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex h-[72px] items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="group relative flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-dark-50 shadow-lg shadow-primary/20 ring-1 ring-dark-200/80"
                                >
                                    <img src="/favicon.ico" alt="شِلّة" width={40} height={40} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                                </motion.div>

                                <div className="flex flex-col">
                                    <span className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-gold">
                                        شِلّة
                                    </span>
                                    <span className="text-[10px] font-medium tracking-widest text-muted uppercase">
                                        Shella Group
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Navigation - Liquid Glass Pills */}
                            <div className="hidden lg:flex items-center gap-1 rounded-full bg-primary/5 border border-dark-200/30 p-1 backdrop-blur-md">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href.replace("#", "");
                                    return (
                                        <button
                                            key={link.name}
                                            onClick={() => handleLinkClick(link.href)}
                                            className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <span className={`relative z-10 ${isActive ? "text-foreground" : "text-muted hover:text-foreground/80"}`}>
                                                {link.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Desktop CTA */}
                            <div className="hidden lg:flex items-center gap-3">
                                <Link
                                    href="#login"
                                    className="group relative px-5 py-2.5 text-sm font-medium text-foreground/70 transition-all hover:text-foreground"
                                >
                                    <span className="relative z-10">تسجيل الدخول</span>
                                    <motion.div
                                        className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100"
                                        transition={{ duration: 0.2 }}
                                    />
                                </Link>

                                <Link
                                    href="#partnership"
                                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-2.5 text-sm font-bold text-foreground shadow-lg shadow-gold/25 transition-all hover:shadow-gold/35 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Sparkles size={14} className="opacity-70" />
                                        ابدأ الآن
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            {!isMobileMenuOpen && (
                                <button
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 ring-1 ring-dark-200/80 transition-colors hover:bg-primary/10 lg:hidden"
                                    aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu size={20} className="text-foreground" />
                                        </motion.div>
                                    </AnimatePresence>
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu - Native App Quality Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%", opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0.5 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-dark-50 border-l border-dark-200/60 shadow-2xl"
                        >
                            <div className="flex h-full flex-col p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark">
                                            <span className="text-lg font-bold text-white">ش</span>
                                        </div>
                                        <span className="text-xl font-bold text-foreground">شِلّة</span>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 ring-1 ring-dark-200/80"
                                    >
                                        <X size={20} className="text-foreground" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 space-y-1">
                                    {navLinks.map((link, index) => {
                                        const isActive = activeSection === link.href.replace("#", "");
                                        return (
                                            <motion.button
                                                key={link.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 + 0.1 }}
                                                onClick={() => handleLinkClick(link.href)}
                                                className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-right transition-all ${isActive
                                                    ? "bg-primary/10 text-foreground ring-1 ring-primary/20"
                                                    : "text-muted hover:bg-primary/5 hover:text-foreground"
                                                    }`}
                                            >
                                                <span className="text-base font-medium">{link.name}</span>
                                                <ChevronLeft
                                                    size={16}
                                                    className={`transition-transform group-hover:-translate-x-1 ${isActive ? "text-gold" : "text-muted/60"}`}
                                                />
                                            </motion.button>
                                        );
                                    })}
                                </nav>

                                {/* CTA Section */}
                                <div className="space-y-3 pt-6 border-t border-dark-200/30">
                                    <Link
                                        href="#login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex w-full items-center justify-center rounded-xl border border-dark-200/30 py-3.5 text-sm font-medium text-foreground/70 hover:bg-primary/5 hover:text-foreground transition-colors"
                                    >
                                        تسجيل الدخول
                                    </Link>
                                    <Link
                                        href="#partnership"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light py-3.5 text-sm font-bold text-foreground shadow-lg shadow-gold/25"
                                    >
                                        <Sparkles size={14} />
                                        ابدأ شراكتك التجارية
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}