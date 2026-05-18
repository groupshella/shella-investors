"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > lastScrollY && latest > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(latest);
        setIsScrolled(latest > 20);
    });

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

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    const handleLinkClick = useCallback((href: string) => {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <nav className={`relative transition-all duration-400 ${isScrolled
                    ? "mx-3 mt-3 rounded-2xl border border-dark-200/60 bg-white/95 backdrop-blur-xl shadow-xl shadow-primary/8"
                    : "bg-transparent"
                    }`}>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">

                            {/* Logo */}
                            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-dark-200/40"
                                >
                                    <div className="absolute inset-0 rounded-xl bg-white/10" />
                                    <img
                                        src="/favicon.ico"
                                        alt=""
                                        width={28}
                                        height={28}
                                        className="size-full object-contain"
                                        aria-hidden
                                    />
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-foreground group-hover:text-primary transition-colors leading-none">
                                        شِلّة
                                    </span>
                                    <span className="text-[9px] font-medium text-muted tracking-widest leading-none mt-0.5">
                                        SHELLA GROUP
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav */}
                            <div className="hidden lg:flex items-center gap-0.5 rounded-2xl bg-dark-100/80 border border-dark-200/50 p-1">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href.replace("#", "");
                                    return (
                                        <button
                                            key={link.name}
                                            onClick={() => handleLinkClick(link.href)}
                                            className="relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200"
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 rounded-xl bg-white shadow-sm border border-dark-200/40"
                                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                                />
                                            )}
                                            <span className={`relative z-10 ${isActive ? "text-primary font-bold" : "text-muted hover:text-foreground"}`}>
                                                {link.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Desktop CTA */}
                            <div className="hidden lg:flex items-center gap-2">
                                <Link
                                    href="#login"
                                    className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-xl hover:bg-dark-100"
                                >
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    href="#partnership"
                                    className="group relative overflow-hidden btn-primary text-sm px-5 py-2.5"
                                >
                                    <Sparkles size={13} className="opacity-80" />
                                    ابدأ الآن
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            {!isMobileMenuOpen &&
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-dark-100 border border-dark-200/60 transition-colors hover:bg-dark-200/50"
                                    aria-label="القائمة"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isMobileMenuOpen ? "close" : "menu"}
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <Menu size={18} className="text-foreground" />
                                        </motion.div>
                                    </AnimatePresence>
                                </button>
                            }
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 280 }}
                            className="fixed inset-y-0 right-0 z-50 w-[88%] max-w-sm bg-white shadow-2xl border-r border-dark-200/40"
                        >
                            <div className="flex h-full flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between p-5 border-b border-dark-200/40">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white border border-dark-200/40">
                                            <img
                                                src="/favicon.ico"
                                                alt=""
                                                width={28}
                                                height={28}
                                                className="size-full object-contain"
                                                aria-hidden
                                            />
                                        </div>
                                        <span className="text-lg font-black text-foreground">شِلّة</span>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-100 border border-dark-200/50"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Links */}
                                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                                    {navLinks.map((link, index) => {
                                        const isActive = activeSection === link.href.replace("#", "");
                                        return (
                                            <motion.button
                                                key={link.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.04 + 0.05 }}
                                                onClick={() => handleLinkClick(link.href)}
                                                className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-right transition-all ${isActive
                                                    ? "bg-primary/10 text-primary border border-primary/20"
                                                    : "text-muted hover:bg-dark-100 hover:text-foreground border border-transparent"
                                                    }`}
                                            >
                                                <span className="text-base font-semibold">{link.name}</span>
                                                <ChevronLeft
                                                    size={15}
                                                    className={`transition-transform group-hover:-translate-x-0.5 ${isActive ? "text-primary" : "text-muted/50"}`}
                                                />
                                            </motion.button>
                                        );
                                    })}
                                </nav>

                                {/* CTA */}
                                <div className="p-4 space-y-3 border-t border-dark-200/40">
                                    <Link
                                        href="#login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex w-full items-center justify-center rounded-xl border border-dark-200/60 py-3 text-sm font-semibold text-muted hover:bg-dark-100 hover:text-foreground transition-colors"
                                    >
                                        تسجيل الدخول
                                    </Link>
                                    <Link
                                        href="#partnership"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="btn-primary w-full text-sm py-3.5"
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