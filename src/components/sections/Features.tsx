"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Lock, Coins, RefreshCw, Users, BarChart3 } from "lucide-react";

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
    size: "large" | "small";
    accent: string;
    iconBg: string;
    iconColor: string;
}

const features: Feature[] = [
    {
        icon: Eye,
        title: "شفافية كاملة",
        description: "تابع استثمارك لحظة بلحظة مع تقارير مفصّلة ولوحة تحكم تفاعلية تعرض كل التفاصيل بوضوح تام",
        size: "large",
        accent: "hover:border-primary/40 hover:bg-primary/3",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
    },
    {
        icon: Lock,
        title: "أمان وحماية",
        description: "بضاعتك مؤمَّنة بالكامل مع أفضل شركات التأمين المرخصة من البنك المركزي",
        size: "small",
        accent: "hover:border-teal/40",
        iconBg: "bg-teal/10",
        iconColor: "text-teal",
    },
    {
        icon: Coins,
        title: "نموذج ربح واضح",
        description: "هامش ربح مستهدف 4.5% شهرياً مع إمكانية النمو التراكمي",
        size: "small",
        accent: "hover:border-gold/40",
        iconBg: "bg-gold/10",
        iconColor: "text-gold",
    },
    {
        icon: RefreshCw,
        title: "مرونة تامة",
        description: "استرد بضاعتك عيناً أو نقداً وفق شروط واضحة",
        size: "small",
        accent: "hover:border-primary/40",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
    },
    {
        icon: Users,
        title: "مجتمع ناجح",
        description: "انضم لشبكة من المستثمرين الناجحين وتبادل الخبرات",
        size: "small",
        accent: "hover:border-teal/40",
        iconBg: "bg-teal/10",
        iconColor: "text-teal",
    },
    {
        icon: BarChart3,
        title: "تقارير ذكية",
        description: "تحليلات عميقة لأداء استثمارك مع توصيات مخصصة لتحسين العوائد وتتبع كل حركة بيع فعلية",
        size: "large",
        accent: "hover:border-gold/40 hover:bg-gold/3",
        iconBg: "bg-gold/10",
        iconColor: "text-gold",
    },
];

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="features" className="section-padding bg-white">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">ما يميّزنا</span>
                    <h2 className="section-title">
                        بيئة استثمارية{" "}
                        <span className="text-gradient">متكاملة ومتطورة</span>
                    </h2>
                    <p className="text-muted text-base md:text-lg max-w-2xl mx-auto">
                        كل ما تحتاجه لإدارة استثمارك بثقة واحترافية في مكان واحد
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                            whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
                            className={`group relative p-7 rounded-2xl border border-dark-200/50 bg-white shadow-sm overflow-hidden cursor-default transition-all duration-300 hover:shadow-lg ${feature.accent} ${feature.size === "large" ? "md:col-span-2" : ""
                                }`}
                        >
                            {/* Top accent line */}
                            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.iconColor === "text-primary" ? "from-transparent via-primary to-transparent" :
                                    feature.iconColor === "text-gold" ? "from-transparent via-gold to-transparent" :
                                        "from-transparent via-teal to-transparent"
                                }`} />

                            <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2.5">{feature.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}