"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, TrendingUp, RefreshCw, Eye, Users, HeadphonesIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

const reasons = [
    {
        icon: Shield,
        title: "حماية كاملة",
        description: "بضاعتك مؤمَّنة بالكامل مع شركات تأمين مرخصة من البنك المركزي السعودي",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        hover: "hover:border-primary/30 hover:bg-primary/3",
    },
    {
        icon: TrendingUp,
        title: "عوائد مجزية",
        description: "هامش ربح مستهدف 4.5% شهرياً مع إمكانية النمو التراكمي في النموذج الرأسي",
        iconBg: "bg-gold/10",
        iconColor: "text-gold",
        hover: "hover:border-gold/30 hover:bg-gold/3",
    },
    {
        icon: RefreshCw,
        title: "مرونة تامة",
        description: "استرد بضاعتك عيناً أو نقداً وفق قيمتها السوقية — مرونة حقيقية في الدخول والخروج",
        iconBg: "bg-teal/10",
        iconColor: "text-teal",
        hover: "hover:border-teal/30 hover:bg-teal/3",
    },
    {
        icon: Eye,
        title: "شفافية مطلقة",
        description: "تابع استثمارك لحظة بلحظة مع تقارير شهرية مفصّلة وحق معاينة بضاعتك",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        hover: "hover:border-primary/30 hover:bg-primary/3",
    },
    {
        icon: Users,
        title: "مجتمع ناجح",
        description: "انضم لشبكة تضم أكثر من 1,200 شريك تجاري ناجح وتبادل الخبرات والفرص",
        iconBg: "bg-gold/10",
        iconColor: "text-gold",
        hover: "hover:border-gold/30 hover:bg-gold/3",
    },
    {
        icon: HeadphonesIcon,
        title: "دعم متميز",
        description: "فريق دعم متخصص جاهز لمساعدتك على مدار الساعة في كل خطوة",
        iconBg: "bg-teal/10",
        iconColor: "text-teal",
        hover: "hover:border-teal/30 hover:bg-teal/3",
    },
];

export default function WhyChoose() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="why-choose" className="section-padding bg-white">
            <div className="container-custom" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <span className="section-eyebrow">لماذا نحن</span>
                    <h2 className="section-title">
                        مزايا <span className="text-gradient">تستحق الثقة</span>
                    </h2>
                    <p className="text-muted">كل ما تحتاجه لاتخاذ قرار استثماري مثمر وآمن</p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-16">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.15 + index * 0.07 }}
                            whileHover={{ y: -3, transition: { duration: 0.15 } }}
                            className={`p-6 rounded-2xl border border-dark-200/50 bg-white shadow-sm cursor-default transition-all duration-200 ${reason.hover} hover:shadow-md`}
                        >
                            <div className={`w-12 h-12 rounded-2xl ${reason.iconBg} flex items-center justify-center mb-4`}>
                                <reason.icon className={`w-6 h-6 ${reason.iconColor}`} />
                            </div>
                            <h3 className="text-base font-bold text-foreground mb-2">{reason.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-teal/8 to-gold/10" />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

                    <div className="relative z-10 p-8 md:p-12 text-center">
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                            جاهز لبدء رحلة استثمارك؟
                        </h3>
                        <p className="text-muted mb-7 max-w-lg mx-auto text-sm md:text-base">
                            انضم لأكثر من 1,200 شريك تجاري ناجح وابدأ ببناء مستقبلك المالي اليوم
                        </p>
                        <Link
                            href="#partnership"
                            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 rounded-2xl"
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