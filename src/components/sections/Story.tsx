/**
 * Story Section - Horizontal scrolling timeline on desktop with milestone cards,
 * gold connecting line, and pulse animation on current milestone.
 * @module components/sections/Story
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Rocket, TrendingUp, Award, Crown } from "lucide-react";

interface Milestone {
    year: string;
    title: string;
    description: string;
    icon: React.ElementType;
    current?: boolean;
}

const milestones: Milestone[] = [
    {
        year: "2022",
        title: "بذرة الفكرة",
        description: "ولدت رؤية شِلّة من إدراك حاجة السوق لقناة تجارية موثوقة للأفراد",
        icon: Lightbulb,
    },
    {
        year: "2023",
        title: "التأسيس والإطلاق",
        description: "إطلاق المنصة الأولى مع نموذج الشراكة التجارية المبتكر",
        icon: Rocket,
    },
    {
        year: "2024",
        title: "النمو والتوسع",
        description: "تجاوزنا 1000 شريك تجاري و45 مليون ريال حجم استثمارات",
        icon: TrendingUp,
    },
    {
        year: "2025",
        title: "الريادة",
        description: "أصبحنا منصة الشراكة التجارية الأولى في المملكة العربية السعودية",
        icon: Award,
        current: true,
    },
    {
        year: "2026",
        title: "المستقبل",
        description: "توسيع نطاق الخدمات وإطلاق منتجات استثمارية جديدة",
        icon: Crown,
    },
];

export default function Story() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="story" className="section-padding bg-dark-50 relative overflow-hidden">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">
                        قصتنا
                    </span>
                    <h2 className="section-title">
                        رحلة <span className="text-gradient">بناء المستقبل</span>
                    </h2>
                </motion.div>

                {/* Desktop: Horizontal Timeline */}
                <div className="hidden lg:block relative">
                    {/* Gold connecting line */}
                    <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                    <div className="flex justify-between items-start gap-4">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                                className="relative flex-1 text-center"
                            >
                                {/* Icon node */}
                                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-dark-100 border border-dark-200/30 flex items-center justify-center">
                                    {milestone.current ? (
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-xl bg-gold/30 animate-ping" />
                                            <milestone.icon className="w-8 h-8 text-gold relative z-10" />
                                        </div>
                                    ) : (
                                        <milestone.icon className="w-8 h-8 text-muted" />
                                    )}
                                </div>

                                {/* Year badge */}
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3 ${milestone.current
                                    ? "bg-gold/20 text-gold"
                                    : "bg-primary/5 text-muted"
                                    }`}>
                                    {milestone.year}
                                </span>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                                <p className="text-muted text-sm leading-relaxed px-2">{milestone.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile: Vertical Timeline */}
                <div className="lg:hidden relative">
                    <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="relative flex items-start gap-6 pr-20"
                            >
                                {/* Node */}
                                <div className="absolute right-4 top-0 w-8 h-8 rounded-full bg-dark-100 border border-dark-200/30 flex items-center justify-center">
                                    {milestone.current ? (
                                        <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-dark-400" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${milestone.current
                                        ? "bg-gold/20 text-gold"
                                        : "bg-primary/5 text-muted"
                                        }`}>
                                        {milestone.year}
                                    </span>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                                    <p className="text-muted text-sm leading-relaxed">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}