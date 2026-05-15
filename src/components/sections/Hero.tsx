"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, TrendingUp, Users, Wallet, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface StatItem {
    icon: React.ElementType;
    value: number;
    label: string;
    suffix?: string;
}

const stats: StatItem[] = [
    { icon: Users, value: 1200, label: "شريك تجاري" },
    { icon: Wallet, value: 45, label: "مليون ريال", suffix: "+" },
    { icon: TrendingUp, value: 94, label: "نسبة النجاح", suffix: "%" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString("ar-SA")}
            {suffix}
        </span>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-surface">
            {/* Clean Green Gradient Mesh - No Particles */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-primary-50 to-surface" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center px-4 pt-24 pb-32 md:pt-20 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="badge mb-6 md:mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        منصة الشراكة التجارية الأولى في السعودية
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight"
                >
                    <span className="block text-text-primary">استثمر بذكاء</span>
                    <span className="block text-gradient">امتلك بضاعتك</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base md:text-lg lg:text-xl text-text-secondary max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed"
                >
                    شِلّة تمكّنك من دخول عالم التجارة الحقيقية بثقة وأمان.
                    تملّك بضاعة في قطاع المواد الغذائية وحقق عوائد مجزية.
                </motion.p>

                {/* CTA Buttons - Mobile Optimized */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16"
                >
                    <Link href="#partnership" className="btn-primary w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4">
                        ابدأ استثمارك الآن
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link href="#about" className="btn-secondary w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4">
                        تعرف على المزيد
                    </Link>
                </motion.div>

                {/* Stats Grid - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            className="card p-4 md:p-6 hover:shadow-md transition-shadow"
                        >
                            <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
                            <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1 tabular-nums">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-xs md:text-sm text-text-secondary">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <span className="text-xs text-text-muted">اكتشف المزيد</span>
                    <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
            </motion.div>

            {/* Mobile Sticky CTA (Visible only on small screens when scrolled) */}
            <MobileStickyCTA />
        </section>
    );
}

/* Mobile Sticky CTA Component */
function MobileStickyCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-border z-50 md:hidden"
        >
            <Link href="#partnership" className="btn-primary w-full text-center">
                ابدأ استثمارك الآن
            </Link>
        </motion.div>
    );
}