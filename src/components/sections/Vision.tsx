/**
 * Vision Section - Centered layout with decorative quote marks,
 * vision statement, and value cards with colored top borders.
 * @module components/sections/Vision
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, TrendingUp, Shield } from "lucide-react";

const values = [
    {
        icon: Globe,
        title: "توسيع دائرة التجارة",
        description: "نجعل من التجارة الحقيقية فرصة متاحة للجميع بصرف النظر عن حجم رأس المال",
        accent: "border-t-primary",
        accentBg: "bg-primary/10",
    },
    {
        icon: TrendingUp,
        title: "الاستقرار والنمو",
        description: "نركز على قطاع المواد الاستهلاكية والغذائية لضمان استقرار ونمو مستدام",
        accent: "border-t-gold",
        accentBg: "bg-gold/10",
    },
    {
        icon: Shield,
        title: "الشفافية والمصداقية",
        description: "نلتزم بأعلى معايير الإفصاح والتوثيق لبناء علاقات تجارية مستدامة",
        accent: "border-t-teal",
        accentBg: "bg-teal/10",
    },
];

export default function Vision() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="vision" className="section-padding bg-dark-50 relative overflow-hidden">
            <div className="container-custom" ref={ref}>
                {/* Decorative quote marks */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-8xl md:text-9xl font-serif text-gold/20 leading-none">"</span>
                </motion.div>

                {/* Vision Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                        <span className="text-foreground">تجارة </span>
                        <span className="text-gold">مُتاحة للجميع</span>
                        <span className="text-foreground">، </span>
                        <br className="hidden md:block" />
                        <span className="text-foreground">نمو حقيقي في </span>
                        <span className="text-primary">أساسيات الحياة</span>
                    </h2>
                    <p className="text-muted text-lg md:text-xl leading-relaxed">
                        نؤمن في شِلّة بأن التجارة الناجحة حقّ مشروع لكل فرد،
                        لا امتياز مقتصراً على الكبار
                    </p>
                </motion.div>

                {/* Value Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`card-glass p-8 ${value.accent} border-t-4 hover:brightness-110 transition-all duration-300`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${value.accentBg} flex items-center justify-center mb-6`}>
                                <value.icon className="w-7 h-7 text-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                            <p className="text-muted leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}