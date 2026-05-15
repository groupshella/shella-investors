/**
 * Features Section - Bento grid layout with asymmetric card sizes,
 * animated gradient backgrounds, and hover glow effects.
 * @module components/sections/Features
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Eye,
    Lock,
    Coins,
    RefreshCw,
    Users,
    BarChart3
} from "lucide-react";

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
    size: "large" | "small";
    gradient?: string;
}

const features: Feature[] = [
    {
        icon: Eye,
        title: "شفافية كاملة",
        description: "تابع استثمارك لحظة بلحظة مع تقارير مفصّلة ولوحة تحكم تفاعلية تعرض كل التفاصيل بوضوح تام",
        size: "large",
        gradient: "from-primary/10 to-primary/5",
    },
    {
        icon: Lock,
        title: "أمان وحماية",
        description: "بضاعتك مؤمّنة بالكامل مع أفضل شركات التأمين المرخصة",
        size: "small",
    },
    {
        icon: Coins,
        title: "نموذج ربح واضح",
        description: "هامش ربح مستهدف 4.5% شهرياً مع إمكانية النمو التراكمي",
        size: "small",
    },
    {
        icon: RefreshCw,
        title: "مرونة تامة",
        description: "استرد بضاعتك عيناً أو نقداً في أي وقت وفق شروط واضحة",
        size: "small",
    },
    {
        icon: Users,
        title: "مجتمع ناجح",
        description: "انضم لشبكة من المستثمرين الناجحين وتبادل الخبرات",
        size: "small",
    },
    {
        icon: BarChart3,
        title: "تقارير ذكية",
        description: "تحليلات عميقة لأداء استثمارك مع توصيات مخصصة لتحسين العوائد",
        size: "large",
        gradient: "from-gold/10 to-gold/5",
    },
];

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" className="section-padding bg-dark">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">
                        ما يميّزنا
                    </span>
                    <h2 className="section-title">
                        بيئة استثمارية{" "}
                        <span className="text-gradient">متكاملة ومتطورة</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            className={`group relative p-8 rounded-2xl border border-dark-200/30 bg-primary/5 backdrop-blur-sm overflow-hidden cursor-default ${feature.size === "large" ? "md:col-span-2 lg:col-span-2" : ""
                                }`}
                        >
                            {/* Animated gradient background */}
                            {feature.gradient && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            )}

                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(201,151,43,0.1)]" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                                    <feature.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-muted leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}