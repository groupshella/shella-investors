"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, TrendingUp, Users, Wallet, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

interface StatItem {
    icon: React.ElementType;
    value: number;
    label: string;
    suffix?: string;
    color: string;
}

const stats: StatItem[] = [
    { icon: Wallet, value: 1000, label: "ريال — بداية مبالغ امتلاك البضاعة (شهرياً)", suffix: "", color: "text-primary" },
    { icon: TrendingUp, value: 45, label: "ريال حصة شهرية مستهدفة لكل ١٬٠٠٠ ريال بضاعة*", suffix: "", color: "text-gold" },
    { icon: Users, value: 39, label: "شهراً — مدة المثال التراكمي التوضيحي", suffix: "", color: "text-teal" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const duration = 1800;
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
            {count.toLocaleString("ar-SA")}{suffix}
        </span>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-surface">
            {/* Background gradient mesh */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-dark-100" />
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/12 to-teal/8 blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.05, 1, 1.05], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-gold/10 to-primary/8 blur-3xl"
                />
                {/* Decorative grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,176,96,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,176,96,1) 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center px-4 pt-24 pb-28 md:pt-24 md:pb-16">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-6"
                >
                    <div className="badge">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        منصة الشراكة التجارية الأولى في السعودية
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-5 tracking-tight"
                >
                    <span className="block text-foreground">استثمر بذكاء</span>
                    <span className="block text-gradient">امتلك بضاعتك</span>
                </motion.h1>

                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg text-muted max-w-lg mx-auto mb-8 leading-relaxed"
                >
                    شِلّة تمكّنك من دخول عالم التجارة الحقيقية بثقة وأمان.
                    تملّك بضاعة في قطاع المواد الغذائية وحقق عوائد مجزية.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 md:mb-14"
                >
                    <Link href="#partnership" className="btn-primary w-full sm:w-auto text-base px-8 py-4 rounded-2xl">
                        ابدأ استثمارك الآن
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link href="#about" className="btn-secondary w-full sm:w-auto text-base px-8 py-4 rounded-2xl">
                        تعرف على المزيد
                    </Link>
                </motion.div>

                {/* Trust bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-2 mb-10 text-xs text-muted"
                >
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>بضاعة مؤمنة — فواتير رسمية — تقارير شهرية</span>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="grid grid-cols-3 gap-3 max-w-2xl mx-auto"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                            className="bg-white rounded-2xl border border-dark-200/50 p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
                        >
                            <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                            <div className={`text-xl sm:text-2xl font-black mb-0.5 ${stat.color}`}>
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-xs text-muted leading-tight">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
                <span className="text-xs text-muted">اكتشف المزيد</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
            </motion.div>

            {/* Mobile sticky CTA */}
            <MobileStickyCTA />
        </section>
    );
}
function MobileStickyCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-dark-200/50 shadow-2xl z-50 md:hidden"
        >
            <Link href="#partnership" className="btn-primary w-full text-center text-base py-4 rounded-xl">
                ابدأ استثمارك الآن
                <ArrowLeft className="w-5 h-5" />
            </Link>
        </motion.div>
    );
}
