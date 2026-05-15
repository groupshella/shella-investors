/**
 * Why Choose Section - 6-card grid with hover effects, alternating accent colors,
 * and bottom CTA banner with gradient background.
 * @module components/sections/WhyChoose
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Shield,
    TrendingUp,
    RefreshCw,
    Eye,
    Users,
    HeadphonesIcon,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface Reason {
    icon: React.ElementType;
    title: string;
    description: string;
    accent: "primary" | "gold" | "teal";
}

const reasons: Reason[] = [
    {
        icon: Shield,
        title: "حماية كاملة",
        description: "بضاعتك مؤمّنة بالكامل مع شركات تأمين مرخصة من البنك المركزي",
        accent: "primary",
    },
    {
        icon: TrendingUp,
        title: "عوائد مجزية",
        description: "هامش ربح مستهدف 4.5% شهرياً مع إمكانية النمو التراكمي",
        accent: "gold",
    },
    {
        icon: RefreshCw,
        title: "مرونة تامة",
        description: "استرد بضاعتك عيناً أو نقداً في أي وقت وفق شروط واضحة",
        accent: "teal",
    },
    {
        icon: Eye,
        title: "شفافية مطلقة",
        description: "تابع استثمارك لحظة بلحظة مع تقارير مفصّلة ولوحة تحكم تفاعلية",
        accent: "primary",
    },
    {
        icon: Users,
        title: "مجتمع ناجح",
        description: "انضم لشبكة من المستثمرين الناجحين وتبادل الخبرات والفرص",
        accent: "gold",
    },
    {
        icon: HeadphonesIcon,
        title: "دعم متميز",
        description: "فريق دعم متخصص جاهز لمساعدتك على مدار الساعة",
        accent: "teal",
    },
];

const accentMap = {
    primary: "hover:border-primary/30 hover:bg-primary/5",
    gold: "hover:border-gold/30 hover:bg-gold/5",
    teal: "hover:border-teal/30 hover:bg-teal/5",
};

const iconBgMap = {
    primary: "bg-primary/10 text-primary",
    gold: "bg-gold/10 text-gold",
    teal: "bg-teal/10 text-teal",
};

export default function WhyChoose() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="why-choose" className="section-padding bg-dark">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">
                        لماذا نحن
                    </span>
                    <h2 className="section-title">
                        مزايا <span className="text-gradient">تستحق الثقة</span>
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`card-glass p-8 transition-all duration-300 ${accentMap[reason.accent]}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${iconBgMap[reason.accent]} flex items-center justify-center mb-6`}>
                                <reason.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">{reason.title}</h3>
                            <p className="text-muted leading-relaxed">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-gold/10 to-primary/20" />
                    <div className="absolute inset-0 backdrop-blur-3xl" />
                    <div className="absolute inset-0 bg-dark-50/50" />

                    <div className="relative z-10 p-8 md:p-12 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                            جاهز لبدء رحلة استثمارك؟
                        </h3>
                        <p className="text-muted mb-8 max-w-xl mx-auto">
                            انضم لآلاف الشركاء الناجحين وابدأ ببناء مستقبلك المالي اليوم
                        </p>
                        <Link
                            href="#partnership"
                            className="inline-flex items-center gap-2 btn-gold"
                        >
                            ابدأ الآن
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}